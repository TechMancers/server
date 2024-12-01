const db = require("../../utils/database");

class BookOrders {
  static async getOrders() {
    const query = "SELECT * FROM purchase_history";
    const [rows] = await db.execute(query);
    return rows;
  }

//   static async createCategory(name) {
//     const [result] = await db.execute(
//       "INSERT INTO category (name) VALUES (?)",
//       [name]
//     );
//     if (result.affectedRows > 0) {
//       return {
//         success: true,
//         message: "Category created successfully",
//         categoryId: result.insertId,
//       };
//     }

//     return {
//       success: false,
//       message: "Failed to create category",
//     };
//   }

//   static async updateCategory(category_id, name) {
//     const [result] = await db.execute(
//       "UPDATE category SET name = ? WHERE category_id = ?",
//       [name, category_id]
//     );

//     if (result.affectedRows > 0) {
//       return {
//         success: true,
//         message: "Category updated successfully",
//       };
//     }

//     return {
//       success: false,
//       message: "No category found with the given ID or no changes made",
//     };
//   }

//   static async getBookCount(category_id) {
//     const query = `SELECT COUNT(*) AS bookCount FROM book WHERE category_id = ?`;
//     const [rows] = await db.execute(query, [category_id]);
//     return rows[0].bookCount;
//   }

//   static async deleteCategory(category_id) {
//     const query = `DELETE FROM category WHERE category_id = ?`;
//     const [result] = await db.execute(query, [category_id]);
//     return {
//       success: result.affectedRows > 0,
//       message:
//         result.affectedRows > 0
//           ? "Category deleted successfully"
//           : "Category not found",
//     };
//   }
}

module.exports = { BookOrders };
