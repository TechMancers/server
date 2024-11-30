import express from 'express'
const OrderController = require('../../controllers/Admin/order-page.controller');

const router = express.Router();

router.get("/get-purchase", OrderController.getAllPurchases);
// router.get('/purchases/:purchaseId', OrderController.getPurchaseById);
// router.post('/purchases', OrderController.createPurchase);
// router.put('/purchases/:purchaseId', OrderController.updatePurchase);
// router.delete('/purchases/:purchaseId', OrderController.deletePurchase);

module.exports = router;
