const database = require('@config/db');

const ReportModel = {
    getSalesReport: async(fechaInicio=null, fechaFin=null) =>{
        try {
            let sql = "SELECT SUM(v.total) as amount, DATE(v.fecha) as fecha FROM ventas v WHERE v.deleted_at IS NULL";
            const queryParams = [];
            if(fechaInicio && fechaFin){
                sql += " AND DATE(v.fecha) >= ? AND DATE(v.fecha) <= ?";
                queryParams.push(fechaInicio,fechaFin); // [fechaIncio, fechaFin];
            }
            sql += " GROUP BY DATE(v.fecha) ORDER BY DATE(v.fecha) ASC";

            const [results] = await database.query(sql,queryParams);
            return results;
        } catch (error) {
            throw error;
        }
    },
    getSalesProductReport: async (fechaInicio = null, fechaFin = null) => {
      try {
         let sql = `SELECT pr.nombre, SUM(dv.cantidad) as cantidad FROM detalle_ventas dv
                     LEFT JOIN productos pr ON pr.id = dv.producto_id
                     LEFT JOIN ventas v ON dv.venta_id = v.id 
                     WHERE dv.deleted_at IS NULL AND v.deleted_at IS NULL`; 
         const queryParams = [];

         if (fechaInicio && fechaFin) {
            sql += " AND DATE(v.fecha) >= ? AND DATE(v.fecha) <= ?";
            queryParams.push(fechaInicio, fechaFin);
         }

         sql += " GROUP BY pr.id ORDER BY pr.id";

         const [results] = await database.query(sql, queryParams); // Traemos el reporte de productos vendidos donde deleted_at es NULL
         console.log(results)
         return results;

      } catch (error) {
         throw error; // Si hay un error lo lanzamos     
      }
    }
}

module.exports = ReportModel;