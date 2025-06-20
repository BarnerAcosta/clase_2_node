
`ARCHIVO SERVER`
import express from 'express';  // Importa la librería Express, que permite crear servidores web fácilmente.
import product from './product/controller.js'; // Importa el router/controlador de productos.
import brand from './brand/controller.js';     // Importa el router/controlador de marcas.

const app = express(); // Crea una nueva aplicación de Express (el servidor).

app.use(express.json()); // Middleware que permite a Express entender y procesar datos en formato JSON enviados en las peticiones.
app.use('/producto', product); // Todas las rutas que empiecen con /producto serán manejadas por el router de productos.
app.use('/marca', brand);      // Todas las rutas que empiecen con /marca serán manejadas por el router de marcas.

const PORT = 3000; // Define el puerto donde el servidor escuchará las peticiones.

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    // Inicia el servidor y muestra un mensaje en consola indicando que está funcionando.
});

En el archivo del server se configura y lanza la aplicación web usando Express. Primero, se importan las dependencias necesarias: Express y los routers de productos y marcas. Luego, se crea una instancia de la aplicación Express, que será el servidor principal. Se agrega un middleware para que el servidor pueda procesar datos en formato JSON enviados por los clientes.

Después, se definen las rutas principales: todas las peticiones que comiencen con /producto serán gestionadas por el router de productos, y las que comiencen con /marca por el router de marcas. Finalmente, se define el puerto en el que el servidor escuchará las peticiones (en este caso, el 3000) y se inicia el servidor, mostrando un mensaje en consola para indicar que está funcionando correctamente y en qué dirección se puede acceder.


`ARCHIVO CONTROLLER`
En el archivo controller.js de la carpeta product se definen y gestionan todas las rutas (endpoints) relacionadas con los productos. Este archivo importa el módulo de Express Router y el servicio de productos, que contiene la lógica de negocio.

Primero, se crea una instancia de Router para organizar las rutas de manera modular. Luego, se definen las rutas principales para productos:

La ruta POST /producto/ permite crear un nuevo producto, recibiendo los datos desde el cuerpo de la petición y delegando la lógica al servicio.
La ruta GET /producto/ devuelve la lista de todos los productos almacenados.
La ruta GET /producto/:id busca y devuelve un producto específico según el ID recibido en la URL.
La ruta PUT /producto/:id permite actualizar completamente un producto existente, recibiendo el ID por la URL y los nuevos datos por el cuerpo de la petición.
La ruta DELETE /producto/:id elimina un producto específico según el ID recibido.

Cada ruta recibe la petición, extrae los datos necesarios (como parámetros o cuerpo de la petición) y llama a la función correspondiente del servicio de productos, que se encarga de la lógica y la respuesta. Finalmente, el router se exporta para ser utilizado en el servidor principal.



`ARCHIVO SERVICE`
En el archivo service.js de la carpeta product se implementa toda la lógica de negocio para gestionar los productos. Aquí se simula una base de datos usando un array en memoria y se definen funciones para cada operación principal del CRUD.

La función createNewProduct(data, res) crea un nuevo producto, le asigna un ID único, lo agrega al array de productos y responde al cliente confirmando la creación.
La función allProducts(res) devuelve la lista completa de productos almacenados.
La función productById(id, res) busca un producto por su ID, valida que exista y lo devuelve como respuesta.
La función updateProductById(id, body, res) busca el producto por su ID, valida que exista y actualiza sus datos con la información recibida.
La función deleteProductById(id, res) busca el producto por su ID, valida que exista y lo elimina del array.

Cada función recibe los datos necesarios (como el ID o el cuerpo de la petición) y el objeto res para enviar la respuesta al cliente. Además, se utilizan funciones de validación para asegurar que los datos sean correctos y que el producto exista antes de realizar cualquier operación. Finalmente, todas las funciones se exportan juntas como un objeto para ser utilizadas en el controlador.


`ARCHIVO VALIDATION`
En el archivo validation.js dentro de la carpeta product/validation se encuentran las funciones encargadas de validar los datos antes de realizar operaciones sobre los productos. Estas validaciones ayudan a evitar errores y a asegurar que las operaciones solo se realicen con datos correctos.

La función validateId(id, res) verifica que el ID recibido sea un número válido y mayor que cero. Si no es válido, responde con un error 400 y detiene la ejecución.
La función foundId(index, res) comprueba que el índice del producto exista en el array (es decir, que no sea -1). Si no existe, responde con un error 404 y detiene la ejecución.
La función foundProduct(product, res) verifica que el producto buscado realmente exista (que no sea undefined o null). Si no existe, responde con un error 404 y detiene la ejecución.

Estas funciones se exportan para ser utilizadas en el archivo de servicios (service.js), permitiendo que cada operación valide los datos antes de modificar, buscar o eliminar productos. Así, se mejora la robustez y seguridad de la API.