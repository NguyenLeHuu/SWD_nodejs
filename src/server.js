const express = require('express');
const bodyParser = require ("body-parser");
const route = require ("./route/Route");
const cors = require('cors');

const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerFile = require('./swagger_output.json');

require('dotenv').config(); // get value from .env

let app = express();
app.use(cors({origin: true}));

// config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/api',route);

let port = process.env.PORT || 8080; // use process.env to get value from .env

// const options = {
//     definition: {
//       openapi: "3.0.0",
//       info: {
//         title: "Library API",
//         version: "1.0.0",
//         description: "A simple Express Library API"
//       },
//       servers: [
//         {
//           url: `http://ec2-3-0-97-134.ap-southeast-1.compute.amazonaws.com:${port}`,
//         }
//       ]
//     },
//     apis: ["src/route/*.js"]
//   };
  
//   const specs = swaggerJsDoc(options);
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));
  

app.listen(port,()=>{
    console.log(`Server start port http://ec2-3-0-97-134.ap-southeast-1.compute.amazonaws.com:${port}`)
})