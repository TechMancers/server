const express = require('express');
const router = express.Router();
const CustomerProfile = require('../../controllers/Customer/profile-page.controller');

router.get('/:userId', CustomerProfile.getAllCustomers);


module.exports = router;
