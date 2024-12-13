const express = require('express');
const router = express.Router();
const categorycontroller = require('../../controllers/Customer/category.controller');

router.get('/',categorycontroller.getcategories);

module.exports = router;
