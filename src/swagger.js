const options = {
    openapi: "3.0.0",
    language:  'en-US',
    disableLogs: false,
    autoHeaders: true,
    autoQuery: true,
    autoBody: true,
}

const swaggerAutogen = require('swagger-autogen')(options)

const outputFile = './swagger_output.json'
const endpointsFiles = ['./route/Route.js']
let port = process.env.PORT || 8080; // use process.env to get value from .env

const doc = {
    info: {
      version: '1.0.0',      // by default: '1.0.0'
      title: 'SWD',        // by default: 'REST API'
      description: 'SWD_BE',  // by default: ''
    },
    basePath: '/',  // by default: '/'
    servers: [
        {
          url: `http://localhost:${port}/api`,
          description: "local server"
        },
        {
          url: `http://ec2-3-0-97-134.ap-southeast-1.compute.amazonaws.com:${port}/api`,
          description: "Server in AWS"
        }
      ],
    // consumes: [],  // by default: ['application/json']
    // produces: [],  // by default: ['application/json']
    // tags: [        // by default: empty Array
    //   {
    //     name: '',         // Tag name
    //     description: '',  // Tag description
    //   },
    //   // { ... }
    // ],
    // securityDefinitions: {},  // by default: empty object
    // definitions: {},          // by default: empty object (Swagger 2.0)
    // components: {}            // by default: empty object (OpenAPI 3.x)
  };

  


swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
    await import('./server.js'); // Your project's root file
  });