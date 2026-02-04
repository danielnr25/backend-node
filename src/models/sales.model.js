const database = require('@config/db');

const SaleModel = {
    getAll: async (limit, offset, fechaInicio = null, fechaFin = null) => {
        try {
            let query = "SELECT v.id AS venta_id, v.total, v.fecha, us.username FROM ventas v LEFT JOIN usuarios us ON us.id = v.usuario_id WHERE v.deleted_at IS NULL";
            let countQuery = "SELECT COUNT(*) AS total FROM ventas v WHERE v.deleted_at IS NULL";
            const queryParams = [];
            const countParams = [];

            if (fechaInicio && fechaFin) {
                query += " AND DATE(v.fecha) >= ? AND DATE(v.fecha) <= ?";
                countQuery += " AND DATE(v.fecha) >= ? AND DATE(v.fecha) <= ?";
                queryParams.push(fechaInicio, fechaFin);
                countParams.push(fechaInicio, fechaFin);
            }

            query += " LIMIT ? OFFSET ?";
            queryParams.push(limit, offset);

            const [results] = await database.query(query, queryParams); // Traemos todas las ventas donde deleted_at es NULL
            const [countResult] = await database.query(countQuery, countParams);
            const total = countResult[0].total;

            return { results, total };

        } catch (error) {
            throw error; // Si hay un error lo lanzamos
        }
    },
    findById: async (id) => {
        try {
            const [results] = await database.query("SELECT dv.id, pr.nombre as producto, dv.cantidad, dv.precio_unitario, dv.subtotal FROM detalle_ventas dv LEFT JOIN productos pr ON pr.id = dv.producto_id WHERE dv.venta_id = ? AND dv.deleted_at IS NULL", [id]); // Traemos la venta por su ID
            return results;
        } catch (error) {
            throw error; // Si hay un error lo lanzamos
        }
    },
    create: async (usuario_id, total, detalles) => {
        const connection = await database.getConnection(); // Obtenemos una conexión para manejar la transacción
        try {
            await connection.beginTransaction(); // Iniciamos la transacción

            const [saleResult] = await connection.query("INSERT INTO ventas (usuario_id, total, fecha, created_at, updated_at) VALUES (?, ?, NOW(), NOW(), NOW())", [usuario_id, total]);
            const venta_id = saleResult.insertId;

            for (const detalle of detalles) {
                const { producto_id, cantidad, precio_unitario, subtotal } = detalle; // Desestructuramos los detalles de la venta
                await connection.query("INSERT INTO detalle_ventas (venta_id, producto_id, cantidad, precio_unitario, subtotal, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())", [venta_id, producto_id, cantidad, precio_unitario, subtotal]);

                // Actualizar el stock del producto
                await connection.query("UPDATE productos SET stock = stock - ? , updated_at = NOW() WHERE id = ?", [cantidad, producto_id]);
            }

            await connection.commit(); // Confirmamos la transacción
            return { venta_id };
        } catch (error) {
            await connection.rollback(); // Si hay un error, revertimos la transacción
            throw error; // Si hay un error lo lanzamos
        } finally {
            connection.release(); // Liberamos la conexión
        }
    },
    findByUser: async (id) => {
        try {
            const [results] = await database.query("SELECT v.id AS venta_id, v.total, v.fecha, us.username FROM ventas v LEFT JOIN usuarios us ON us.id = v.usuario_id WHERE v.deleted_at IS NULL AND v.usuario_id = ?", [id]);
            // Obtenemos todas las ventas de un usuario
            const [details] = await database.query("SELECT dv.id, pr.nombre as producto, pr.imagen, dv.cantidad, dv.precio_unitario, dv.subtotal, dv.venta_id FROM detalle_ventas dv LEFT JOIN productos pr ON pr.id = dv.producto_id LEFT JOIN ventas v ON v.id = dv.venta_id WHERE v.deleted_at IS NULL AND v.usuario_id = ?", [id]);
            // Obtenemos los detalles de la venta
            return { results, details };
        } catch (error) {
            throw error; // Si hay un error lo lanzamos
        }
    }

};

module.exports = SaleModel;
