const CategoryModel = require("@models/category.model");
const Messages = require("@utils/messages")
const CategoryController = {
   getAllCategories: async(req, res) => {
      try {
         const results = await CategoryModel.getAll();
         res.status(200).json(results)
      } catch (error) {
         res.status(500).json({message:Messages.messages.categories.getAllError,error:error.message})
      }
   }
}

module.exports = CategoryController