require('module-alias/register');
const express = require('express');
require('dotenv').config();

// CONFIGURACION DE RUTAS
const categoryRoutes = require('@routes/category.routes')

const server = express();

// RUTAS PRINCIPALES
server.use('/api/categories',categoryRoutes); // http://localhost:3000/api/categories

const PORT = process.env.PORT || 8000;
server.listen(PORT,()=>{
   console.log(`Servidor corriendo en http://localhost:${PORT}`)
})