const express = require('express');
const router = express.Router();
const editProfileController = require('../../controllers/Customer/edit-profile.controller');

router.put('/:userId', editProfileController.updateProfile);

module.exports = router;
