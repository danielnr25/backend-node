const ProductModel = require('@models/product.model');
const messages = require("@utils/messages");
const fs = require('fs');
const path = require('path');

const ProductController = {
   getAllProduct: async(req, res) => {
      try {
         const results = await ProductModel.getAll();
         return res.status(200).json(results)
      } catch (error) {
         return res.status(500).json({message:messages.products.getAllError,error:error.message})
      }
   },
   createProduct: async(req,res) => {
      const {name,description,price,category_id, stock} = req.body;
      const image_url = req.file ? req.file.filename : ""; 
      
      try {
            
         if(name===undefined || description ===undefined || price === undefined || category_id === undefined || stock === undefined){
            throw new Error('VALIDATION_ERROR');
         }

         const cleanName = String(name).trim();
         const cleanDescription = String(description).trim();

         if(!cleanName || !cleanDescription){
            //return res.status(400).json({message:messages.products.notNullFields})
            throw new Error('VALIDATION_CLEAN')
         }

         if(typeof name !='string' || typeof description !='string'){
            //return res.status(400).json({message:messages.products.stringFields})
            throw new Error('VALIDATION_STRING')
         }

         // convertir a numeros
         const parsedPrice = Number(price); //number("hola mundo") = nan, number("10.98") = 10.98
         const parsedStock = Number(stock);
         const parsedCategory = Number(category_id);
         if(isNaN(parsedPrice) || parsedStock < 0 || parsedPrice < 0 || isNaN(parsedStock) || isNaN(parsedCategory)){
            throw new Error('NUMBER_ERROR')
         }

         const newProduct = await ProductModel.create(name,description,parsedPrice,parsedCategory,image_url,parsedStock)
         return res.status(201).json({message:messages.products.createSuccess})

      } catch (error) {

         if(image_url){
            const imagePath = path.join(__dirname,'../uploads',image_url);
            if(fs.existsSync(imagePath)){
               fs.unlinkSync(imagePath);
            }
         }

         if(error.message === 'VALIDATION_ERROR'){
            return res.status(400).json({message: messages.products.missingFields});
         }

         if(error.message === 'NUMBER_ERROR'){
            return res.status(400).json({message: messages.products.numberFields});
         }

         if(error.message === 'VALIDATION_CLEAN'){
            return res.status(400).json({message:messages.products.notNullFields})
         }

         if(error.message === 'VALIDATION_STRING'){
            return res.status(400).json({message:messages.products.stringFields})
         }

         return res.status(500).json({message:messages.products.createError,error:error.message})
      }
      

   }
}


module.exports = ProductController;