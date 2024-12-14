// routes/cart.routes.js
const express = require('express');

const router = express.Router();
const cartController = require('../../controllers/Customer/cart.controller');

router.post('/add', cartController.addItem);
router.delete('/remove', cartController.removeItem);
router.get('/:userId', cartController.getCartItems);
router.delete('/clear', cartController.clearCart);

router.post('/increment', cartController.incrementQuantity);
router.post('/decrement', cartController.decrementQuantity);
router.post('/like', cartController.likeArtwork);
router.post('/liked-status', cartController.getLikedStatus);
router.get('/total-likes/:artworkId', cartController.getTotalLikes); 

module.exports = router;
