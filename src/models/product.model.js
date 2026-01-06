const database = require('@config/db');

const ProductModel = {
    getAll: async (limit, offset) => {
        try {
            const [results] = await database.query("SELECT pr.nombre,pr.id,pr.precio,pr.descripcion,pr.imagen,pr.stock,cp.nombre as categorianombre FROM `productos` pr LEFT JOIN categorias_productos cp ON pr.categoria_id = cp.id WHERE pr.deleted_at IS NULL LIMIT ? OFFSET ?", [limit, offset]); // Traemos todos los productos donde deleted_at es NULL

            const [countResult] = await database.query("SELECT COUNT(pr.id) AS total FROM productos pr LEFT JOIN categorias_productos cp ON pr.categoria_id = cp.id WHERE pr.deleted_at IS NULL");

            const total = countResult[0].total;

            return { results, total };
        } catch (error) {
            throw error; // Si hay un error lo lanzamos
        }
    },
    findById: async (id) => {
        try {
            const [results] = await database.query("SELECT pr.nombre,pr.id,pr.precio,pr.descripcion,pr.imagen,pr.stock,cp.nombre as categorianombre,pr.categoria_id FROM `productos` pr LEFT JOIN categorias_productos cp ON pr.categoria_id = cp.id WHERE pr.id = ? AND pr.deleted_at IS NULL", [id]); // Traemos el producto por su ID
            return results;
        } catch (error) {
            throw error; // Si hay un error lo lanzamos
        }
    },
    create: async (name, descrption, price, category_id, image_url, stock) => {
        try {
            const [results] = await database.query("INSERT INTO productos(nombre, precio, descripcion, imagen, categoria_id, stock, created_at, updated_at) VALUES (?,?,?,?,?,?,NOW(),NOW())", [name, price, descrption, image_url, category_id, stock])
            return results;
        } catch (error) {
            throw error;
        }
    },
    update: async (id, name, description, price, category_id, image_url) => {
        try {
            const [results] = await database.query("UPDATE productos SET nombre = ?, precio = ?, descripcion = ?, stock = ?, imagen = ?,categoria_id = ?, updated_at = NOW() WHERE id = ?",
                [name, price, description, stock, image_url, category_id, id]
            );

            return results; // Retorna los resultados de la actualización
        } catch (error) {
            throw error; // Si hay un error lo lanzamos
        }
    },
    delete: async (id) => {
        try {
            const [results] = await database.query("UPDATE productos SET deleted_at = NOW() WHERE id = ?", [id]);
            return results; // Retorna los resultados de la eliminación
        } catch (error) {
            throw error; // Si hay un error lo lanzamos
        }
    },
    search: async (name) => {
        try {
            let namesearch = '%' + name + '%';
            const [results] = await database.query("SELECT pr.nombre,pr.id,pr.precio,pr.descripcion,pr.imagen,pr.stock,cp.nombre as categorianombre FROM `productos` pr LEFT JOIN categorias_productos cp ON pr.categoria_id = cp.id WHERE pr.nombre LIKE ? AND pr.deleted_at IS NULL", [namesearch]);
            return results;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ProductModel;