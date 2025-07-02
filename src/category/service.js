import prisma from '../config/database.js';

// Crear nueva categoría
async function createNewCategory(data, res) {
    try {
        const new_category = await prisma.category.create({
            data: {
                name: data.name,
                description: data.description || null
            },
            include: {
                products: {
                    include: {
                        product: true
                    }
                }
            }
        });
        
        res.status(201).json({
            message: 'New category created successfully',
            status: "201",
            data: new_category
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error creating category',
            error: error.message
        });
    }
}

// Obtener todas las categorías
async function allCategories(res) {
    try {
        const categories = await prisma.category.findMany({
            include: {
                products: {
                    include: {
                        product: true
                    }
                }
            }
        });
        res.json(categories);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching categories',
            error: error.message
        });
    }
}

// Obtener categoría por ID
async function categoryById(id, res) {
    try {
        const isInt = +id;
        if (isNaN(isInt)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        
        const category = await prisma.category.findUnique({
            where: { id: isInt },
            include: {
                products: {
                    include: {
                        product: true
                    }
                }
            }
        });
        
        if (!category) {
            return res.status(404).json({
                message: 'Category not found'
            });
        }
        
        res.json(category);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching category',
            error: error.message
        });
    }
}

// Actualizar categoría por ID
async function updateCategoryById(id, body, res) {
    try {
        const isInt = +id;
        if (isNaN(isInt)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        
        const updatedCategory = await prisma.category.update({
            where: { id: isInt },
            data: {
                ...(body.name && { name: body.name }),
                ...(body.description && { description: body.description })
            },
            include: {
                products: {
                    include: {
                        product: true
                    }
                }
            }
        });
        
        res.json({
            message: 'Category updated successfully',
            status: "200",
            data: updatedCategory
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error updating category',
            error: error.message
        });
    }
}

// Eliminar categoría por ID
async function deleteCategoryById(id, res) {
    try {
        const isInt = +id;
        if (isNaN(isInt)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        
        await prisma.category.delete({
            where: { id: isInt }
        });
        
        res.json({
            message: 'Category deleted successfully',
            status: "200"
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error deleting category',
            error: error.message
        });
    }
}

// Asignar producto a categoría (ManyToMany)
async function assignProductToCategory(productId, categoryId, res) {
    try {
        const productIdInt = +productId;
        const categoryIdInt = +categoryId;
        
        if (isNaN(productIdInt) || isNaN(categoryIdInt)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        
        const productCategory = await prisma.productCategory.create({
            data: {
                productId: productIdInt,
                categoryId: categoryIdInt
            },
            include: {
                product: true,
                category: true
            }
        });
        
        res.status(201).json({
            message: 'Product assigned to category successfully',
            status: "201",
            data: productCategory
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error assigning product to category',
            error: error.message
        });
    }
}

// Remover producto de categoría
async function removeProductFromCategory(productId, categoryId, res) {
    try {
        const productIdInt = +productId;
        const categoryIdInt = +categoryId;
        
        if (isNaN(productIdInt) || isNaN(categoryIdInt)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        
        await prisma.productCategory.delete({
            where: {
                productId_categoryId: {
                    productId: productIdInt,
                    categoryId: categoryIdInt
                }
            }
        });
        
        res.json({
            message: 'Product removed from category successfully',
            status: "200"
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error removing product from category',
            error: error.message
        });
    }
}

export default {
    createNewCategory,
    allCategories,
    categoryById,
    updateCategoryById,
    deleteCategoryById,
    assignProductToCategory,
    removeProductFromCategory
};
