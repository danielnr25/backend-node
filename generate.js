const bcrypt = require('bcryptjs');

const password = 'cursofullstack@2025'
const salRounds = 12; // el grado de complejidad del algoritmo, el estándar 10 a 12 para la mayoría de software

bcrypt.hash(password,salRounds,(err,hash)=>{
   if(err){
      console.log('error al generar el hash', err)
      return
   }
   console.log('Contraseña generada:', hash)
})