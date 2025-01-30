const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Smart Inventory Management API',
        description: 'API for managing products and locations',
    },
    host: 'localhost:30000',
    schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log('Swagger JSON generated!');
});
