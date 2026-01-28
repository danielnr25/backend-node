const express = require('express');
const router = express.Router();
const ReportController = require('@controllers/report.controller');

// obtener todas las ventas
router.get('/sales-report', ReportController.getSalesReport);
router.get('/sales-product-report', ReportController.getSalesProductReport);

module.exports = router;