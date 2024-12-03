// // In your category.controller.js
// const Category = require('../models/categories/menage-categories');

// // exports.addCategory = async (req, res, next) => {
// //     const { name, description } = req.body;
  
// //     try {
// //       const result = await Category.addCategory(name, description);
// //       if (result.affectedRows > 0) {
// //         res.status(201).json({
// //           message: 'Category added successfully!',
// //           categoryId: result.insertId, // returning the ID of the newly added category
// //         });
// //       } else {
// //         res.status(400).json({
// //           message: 'Failed to add category.',
// //         });
// //       }
// //     } catch (error) {
// //       console.error('Error adding category:', error);
// //       next(error);
// //     }
// //   };
// //   // In your category.controller.js
// // exports.updateCategory = async (req, res, next) => {
// //   const categoryId = req.params.id;
// //   const { name, description } = req.body;

// //   try {
// //     const result = await Category.updateCategory(categoryId, name, description);
// //     if (result.affectedRows > 0) {
// //       res.status(200).json({
// //         message: 'Category updated successfully!',
// //       });
// //     } else {
// //       res.status(400).json({
// //         message: 'Category not found or unable to update.',
// //       });
// //     }
// //   } catch (error) {
// //     console.error('Error updating category:', error);
// //     next(error);
// //   }
// // };

// //   // In your category.controller.js
// // exports.deleteCategory = async (req, res, next) => {
// //   const categoryId = req.params.id;

// //   try {
// //     const result = await Category.deleteCategory(categoryId);
// //     if (result.affectedRows > 0) {
// //       res.status(200).json({
// //         message: 'Category deleted successfully!',
// //       });
// //     } else {
// //       res.status(400).json({
// //         message: 'Category not found or unable to delete.',
// //       });
// //     }
// //   } catch (error) {
// //     console.error('Error deleting category:', error);
// //     next(error);
// //   }
// // };

// exports.addCategory = async (req, res, next) => {
//   const { name, description } = req.body;

//   try {
//     const result = await Category.addCategory(name, description);
//     if (result[0].affectedRows > 0) {
//       res.status(201).json({
//         message: 'Category added successfully!',
//         categoryId: result[0].insertId, // Returning the ID of the newly added category
//       });
//     } else {
//       res.status(400).json({
//         message: 'Failed to add category.',
//       });
//     }
//   } catch (error) {
//     console.error('Error adding category:', error);
//     next(error);
//   }
// };

// exports.updateCategory = async (req, res, next) => {
//   const categoryId = req.params.categoryId;
//   const { name, description } = req.body;

//   try {
//     const result = await Category.updateCategory(categoryId, name, description);
//     if (result[0].affectedRows > 0) {
//       res.status(200).json({
//         message: 'Category updated successfully!',
//       });
//     } else {
//       res.status(404).json({
//         message: 'Category not found or unable to update.',
//       });
//     }
//   } catch (error) {
//     console.error('Error updating category:', error);
//     next(error);
//   }
// };

// exports.deleteCategory = async (req, res, next) => {
//   const categoryId = req.params.categoryId;

//   try {
//     const result = await Category.deleteCategory(categoryId);
//     if (result[0].affectedRows > 0) {
//       res.status(200).json({
//         message: 'Category deleted successfully!',
//       });
//     } else {
//       res.status(404).json({
//         message: 'Category not found or unable to delete.',
//       });
//     }
//   } catch (error) {
//     console.error('Error deleting category:', error);
//     next(error);
//   }
// };
