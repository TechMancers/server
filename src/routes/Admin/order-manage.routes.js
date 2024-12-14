const express = require('express');
const router = express.Router();
const orderManageController = require('../../controllers/Admin/order-manage.controller');

router.get('/get-orders', orderManageController.getOrders);

module.exports = router;