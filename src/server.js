const express = require("express");

const bodyParser = require("body-parser");

const route = require("./route/Route");

const cors = require("cors");

const jwt = require("jsonwebtoken");

const swaggerUI = require("swagger-ui-express");

const swaggerFile = require('../swagger_output.json');

require("dotenv").config(); // get value from .env

let app = express();
app.use(cors({ origin: true }));

// config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//xử lí login, logout, refreshToken, không chia file, muốn chia file lưu db freshToken

var admin = require("firebase-admin");

var serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

let refreshTokens = [];

const verifyIdToken = async (idToken) => {
  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    return decodedIdToken;
  } catch (error) {
    console.error("Error verifying ID token:", error);
    return null;
  }
};

app.post("/login", (req, res) => {
  // Authentication
  const idToken = req.body.idToken.toString();
  ;
  console.log(verifyIdToken(idToken))
  const expiresIn = 60 * 60 * 24 * 5 * 1000;

  admin
    .auth()
    .createSessionCookie(idToken, { expiresIn })
    .then(
      (sessionCookie) => {
        const options = { maxAge: expiresIn, httpOnly: true };
        res.cookie("session", sessionCookie, options);
        res.end(JSON.stringify({ status: "success" }));
      },
      (error) => {
        res.status(401).send("UNAUTHORIZED REQUEST!");
      }
    );

  const accessToken = jwt.sign(idToken, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30s",
  });
  const refreshToken = jwt.sign(idToken, process.env.REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken);
  res.json({ accessToken, refreshToken });
});

// function getUserData() {
//   const authHeader = req.headers.authorization;
//   if (authHeader) {
//     const idToken = authHeader.split(" ")[1];
//     admin.auth.ACCESS_TOKEN_SECRET;
//     getAuth()
//       .getUserByEmail("huunlse150800@fpt.edu.vn")
//       .then((userRecord) => {
//         // See the UserRecord reference doc for the contents of userRecord.
//         console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
//       })
//       .catch((error) => {
//         console.log("Error fetching user data:", error);
//       });
//   }
// }

app.post("/refreshToken", (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
    console.log(err, data);
    if (err) res.sendStatus(403);
    const accessToken = jwt.sign(
      { username: data.username },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "30s",
      }
    );
    res.json({ accessToken });
  });
});

app.post("/logout", (req, res) => {
  const refreshToken = req.body.token;
  refreshTokens = refreshTokens.filter((refToken) => refToken !== refreshToken);
  res.sendStatus(200);
});

// app.get("/sessionLogout", (req, res) => {
//   res.clearCookie("session");
//   res.redirect("/login");
// });

app.use("/", route);

let port = process.env.PORT || 8080; // use process.env to get value from .env

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.listen(port, () => {
  // console.log(`Server start port http://ec2-3-0-97-134.ap-southeast-1.compute.amazonaws.com:${port}`)
  console.log(`Server start port http://localhost:${port}`);
});
