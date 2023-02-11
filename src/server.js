const express = require('express');

const bodyParser = require ("body-parser");

const route = require ("./route/Route");

const cors = require('cors');

const jwt = require("jsonwebtoken");

const swaggerUI = require("swagger-ui-express");

const swaggerJsDoc = require("swagger-jsdoc");

// const swaggerFile = require('./swagger_output.json');

require('dotenv').config(); // get value from .env

let app = express();
app.use(cors({origin: true}));

// config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//xử lí login, logout, refreshToken, không chia file, muốn chia file lưu db freshToken

let refreshTokens = [];

app.post('/login', (req, res) => {
  // Authentication
  // Authorization
  // { username: 'Test' }
  const data = req.body;
  console.log({ data });
  const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '30s',
  });
  const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken);
  res.json({ accessToken, refreshToken });
});

app.post('/refreshToken', (req, res) => {
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
        expiresIn: '30s',
      }
    );
    res.json({ accessToken });
  });
});

app.post('/logout', (req, res) => {
  const refreshToken = req.body.token;
  refreshTokens = refreshTokens.filter((refToken) => refToken !== refreshToken);
  res.sendStatus(200);
});

app.use('/api',route);

let port = process.env.PORT || 8080; // use process.env to get value from .env

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Library API",
        version: "1.0.0",
        description: "A simple Express Library API"
      },
      servers: [
        {
          url: `http://localhost:${port}`,
        }
      ]
    },
    apis: ["src/route/*.js"]
  };
  
  const specs = swaggerJsDoc(options);
  // app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
  

app.listen(port,()=>{
    // console.log(`Server start port http://ec2-3-0-97-134.ap-southeast-1.compute.amazonaws.com:${port}`)
    console.log(`Server start port http://localhost:${port}`)
})