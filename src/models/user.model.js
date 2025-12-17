const database = require('@config/db')

const UserModel = {
   findByUsername: async(username) =>{
      try {
         const [results] = await database.query("SELECT id, username,password,tipo_usuario_id FROM usuarios WHERE username = ? AND deleted_at IS NULL",[username]);
         return results;
      } catch (error) {
         throw error;
      }
   }
}


module.exports = UserModel;