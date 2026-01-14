const UserModel = require('@models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const messages = require("@utils/messages");


module.exports.login = async(req,res) =>{
   
   const {username,password } = req.body // destructuracion de objeto
   try {
      const results = await UserModel.findByUsername(username); // pasando al usermodel y ejecutando la consulta

      if(results.length>0){
         const user = results[0]; // solamente la informacion de los datos del usuario
         const isMatch = await bcrypt.compare(password,user.password) // true o false
         if(isMatch){
            const payload = {
                id:user.id,
                username:user.username,
                role:user.tipo_usuario_id
            }
            const token = jwt.sign(payload,process.env.SECRET_KEY,{expiresIn: process.env.EXPIRATION_TIME || '1h'});
            return res.status(200).json({  message: messages.auth.loginSuccess,data:user,token})
         }else{
               return res.status(401).json({ message: messages.auth.invalidCredentials})
         }
      }else{
         return res.status(401).json({ message: messages.auth.invalidCredentials })
      }
   } catch (error) {
      console.error("Error inesperado: ",error);
      return res.status(500).json({ message: messages.auth.loginError,error:error.message})
   }
}

module.exports.register = async(req,res) =>{
   const {email,username,password} = req.body;
   try { 
        const hashedPassword = await bcrypt.hash(password,10); // encriptar la contraseña
        const newUser = Object.create(UserModel);
        newUser.username = username;
        newUser.email = email;
        newUser.password = hashedPassword;
        newUser.tipo_usuario_id = 2; // Asignar un tipo de usuario predeterminado (por ejemplo, 2 para usuarios regulares)

        const result =  await newUser.save(); // Guardar el nuevo usuario en la base de datos
        return res.status(201).json({message: messages.auth.registerSuccess, data:{id: result.insertId, username: newUser.username, email: newUser.email}});
   } catch (error) {
      return res.status(500).json({message: messages.auth.registerError, error:error.message})
   }
}