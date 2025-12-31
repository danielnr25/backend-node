const database = require('@config/db');

const CategoryModel = {
   getAll: async (limit, offset) => {
      try {
         const [results] = await database.query("SELECT id,nombre,descripcion FROM categorias_productos WHERE deleted_at IS NULL LIMIT ? OFFSET ?",[limit,offset]);
         
         const [countResult] = await database.query("SELECT COUNT(*) AS total FROM categorias_productos WHERE deleted_at IS NULL");
         const total = countResult[0].total;

         return {results,total};
      } catch (error) {
         throw error; // si hay error que nos muestre para poder verificar
      }
   },
   findById: async (id) => {
      try {
         const [results] = await database.query("SELECT id,nombre,descripcion FROM categorias_productos WHERE id = ? AND deleted_at IS NULL", [id]);
         return results;
      } catch (error) {
         throw error;
      }
   },
   create: async(name,description) =>{
      try{
         const [results] = await database.query("INSERT INTO categorias_productos(nombre,descripcion, created_at, updated_at) VALUES (?,?,NOW(),NOW())",[name,description]);
         return results;
      }catch(error){
         throw error;
      }
   },
   update: async(id,name,description)=>{
      try {
         const [results] = await database.query("UPDATE categorias_productos SET nombre=?,descripcion=?,updated_at= NOW() WHERE id = ?",[name,description,id]);
         return results;
      } catch (error) {
         throw error;
      }
   },
   delete: async(id)=>{
      try {
         const [results] = await database.query("UPDATE categorias_productos SET deleted_at= NOW() WHERE id = ?",[id]);
         return results;
         
      } catch (error) {
         throw error;
      }
   },
   search: async (name) => {
      try {
         const [results] = await database.query("SELECT id,nombre,descripcion FROM `categorias_productos` WHERE nombre LIKE ? AND deleted_at IS NULL", [`%${name}%`]);
         return results;
      } catch (error) {
         throw error;
      }
   },

}

module.exports = CategoryModel
