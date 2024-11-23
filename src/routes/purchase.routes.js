const express = require('express');
const router = express.Router();
const cartController = require('../controllers/Customer/purchase.controller');

router.post('/:user_id', cartController.createPurchase);
router.get('/:user_id', cartController.getUserDetails);

module.exports = router;
