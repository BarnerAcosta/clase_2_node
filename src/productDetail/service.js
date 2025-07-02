import prisma from '../config/database.js';

// Crear detalle de producto (OneToOne)
async function createProductDetail(productId, data, res) {
    try {
        const productIdInt = +productId;
        if (isNaN(productIdInt)) {
            return res.status(400).json({ message: 'Invalid product ID format' });
        }
        
        const productDetail = await prisma.productDetail.create({
            data: {
                productId: productIdInt,
                warranty: data.warranty || null,
                weight: data.weight ? parseFloat(data.weight) : null,
                dimensions: data.dimensions || null,
                material: data.material || null
            },
            include: {
                product: true
            }
        });
        
        res.status(201).json({
            message: 'Product detail created successfully',
            status: "201",
            data: productDetail
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error creating product detail',
            error: error.message
        });
    }
}

// Obtener detalle de producto por ID del producto
async function getProductDetailByProductId(productId, res) {
    try {
        const productIdInt = +productId;
        if (isNaN(productIdInt)) {
            return res.status(400).json({ message: 'Invalid product ID format' });
        }
        
        const productDetail = await prisma.productDetail.findUnique({
            where: { productId: productIdInt },
            include: {
                product: true
            }
        });
        
        if (!productDetail) {
            return res.status(404).json({
                message: 'Product detail not found'
            });
        }
        
        res.json(productDetail);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching product detail',
            error: error.message
        });
    }
}

// Actualizar detalle de producto
async function updateProductDetail(productId, body, res) {
    try {
        const productIdInt = +productId;
        if (isNaN(productIdInt)) {
            return res.status(400).json({ message: 'Invalid product ID format' });
        }
        
        const updatedProductDetail = await prisma.productDetail.update({
            where: { productId: productIdInt },
            data: {
                ...(body.warranty && { warranty: body.warranty }),
                ...(body.weight && { weight: parseFloat(body.weight) }),
                ...(body.dimensions && { dimensions: body.dimensions }),
                ...(body.material && { material: body.material })
            },
            include: {
                product: true
            }
        });
        
        res.json({
            message: 'Product detail updated successfully',
            status: "200",
            data: updatedProductDetail
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error updating product detail',
            error: error.message
        });
    }
}

// Eliminar detalle de producto
async function deleteProductDetail(productId, res) {
    try {
        const productIdInt = +productId;
        if (isNaN(productIdInt)) {
            return res.status(400).json({ message: 'Invalid product ID format' });
        }
        
        await prisma.productDetail.delete({
            where: { productId: productIdInt }
        });
        
        res.json({
            message: 'Product detail deleted successfully',
            status: "200"
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error deleting product detail',
            error: error.message
        });
    }
}

export default {
    createProductDetail,
    getProductDetailByProductId,
    updateProductDetail,
    deleteProductDetail
};
