const express = require('express');
const router = express.Router();
const CategoryController = require('@controllers/category.controller');

// obtener todas las categorias
router.get('/',CategoryController.getAllCategories);

// ruta para realizar los registros
router.post('/',CategoryController.createCategory)

// ruta para actualizar un registro
router.put('/:id',CategoryController.updateCategory)

// ruta para eliminar (actualizar el campo deleted_at) una categoria
router.delete('/:id',CategoryController.deleteCategory)


module.exports = router


