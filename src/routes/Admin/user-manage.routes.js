const express = require('express');
const router = express.Router();
const userManageController = require('../../controllers/Admin/user-manage.controller');

router.get('/users', userManageController.fetchUsers);
router.get('/users/:userId', userManageController.getUserDetails);
router.get('/users/:userId/purchase-history', userManageController.getPurchaseHistory);
router.patch('/users/:userId/state', userManageController.updateUserState);
router.delete('/users/:userId', userManageController.deleteUser);
router.patch('/users/:userId/suspend', userManageController.suspendUser);


module.exports = router;