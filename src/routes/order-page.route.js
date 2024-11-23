import express from 'express';
import OrderController from '../../controllers/Admin/order-page.controller.js';

const router = express.Router();

router.get('/purchases', OrderController.getAllPurchases);
router.get('/purchases/:purchaseId', OrderController.getPurchaseById);
router.post('/purchases', OrderController.createPurchase);
router.put('/purchases/:purchaseId', OrderController.updatePurchase);
router.delete('/purchases/:purchaseId', OrderController.deletePurchase);

export default router;
