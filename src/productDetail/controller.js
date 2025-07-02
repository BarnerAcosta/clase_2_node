import { Router } from "express";
import productDetailService from "./service.js";

const router = Router();

// Crear detalle de producto para un producto específico
router.post('/product/:productId', (req, res) => {
    const productId = req.params.productId;
    const data = req.body;
    productDetailService.createProductDetail(productId, data, res);
});

// Obtener detalle de producto por ID del producto
router.get('/product/:productId', (req, res) => {
    const productId = req.params.productId;
    productDetailService.getProductDetailByProductId(productId, res);
});

// Actualizar detalle de producto
router.put('/product/:productId', (req, res) => {
    const productId = req.params.productId;
    const body = req.body;
    productDetailService.updateProductDetail(productId, body, res);
});

// Eliminar detalle de producto
router.delete('/product/:productId', (req, res) => {
    const productId = req.params.productId;
    productDetailService.deleteProductDetail(productId, res);
});

export default router;
