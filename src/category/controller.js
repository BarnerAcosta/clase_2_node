import { Router } from "express";
import categoryService from "./service.js";

const router = Router();

// Crear categoría
router.post('/', (req, res) => {
    const data = req.body;
    categoryService.createNewCategory(data, res);
});

// Obtener todas las categorías
router.get('/', (req, res) => {
    categoryService.allCategories(res);
});

// Obtener una categoría por ID
router.get('/:id', (req, res) => {
    let params_id = req.params.id;
    categoryService.categoryById(params_id, res);
});

// Actualizar una categoría
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;
    categoryService.updateCategoryById(id, body, res);
});

// Eliminar una categoría
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    categoryService.deleteCategoryById(id, res);
});

// Asignar producto a categoría (ManyToMany)
router.post('/:categoryId/products/:productId', (req, res) => {
    const { categoryId, productId } = req.params;
    categoryService.assignProductToCategory(productId, categoryId, res);
});

// Remover producto de categoría
router.delete('/:categoryId/products/:productId', (req, res) => {
    const { categoryId, productId } = req.params;
    categoryService.removeProductFromCategory(productId, categoryId, res);
});

export default router;
