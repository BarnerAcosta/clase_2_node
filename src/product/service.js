
import prisma from '../config/database.js';
import { validateId, foundId, foundProduct } from './validation/validation.js';

// Crear nuevo producto
async function createNewProduct(data, res) {
    try {
        const new_product = await prisma.product.create({
            data: {
                name: data.name,
                description: data.description || null,
                price: parseFloat(data.price),
                stock: parseInt(data.stock) || 0,
                brandId: parseInt(data.brandId)
            },
            include: {
                brand: true,
                detail: true,
                categories: {
                    include: {
                        category: true
                    }
                }
            }
        });
        
        res.status(201).json({
            message: 'New product created successfully',
            status: "201",
            data: new_product
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error creating product',
            error: error.message
        });
    }
}

// Obtener todos los productos
async function allProducts(res) {
    try {
        const products = await prisma.product.findMany({
            include: {
                brand: true,
                detail: true,
                categories: {
                    include: {
                        category: true
                    }
                }
            }
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching products',
            error: error.message
        });
    }
}

// Obtener producto por ID
async function productById(id, res) {
    try {
        const isInt = +id;
        validateId(isInt, res);
        
        const product = await prisma.product.findUnique({
            where: { id: isInt },
            include: {
                brand: true,
                detail: true,
                categories: {
                    include: {
                        category: true
                    }
                }
            }
        });
        
        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }
        
        res.json(product);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching product',
            error: error.message
        });
    }
}

// Actualizar producto por ID
async function updateProductById(id, body, res) {
    try {
        const isInt = +id;
        validateId(isInt, res);
        
        const updatedProduct = await prisma.product.update({
            where: { id: isInt },
            data: {
                ...(body.name && { name: body.name }),
                ...(body.description && { description: body.description }),
                ...(body.price && { price: parseFloat(body.price) }),
                ...(body.stock !== undefined && { stock: parseInt(body.stock) }),
                ...(body.brandId && { brandId: parseInt(body.brandId) })
            },
            include: {
                brand: true,
                detail: true,
                categories: {
                    include: {
                        category: true
                    }
                }
            }
        });
        
        res.json({
            message: 'Product updated successfully',
            status: "200",
            data: updatedProduct
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error updating product',
            error: error.message
        });
    }
}

// Eliminar producto por ID
async function deleteProductById(id, res) {
    try {
        const isInt = +id;
        validateId(isInt, res);
        
        await prisma.product.delete({
            where: { id: isInt }
        });
        
        res.json({
            message: 'Product deleted successfully',
            status: "200"
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error deleting product',
            error: error.message
        });
    }
}

export {
    createNewProduct,
    allProducts,
    productById,
    updateProductById,
    deleteProductById
};