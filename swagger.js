const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My Sports API',
    description: 'Description',
  },
  host: ['localhost:8080','cse-341-project2.onrender.com'],
  schemes: ['https', 'http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);