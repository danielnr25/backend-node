require('module-alias/register');
const express = require('express');
const cors  = require('cors')
require('dotenv').config();
const path = require('path');
// CONFIGURACION DE RUTAS
const categoryRoutes = require('@routes/category.routes');
const productRoutes = require('@routes/product.routes');

const server = express();
server.use(cors());
server.use(express.urlencoded({extended:true})) // middleware, formulario codificado (formulario de HTML/ multipart/form-data)
server.use(express.json()); // nos permite leer los json del body (Middleware para datos del JSON)

// RUTAS PRINCIPALES
server.use('/api/categories',categoryRoutes); // http://localhost:3000/api/categories
server.use('/api/products',productRoutes); // http://localhost:3000/api/product

server.use('/uploads',express.static(path.join(__dirname,'src','uploads'))) // sirve para archivos estaticos desde la carpeta uploads
const PORT = process.env.PORT || 8000;
server.listen(PORT,()=>{
   console.log(`Servidor corriendo en http://localhost:${PORT}`)
})