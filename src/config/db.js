// CONEXION ENTRE MYSQL CON NODE
const mysql = require('mysql2/promise');
require('dotenv').config(); // me permite cargar las variables de entorno (.env)

const database = mysql.createPool({
  host:process.env.DB_HOST,
  user:process.env.DB_USER,
  password:process.env.DB_PASSWORD,
  database:process.env.DB_DATABASE,
  port:process.env.DB_PORT
})

async function testConnection(){
   try{
      const connection = await database.getConnection();
      connection.release();
   }catch(error){
      console.error('Error al conectar a la base de datos:', error.message)
   }
}

testConnection();

module.exports = database