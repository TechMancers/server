const express = require('express');
const router = express.Router();
const bookCardController =require('../../controllers/Customer/bookCardController')


router.get('/', bookCardController.getBestSellingBooks);




module.exports = router;
   
