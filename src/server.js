const express = require('express');
const bodyParser = require ("body-parser");
const route = require ("./route/Route");
const cors = require('cors');

const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

require('dotenv').config(); // get value from .env

let app = express();
app.use(cors({origin: true}));

// config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/api',route);


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
          url: "http://localhost:8000"
        }
      ]
    },
    apis: ["src/route/*.js"]
  };
  
  const specs = swaggerJsDoc(options);
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
  

let port = process.env.PORT || 8080; // use process.env to get value from .env

app.listen(port,()=>{
    console.log(`Server start port http://localhost:${port}`)
})