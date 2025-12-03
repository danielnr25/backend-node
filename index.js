const express = require('express');

const server = express();
const port = '3000';

server.get('/saludo', (req, res)=>{
   const respuesta = {
      mensaje:'Servidor de express funcionando correctamente',
      ruta:req.url,
      metodo:req.method
   }
   res.json(respuesta)
})

server.listen(port,()=>{
   console.log(`Servidor corriendo en http://localhost:${port}`)
})