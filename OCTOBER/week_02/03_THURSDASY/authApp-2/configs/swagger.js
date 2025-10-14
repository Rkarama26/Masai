const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Dish Booking System API",
      version: "1.0.0",
      description: "API documentation for the Dish Booking System",
    },
    servers: [
      { url: "http://localhost:3000" },
    ],
  },
  apis: ["./routes/*.js"], // your route files with Swagger comments
}; 

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
