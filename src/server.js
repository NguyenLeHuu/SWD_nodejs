const https = require('https');

const fs = require('fs');

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

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    statusCode: 500,
    message: err.message,
  });
});

const useHttps = process.env.HTTPS || false;

let certPath = process.env.CERT_PATH;

if (useHttps === "true") {
  https
    .createServer(
      // Provide the private and public key to the server by reading each
      // file's content with the readFileSync() method.
      {
        key: fs.readFileSync(`${certPath}/private.key`),
        cert: fs.readFileSync(`${certPath}/certificate.crt`),
        ca: fs.readFileSync(`${certPath}/ca_bundle.crt`),
      },
      app
    )
    .listen(port, () => {
      console.log(
        `Server start port https://ec2-3-0-97-134.ap-southeast-1.compute.amazonaws.com:${port}`
      );
    });
} else {
  app.listen(port, () => {
    console.log(`Server start port http://localhost:${port}`);
  });
}