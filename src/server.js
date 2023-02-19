const express = require("express");

const bodyParser = require("body-parser");

const route = require("./route/Route");

const cors = require("cors");

const jwt = require("jsonwebtoken");

const swaggerUI = require("swagger-ui-express");

const swaggerFile = require('./swagger_output.json');

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

// let refreshTokens = [];

// app.post("/logout", (req, res) => {
//   const refreshToken = req.body.token;
//   refreshTokens = refreshTokens.filter((refToken) => refToken !== refreshToken);
//   res.sendStatus(200);
// });


app.use("/", route);

let port = process.env.PORT || 8080; // use process.env to get value from .env

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.listen(port, () => {
  // console.log(`Server start port http://ec2-3-0-97-134.ap-southeast-1.compute.amazonaws.com:${port}`)
  console.log(`Server start port http://localhost:${port}`);
});
