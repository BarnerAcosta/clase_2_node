import { Router } from "express";
import brandService from "./service.js";

const router = Router();

// Crear marca
router.post('/', (req, res) => {
    const data = req.body;
    brandService.createNewBrand(data, res);
});

// Obtener todas las marcas
router.get('/', (req, res) => {
    brandService.allBrands(res);
});

// Obtener una marca por ID
router.get('/:id', (req, res) => {
    let params_id = req.params.id;
    brandService.brandById(params_id, res);
});

// Actualizar una marca
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;
    brandService.updateBrandById(id, body, res);
});

// Eliminar una marca
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    brandService.deleteBrandById(id, res);
});

export default router;