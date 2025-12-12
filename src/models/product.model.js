const database = require('@config/db');

const ProductModel = {
   getAll: async() =>{
      try {
         const [results] = await database.query("SELECT pr.id, pr.nombre, pr.precio, pr.descripcion, pr.imagen,pr.stock, cp.nombre as categorianombre FROM productos pr LEFT JOIN categorias_productos cp ON pr.categoria_id = cp.id WHERE pr.deleted_at IS NULL"); 
         return results;
      } catch (error) {
         throw error; // trae los errores que pueda tener la base de datos
      }
   },
   create: async(name,descrption,price, category_id, image_url,stock) => {
      try {
         const [results] = await database.query("INSERT INTO productos(nombre, precio, descripcion, imagen, categoria_id, stock, created_at, updated_at) VALUES (?,?,?,?,?,?,NOW(),NOW())",[name, price,descrption,image_url,category_id,stock])
         return results;
      } catch (error) {
         throw error;
      }
   }
}

module.exports = ProductModel;