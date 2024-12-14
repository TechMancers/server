const { BookOrders } = require("../../models/Admin/order-manage.model");

exports.getOrders = async (req, res) => {
  try {
    const orders = await BookOrders.getOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// exports.createCategory = async (req, res) => {
//   const { category_name } = req.body;
//   try {
//     const result = await BookCategories.createCategory(category_name);
//     if (result.success) {
//       res.status(201).json(result);
//     } else {
//       res.status(400).json(result);
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.updateCategory = async (req, res) => {
//   const { category_id, category_name } = req.body;

//   if (!category_id || !category_name) {
//     return res.status(400).json({
//       success: false,
//       message: "Both 'category_id' and 'category_name' are required",
//     });
//  }

//   try {
//     const result = await BookCategories.updateCategory(
//       category_id,
//       category_name
//     );

    // if (result.success) {
    //   res.status(200).json(result);
    // } else {
    //   res.status(404).json({
    //     success: false,
    //     message: "Category not found or no changes made",
    //   });
    // }
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "An error occurred while updating the category",
//       error: error.message,
//     });
//   }
//};

// exports.deleteCategory = async (req, res) => {
//     const { category_id } = req.body;

//     if (!category_id) {
//         return res.status(400).json({
//             success: false,
//             message: "'category_id' is required",
//         });
//     }

//     try {
//         const bookCount = await BookCategories.getBookCount(category_id);
//         if (bookCount > 0) {
//             return res.status(400).json({
//                 success: false,
//                 message: "There are books in this category; it cannot be deleted.",
//             });
//         }

//         const result = await BookCategories.deleteCategory(category_id);

//         if (result.success) {
//             return res.status(200).json({
//                 success: true,
//                 message: result.message,
//             });
//         } else {
//             return res.status(404).json({
//                 success: false,
//                 message: "Category not found",
//             });
//         }
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "An error occurred while deleting the category",
//             error: error.message,
//         });
//     }
//};

