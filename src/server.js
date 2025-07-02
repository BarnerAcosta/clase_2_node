//aqui se usa el servidor

import express from 'express';  // libreria de Express para crear el servidor web
import product from './product/controller.js'; // Importar el controlador de productos
import brand from './brand/controller.js'; // Importar el controlador de marcas
import category from './category/controller.js'; // Importar el controlador de categorías
import productDetail from './productDetail/controller.js'; // Importar el controlador de detalles de producto

const app = express(); // Crear una instancia de Express

app.use(express.json()); // Middleware para parsear el cuerpo de las peticiones en formato JSON

// Rutas
app.use('/producto', product);
app.use('/marca', brand);
app.use('/categoria', category);
app.use('/detalle', productDetail);

const PORT = process.env.PORT || 3000; // Puerto en el que se ejecutará el servidor

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('🚀 Prisma Database connected!');
    console.log('📊 Available endpoints:');
    console.log('   - /producto (Products)');
    console.log('   - /marca (Brands)');
    console.log('   - /categoria (Categories)');
    console.log('   - /detalle (Product Details)');
})