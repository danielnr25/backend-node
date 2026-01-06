const express = require('express');
const ProductController = require('@controllers/product.controller');
const router = express.Router();
const uploadMiddleware = require('@middlewares/upload.middleware');

// Realizar la busqueda de productos
router.get('/search',ProductController.searchProduct);

// Obtener todos los productos
router.get('/',ProductController.getAllProducts);

// Obtener un producto por ID
router.get('/:id',ProductController.getProductById);

// Realizar el registro de productos
// router.post('/',ProductController.createProduct);

// ruta para subir la imagen
router.post('/', uploadMiddleware.single('image'),ProductController.createProduct);

// actualizar un producto
router.put('/:id',uploadMiddleware.single('image'), ProductController.updateProduct);

// Eliminar un producto
router.delete('/:id', ProductController.deleteProduct);
module.exports = router;