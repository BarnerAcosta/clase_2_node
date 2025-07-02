import prisma from '../config/database.js';
import { validateId, foundId, foundBrand } from './validation/validation.js';

// Crear nueva marca
async function createNewBrand(data, res) {
    try {
        const new_brand = await prisma.brand.create({
            data: {
                name: data.name,
                country: data.country || null
            },
            include: {
                products: true
            }
        });
        
        res.status(201).json({
            message: 'New brand created successfully',
            status: "201",
            data: new_brand
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error creating brand',
            error: error.message
        });
    }
}

// Obtener todas las marcas
async function allBrands(res) {
    try {
        const brands = await prisma.brand.findMany({
            include: {
                products: true
            }
        });
        res.json(brands);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching brands',
            error: error.message
        });
    }
}

// Obtener marca por ID
async function brandById(id, res) {
    try {
        const isInt = +id;
        validateId(isInt, res);
        
        const brand = await prisma.brand.findUnique({
            where: { id: isInt },
            include: {
                products: true
            }
        });
        
        if (!brand) {
            return res.status(404).json({
                message: 'Brand not found'
            });
        }
        
        res.json(brand);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching brand',
            error: error.message
        });
    }
}

// Actualizar marca por ID
async function updateBrandById(id, body, res) {
    try {
        const isInt = +id;
        validateId(isInt, res);
        
        const updatedBrand = await prisma.brand.update({
            where: { id: isInt },
            data: {
                ...(body.name && { name: body.name }),
                ...(body.country && { country: body.country })
            },
            include: {
                products: true
            }
        });
        
        res.json({
            message: 'Brand updated successfully',
            status: "200",
            data: updatedBrand
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error updating brand',
            error: error.message
        });
    }
}

// Eliminar marca por ID
async function deleteBrandById(id, res) {
    try {
        const isInt = +id;
        validateId(isInt, res);
        
        await prisma.brand.delete({
            where: { id: isInt }
        });
        
        res.json({
            message: 'Brand deleted successfully',
            status: "200"
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error deleting brand',
            error: error.message
        });
    }
}

export default {
    createNewBrand,
    allBrands,
    brandById,
    updateBrandById,
    deleteBrandById
};