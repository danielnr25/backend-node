const SalesModel = require("@models/sales.model");
const messages = require("@utils/messages");

const SaleController = {
    getAllSales: async (req, res) => {
        try {
            const page = parseInt(req.query.page, 10) || 1; // Página actual, por defecto 1
            const limit = parseInt(req.query.limit, 10) || 10; // Número de elementos por página, por defecto 10
            const offset = (page - 1) * limit; // Cálculo del offset 
            const { fechaInicio, fechaFin } = req.query;
            const { results, total } = await SalesModel.getAll(limit, offset, fechaInicio, fechaFin); // Llamamos al modelo para obtener todas las ventas
            const totalPages = Math.ceil(total / limit); // Calculamos el total de páginas
            sales = {
                sales: results,
                pagination: {
                    totalItems: total,
                    totalPages: totalPages,
                    currentPage: page,
                    itemsPerPage: limit
                }
            };
            res.status(200).json(sales); // Respondemos con las ventas en formato JSONx
        } catch (error) {
            res.status(500).json({message:messages.sales.getAllError, error:error.message }); // Manejo de errores
        }
    },
    getSaleById: async (req, res) => {
        const { id } = req.params; // Obtenemos el ID de los parámetros de la ruta
        try {
            const sale = await SalesModel.findById(id); // Llamamos al modelo para obtener la venta por ID
            if (sale.length === 0) {
                return res.status(404).json({ message: messages.sales.notFound }); // Si no se encuentra, respondemos con 404
            }
            res.status(200).json(sale);
        } catch (error) {
            res.status(500).json({ message: messages.sales.getByIdError, error:error.message }); // Manejo de errores
        }
    },
    createSale: async (req, res) => {
        const { usuario_id, total, detalles } = req.body; // Obtenemos los datos del cuerpo de la solicitud
        if (usuario_id === undefined || total === undefined || detalles === undefined) {
            return res.status(400).json({ message: messages.sales.missingFields }); // Validamos campos obligatorios
        }
        try {
            const result = await SalesModel.create(usuario_id, total, detalles); // Llamamos al modelo para crear la venta
            res.status(201).json({ message: messages.sales.createSuccess, saleId: result.venta_id }); // Respondemos con éxito
        } catch (error) {
            res.status(500).json({ message: messages.sales.createError, error:error.message }); // Manejo de errores
        }
    }
}

module.exports = SaleController;