const ProductModel = require('@models/product.model');
const messages = require("@utils/messages");
const fs = require('fs');
const path = require('path');

const ProductController = {
    getAllProducts: async (req, res) => {
        try {
            const page = parseInt(req.query.page, 10) || 1; // Página actual, por defecto 1
            const limit = parseInt(req.query.limit, 10) || 10; // Número de elementos por página, por defecto 10
            const offset = (page - 1) * limit; // Cálculo del offset 

            const { results, total } = await ProductModel.getAll(limit, offset); // Llamado al modelo para obtener todos los productos

            const totalPages = Math.ceil(total / limit); // Calculamos el total de páginas
            const products = results.map((product) => ({
                ...product,
                imagen: process.env.HOST + '/uploads/' + product.imagen
            }));
            const listProducts = {
                products: products,
                pagination: {
                    totalItems: total,
                    totalPages: totalPages,
                    currentPage: page,
                    itemsPerPage: limit
                }
            };
            res.status(200).json(listProducts); // Respondemos con los productos en formato JSON
        } catch (error) {
            res.status(500).json({ message: messages.products.getAllError, error }); // Manejo de errores
        }
    }, // Obtener un producto por su ID
    getProductById: async (req, res) => {
        const { id } = req.params; // Obtenemos el ID de los parámetros de la ruta
        try {
            const product = await ProductModel.findById(id); // Llamamos al modelo para obtener el producto por ID
            if (product.length === 0) {
                return res.status(404).json({ message: messages.products.notFound }); // Si no se encuentra, respondemos con 404
            }
            const updatedProduct = {
                ...product[0],
                imagen: process.env.HOST + '/uploads/' + product[0].imagen
            };
            res.status(200).json(updatedProduct);
        } catch (error) {
            res.status(500).json({ message: messages.products.getByIdError, error }); // Manejo de errores
        }
    },
    createProduct: async (req, res) => {
        const { name, description, price, category_id, stock } = req.body;
        const image_url = req.file ? req.file.filename : "";

        try {

            if (name === undefined || description === undefined || price === undefined || category_id === undefined || stock === undefined) {
                throw new Error('VALIDATION_ERROR');
            }

            const cleanName = String(name).trim();
            const cleanDescription = String(description).trim();

            if (!cleanName || !cleanDescription) {
                //return res.status(400).json({message:messages.products.notNullFields})
                throw new Error('VALIDATION_CLEAN')
            }

            if (typeof name != 'string' || typeof description != 'string') {
                //return res.status(400).json({message:messages.products.stringFields})
                throw new Error('VALIDATION_STRING')
            }

            // convertir a numeros
            const parsedPrice = Number(price); //number("hola mundo") = nan, number("10.98") = 10.98
            const parsedStock = Number(stock);
            const parsedCategory = Number(category_id);
            if (isNaN(parsedPrice) || parsedStock < 0 || parsedPrice < 0 || isNaN(parsedStock) || isNaN(parsedCategory)) {
                throw new Error('NUMBER_ERROR')
            }

            const newProduct = await ProductModel.create(name, description, parsedPrice, parsedCategory, image_url, parsedStock)
            
            return res.status(201).json({ message: messages.products.createSuccess })
        } catch (error) {

            if (image_url) {
                const imagePath = path.join(__dirname, '../uploads', image_url);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }

            if (error.message === 'VALIDATION_ERROR') {
                return res.status(400).json({ message: messages.products.missingFields });
            }

            if (error.message === 'NUMBER_ERROR') {
                return res.status(400).json({ message: messages.products.numberFields });
            }

            if (error.message === 'VALIDATION_CLEAN') {
                return res.status(400).json({ message: messages.products.notNullFields })
            }

            if (error.message === 'VALIDATION_STRING') {
                return res.status(400).json({ message: messages.products.stringFields })
            }

            return res.status(500).json({ message: messages.products.createError, error: error.message })
        }
    },
    updateProduct: async (req, res) => {
        const { id } = req.params; // Obtenemos el ID de la categoría de los parámetros de la ruta
        const { name, description, price, category_id, stock } = req.body; // Obtenemos los datos del cuerpo de la solicitud
        const image_url = req.file ? req.file.filename : null;  // Obtenemos la URL de la imagen
        if (!name || !description || !price || !category_id || !stock) {
            return res.status(400).json({ message: messages.products.missingFields }); // Validación de datos
        }

        try {

            const currentProduct = await ProductModel.findById(id);
            let saveImageUrl = currentProduct[0].imagen; // verificamos si existe una imagen antes de actualizar
            if (!currentProduct) {
                return res.status(404).json({ message: messages.products.notFound });
            }

            if (image_url != null) { // verifica si en la actualización de cualquier campo se ha subido una nueva imagen
                saveImageUrl = image_url;
            } else {
                saveImageUrl = currentProduct[0].imagen;
            }

            const updatedProduct = await ProductModel.update(id, name, description, price, category_id, stock, saveImageUrl); // Llamamos al modelo para actualizar el producto
            if (updatedProduct.affectedRows === 0) {
                return res.status(404).json({ message: messages.products.notFound }); // Si no se encuentra, respondemos con 404
            }
            res.status(200).json({ message: messages.products.updateSuccess, updatedProduct });
        } catch (error) {
            res.status(500).json({ message: messages.products.updateError, error:error.message }); // Manejo de errores
        }
    },
    // Eliminar un producto
    deleteProduct: async (req, res) => {
        const { id } = req.params; // Obtenemos el ID de los parámetros de la ruta
        try {
            const deletedProduct = await ProductModel.delete(id); // Llamamos al modelo para eliminar el producto
            if (deletedProduct.affectedRows === 0) {
                return res.status(404).json({ message: messages.products.notFound }); // Si no se encuentra, respondemos con 404
            }
            res.status(200).json({ message: messages.products.deleteSuccess }); // Respondemos con éxito
        } catch (error) {
            res.status(500).json({ message: messages.products.deleteError, error }); // Manejo de errores
        }
    },
    searchProduct: async (req, res) => {
        const { name } = req.query;
        try {
            const results = await ProductModel.search(name);
            if (results.length === 0) {
                return res.status(404).json({ message: messages.products.searchNoResults }); // Si no hay resultados
            }
            res.status(200).json(results)
        } catch (error) {
            res.status(500).json({ message: messages.products.searchError, error }); // Manejo de errores
        }
    }
}


module.exports = ProductController;