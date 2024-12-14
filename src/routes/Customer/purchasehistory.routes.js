const express = require('express');
const router = express.Router();
const PurchaseHistoryController = require('../../controllers/Customer/purchasehistory.controller');

// Route to fetch purchase history for a specific user
router.get('/:userId', PurchaseHistoryController.getPurchaseHistory);

// Route to delete a purchase and associated cart items
router.delete('/:purchaseId', PurchaseHistoryController.deletePurchase);

module.exports = router;