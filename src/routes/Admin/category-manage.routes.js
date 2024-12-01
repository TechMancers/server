import express from 'express';
const router = express.Router();

import categoryManageController  from'../../controllers/Admin/category-manage.controller';
// const verifyToken = require('../../middleware/verifyToken');

router.get('/get-categories', categoryManageController.getCategories);
router.post('/create-category', categoryManageController.createCategory);
router.put('/update-category', categoryManageController.updateCategory);
router.delete('/delete-category', categoryManageController.deleteCategory);

export default categoryManageRoutes;

