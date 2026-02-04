
const messages = {
    categories: {
        getAllError: "Error al obtener las categorias",
        createSuccess: "Categoria creada exitosamente",
        createError: "Error al crear la categoria",
        missingFields: "El campo nombre y descripcion son obligatorios",
        stringFields: "El campo nombre y descripcion deben ser texto",
        notNullFields: "Los campos no pueden estar vacíos o contener solo espacios",
        notFound: "Categoría no encontrada",
        updateSuccess: "Categoria actualizado correctamente",
        updateError: "Error al actualizar la categoría",
        deleteSuccess: "Categoria eliminada correctamente",
        deleteError: "Error al eliminar la categoría",
        getByIdError: "Error al obtener la categoría por ID",
        searchNoResults: "No se encontraron categorías que coincidan con la búsqueda",
        searchError: "Error al buscar la categoría"
    },
    products: {
        getAllError: "Error al obtener los productos",
        createSuccess: "Producto creado exitosamente",
        createError: "Error al crear el producto",
        missingFields: "El campo nombre, descripcion, precio, stock y la categoría son obligatorios",
        stringFields: "El campo nombre y descripcion deben ser texto",
        numberFields: "El campo stock y precio deben ser números y mayores a 0",
        notNullFields: "Los campos no pueden estar vacíos o contener solo espacios",
        notFound: "Producto no encontrada",
        updateSuccess: "Producto actualizado correctamente",
        updateError: "Error al actualizar el producto",
        deleteSuccess: "Producto eliminado correctamente",
        deleteError: "Error al eliminar el producto",
        searchNoResults: "No se encontraron productos que coincidan con la búsqueda",
        searchError: "Error al buscar el producto"
    },
    auth: {
        loginSuccess: 'Inicio de sesión exitoso',
        loginError: 'Error al iniciar sesión',
        invalidCredentials: 'Usuario o Contraseña son incorrectos',
        missingFields: 'Usuario y contraseña son obligatorios',
        registerSuccess: 'Registro exitoso',
        registerError: 'Error al registrar el usuario'
    },
    sales: {
        getAllError: "Error al obtener las ventas",
        getByIdError: "Error al obtener la venta por ID",
        createSuccess: "Venta creada exitosamente",
        createError: "Error al crear la venta",
        missingFields: "Los campos usuario_id, total y detalles son obligatorios",
        notFound: "No se encontraron compras",
        noSalesFound: "No se encontraron ventas para el rango de fechas seleccionado"
    },
    report: {
        getSalesReportError: 'Error al obtener el reporte de ventas',
        getSalesProductReportError: 'Error al obtener el reporte de productos vendidos'
    }
}

module.exports = messages