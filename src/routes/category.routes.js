const express = require('express');
const router = express.Router();
const CategoryController = require('@controllers/category.controller');

// realizar la busqueda de categorias
router.get('/search', CategoryController.searchCategory)

// obtener todas las categorias
router.get('/',CategoryController.getAllCategories);

// obtener una categoria por ID
router.get('/:id',CategoryController.getCategoryById);

// ruta para realizar los registros
router.post('/',CategoryController.createCategory)

// ruta para actualizar un registro
router.put('/:id',CategoryController.updateCategory)

// ruta para eliminar (actualizar el campo deleted_at) una categoria
router.delete('/:id',CategoryController.deleteCategory)


module.exports = router


