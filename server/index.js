// app.js
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Configurar conexión con MongoDB
mongoose.connect('mongodb://localhost/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Conexión exitosa a la base de datos');
})
.catch((error) => {
  console.error('Error al conectar a la base de datos:', error);
});

// Resto de la configuración de Express

// Start server
app.listen(3000, () => {
  console.log('Servidor en funcionamiento en el puerto 3000');
});
