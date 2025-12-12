const multer = require('multer'); // multipart/form-data
const path = require('path');

const storage = multer.diskStorage({
   destination: (req, file, cb) =>{
      //cb(error, results)
      cb(null, path.join(__dirname,'../uploads')) // src/uploads
   },
   filename: (req, file, cb)=>{
      const uniqueName = `${Date.now()}-${file.originalname}` 
      cb(null,uniqueName) // nombre del archivo guardado: 1173218312312-foto.png
   }
})

const uploadMiddleware = multer({
   storage,
   limits: { fileSize: 2*1024*1024, files:1}, // el tamaño máximo del archivo es 2MB,
   fileFilter: (req, file, cb)=>{
      // png 10kb, webp 3kb
      const filetypes = /jpeg|jpg|png|webp/;
      const extname =filetypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = filetypes.test(file.mimetype); // .exe no está permitido, solamente para a recibir archivos image/png
      if(mimetype && extname){
         return cb(null,true);
      }
      cb(new Error('Solo se permiten imágines en formato JPG, JPEG, PNG O WEBP'));
   }
})

module.exports = uploadMiddleware