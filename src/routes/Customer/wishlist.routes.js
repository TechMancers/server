const express = require('express');
const router = express.Router();
const CustomerWishListController = require("../../controllers/Customer/wishlist.controller");

// Route to get wishlist for a specific user
router.get("/:userId", CustomerWishListController.getCustomerWishList);

module.exports = router;
