const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Pokémon API',
      version: '1.0.0',
      description: `
      Una API para obtener información sobre Pokémon.
      Esta API está desarrollada con Node.js, Express y Swagger para la documentación.
      Para utilizarla después de descargar el proyecto:
      1. Instala las dependencias necesarias.
      2. Ejecuta "npm start".
      3. Nodemon se ejecutará y estará escuchando en el puerto 3001.
    `,
    },
  },
  apis: ['./src/routes/*.js'],
};

module.exports = swaggerJsdoc(swaggerOptions);
