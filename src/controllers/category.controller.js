const CategoryModel = require("@models/category.model");
const messages = require("@utils/messages");


const CategoryController = {
   getAllCategories: async(req, res) => {
      try {
         const results = await CategoryModel.getAll();
         return res.status(200).json(results)
      } catch (error) {
         return res.status(500).json({message:messages.categories.getAllError,error:error.message})
      }
   },
   createCategory: async(req,res)=>{
      const {name, description} = req.body;

      if(name===undefined || description ===undefined){
         return res.status(400).json({message:messages.categories.missingFields})
      }

      const cleanName = String(name).trim();
      const cleanDescription = String(description).trim();

      if(!cleanName || !cleanDescription){
         return res.status(400).json({message:messages.categories.notNullFields})
      }
      
      if(typeof name !='string' || typeof description !='string'){
         return res.status(400).json({message:messages.categories.stringFields})
      }

      try {
         const newCategory = await CategoryModel.create(name,description);
         return res.status(201).json({message:messages.categories.createSuccess})
      } catch (error) {
         return res.status(500).json({message:messages.categories.createError, error})
      }

   },
   updateCategory: async(req,res)=>{
      const {id} = req.params; // obtenemos el ID de la categoría que vamos actualizar
      const {name, description} = req.body;
      if(name===undefined || description ===undefined){
         return res.status(400).json({message:messages.categories.missingFields})
      }

      const cleanName = String(name).trim();
      const cleanDescription = String(description).trim();

      if(!cleanName || !cleanDescription){
         return res.status(400).json({message:messages.categories.notNullFields})
      }
      
      if(typeof name !='string' || typeof description !='string'){
         return res.status(400).json({message:messages.categories.stringFields})
      }
      
      try {
         const updatedCategory = await CategoryModel.update(id,name,description)
         if(updatedCategory.affectedRows===0){
            return res.status(404).json({message:messages.categories.notFound})
         }
         return res.status(201).json({message:messages.categories.updateSuccess})
      } catch (error) {
         return res.status(500).json({message:messages.categories.updateError, error})
      }

   },
   deleteCategory: async(req,res)=>{
      const {id} = req.params;
      try {
         const deletedCategory = await CategoryModel.delete(id);
         if(deletedCategory.affectedRows === 0){
            return res.status(404).json({message:messages.categories.notFound})
         }

         return res.status(200).json({message:messages.categories.deleteSuccess})

      } catch (error) {
         return res.status(500).json({message:messages.categories.deleteError, error})
      }
   }

}

module.exports = CategoryController