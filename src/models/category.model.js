const database = require('@config/db');

const CategoryModel = {
   getAll: async () => {
      try {
         const [results] = await database.query("SELECT id,nombre,descripcion FROM categorias_productos");
         return results;
      } catch (error) {
         throw error; // si hay error que nos muestre para poder verificar
      }
   },
}

module.exports = CategoryModel
