const express = require('express');
const router = express.Router();
const categoryManageController = require('../../controllers/Admin/category-manage.controller');
// const verifyToken = require('../../middleware/verifyToken');

router.get('/get-categories', categoryManageController.getCategories);
router.post('/create-category', categoryManageController.createCategory);
router.put('/update-category/:category_id', categoryManageController.updateCategory);
router.delete('/delete-category/:category_id', categoryManageController.deleteCategory);

module.exports = router;