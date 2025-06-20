//aqui se usa el servidor


import express from 'express';  // libreria de Express para crear el servidor web
import product from './product/controller.js'; // Importar el controlador de productos
import brand from './brand/controller.js';

const app = express(); // Crear una instancia de Express

app.use(express.json()); // Middleware para parsear el cuerpo de las peticiones en formato JSON
app.use('/producto', product);
app.use('/marca', brand);

const PORT = 3000; // Puerto en el que se ejecutará el servidor

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})