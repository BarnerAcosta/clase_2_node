
import { validateId, foundId, foundProduct} from './validation/validation.js'; // Importar función de validación de cadenas

let products = []; // Array para almacenar productos en memoria (simulación de base de datos)
let id = 0; // Variable para generar IDs únicos para los productos

function createNewProduct(data, res) {
    const new_product = {
    id: ++id, // Asignar un ID único al nuevo producto
    ...data // Asignar los datos del producto
    };
    products.push(new_product); // Agregar el nuevo producto al array  
    res.json({
        message: 'New procuct created successfully',
        status: "200"
    }); // Respuesta al cliente con el producto creado   
}


function allProducts(res) {
    res.json(products); // Respuesta al cliente con la lista de productos
}


function productById(id, res) {
    const isInt =+id
    validateId(isInt, res); // Validar que el ID sea un número
    const product = products.find(product => product.id === isInt) // Buscar el producto por ID
    foundProduct(product, res); // Validar que el producto exista
    res.json(product); // Respuesta al cliente con el producto encontrado
}


function updateProductById(id, body, res) {
    const isInt = +id; // Convertir el ID a un número
    validateId(isInt, res);
    const product = products.findIndex(product => product.id === isInt); // Buscar el índice del producto por ID
    foundId(product, res); // Validar que el ID exista
    products[product] = { ...products[product], ...body }; // Actualizar el producto con los nuevos datos
    res.json({
        message: 'New procuct updated successfully',
        status: "200"
    });
}


function deleteProductById(id, res){
    const isInt = +id; // Convertir el ID a un número
    validateId(isInt, res);
    const product = products.findIndex(product => product.id === isInt);
    foundId(product, res); 
    products.splice(product, 1); // Elimina el producto del array
    res.json({
        message: 'Product deleted successfully',
        status: "200"
    });
}





export {
    createNewProduct,
    allProducts,
    productById,
    updateProductById,
    deleteProductById
}