import { Router } from "express"; // Importar el enrutador de Express
import { createNewProduct, allProducts, productById, updateProductById, deleteProductById } from "./service.js"; // Importar la función de validación de cadenas

const router = Router(); // Crear una instancia del enrutador de Express


//createProduct
router.post('/', (req, res) => {
    const data = req.body; // Obtener los datos del producto del cuerpo de la petición
    createNewProduct(data, res); // Llamar a la función para crear un nuevo producto
});


//allProducts
router.get('/', (req, res) => {
    allProducts(res); // Llamar a la función para obtener todos los productos
});


//oneProduct
router.get('/:id', (req, res) => {
    let params_id = req.params.id; // Obtener el ID del producto de los parámetros de la ruta
    productById(params_id, res); // Llamar a la función para obtener el producto por ID
    }

);


//updateProduct
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body; // Obtener los datos del producto del cuerpo de la petición
    updateProductById(id, body, res); // Llamar a la función para actualizar el producto
});



//deleteProduct
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    deleteProductById(id, res); // Llamar a la función para eliminar el producto
    
});


export default Router// Exportar el enrutador para que pueda ser utilizado en otros archivos



// //updateProductById
// router.patch('/:id', (req, res) => {

// });




// router.get('/', (req, res) => { // sirve para manejar las peticiones GET a la ruta raíz
//     res.send('Lista productos'); // Respuesta al cliente
// });


// //params
// router.post('/:id', (req, res) => {
//     const { id } = req.params;
//     res.send('Traer Producto con el Id: ' + id); // Respuesta al cliente para crear un trabajador
// });

// //query
// router.get('/estado', (req, res) => {
//     const { estado } = req.query;
//     res.send('Traer productos con el estado: ' + estado);
// });

// //body
// router.post('/new', (req, res) => {
//     const { nombre, precio } = req.body;
//     res.json({
//         message: 'Producto creado',
//         nombre,
//         precio
//     });

// });