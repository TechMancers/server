const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/Admin/admin.controller');

router.get('/:adminId', adminController.getAdminDetails);
router.put('/:adminId', adminController.updateAdminDetails);
router.put('/:adminId/password', adminController.updateAdminPassword);

module.exports = router;