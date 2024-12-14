const express = require('express');
const router = express.Router();
const bookCardController =require('../../controllers/Customer/bookCardController')


router.get('/', bookCardController.getBestSellingBooks);
router.get('/books', bookCardController.getBooks);




module.exports = router;
   
