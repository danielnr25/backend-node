const express = require('express');
const SaleController = require('@controllers/sales.controller');
const router = express.Router();

// Obtener todas las ventas
router.get('/', SaleController.getAllSales);

// Obtener una venta por ID
router.get('/:id', SaleController.getSaleById);

// Crear una nueva venta
router.post('/', SaleController.createSale);

// Obtener ventas por usuario
router.get('/user/:id', SaleController.getSalesByUser);

module.exports = router;