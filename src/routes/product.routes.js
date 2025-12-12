const express = require('express');
const ProductController = require('@controllers/product.controller');
const router = express.Router();
const uploadMiddleware = require('@middlewares/upload.middleware');

// Realizar la busqueda de productos
router.get("/", ProductController.getAllProduct);

// Realizar el registro de productos
// router.post('/',ProductController.createProduct);

// ruta para subir la imagen
router.post('/', uploadMiddleware.single('image'),ProductController.createProduct);
module.exports = router;