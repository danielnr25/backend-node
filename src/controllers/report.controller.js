const ReportModel = require('@models/report.model');
const messages = require("@utils/messages");

const ReportController = {
    getSalesReport: async(req,res) => {
        try {
            const {fechaInicio, fechaFin} = req.query; 
            const report = await ReportModel.getSalesReport(fechaInicio,fechaFin);
            const sales = {sales:report}
            res.status(200).json(sales); // enviamos en formato json las ventas
        } catch (error) {
            res.status(500).json({message:messages.report.getSalesReportError,error:error.message })
        }
    },
    getSalesProductReport: async (req, res) => { 
      try {
         const {fechaInicio, fechaFin} = req.query;
         const report = await ReportModel.getSalesProductReport(fechaInicio,fechaFin); // Llamamos al modelo para obtener todas las ventas
         const salesProducts = {
            salesProducts: report
         }
         
         res.status(200).json(salesProducts); // Respondemos con las ventas en formato JSONx
      } catch (error) {
         res.status(500).json({ message: messages.reports.getSalesProductReportError, error:error.message}); // Manejo de errores
      }
   }
}

module.exports = ReportController;