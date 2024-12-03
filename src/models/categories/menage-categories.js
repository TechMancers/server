// const db = require("../../utils/database");

// // class Category {
// //   static async addCategory(name, description) {
// //     const query = `INSERT INTO category (name, description) VALUES (?, ?)`;
// //     const [result] = await db.execute(query, [name, description]);
// //     return result;
// //   }

// //   static async deleteCategory(categoryId) {
// //     const query = `DELETE FROM category WHERE id = ?`;
// //     const [result] = await db.execute(query, [categoryId]);
// //     return result;
// //   }

// //   static async updateCategory(categoryId, name, description) {
// //     const query = `UPDATE category SET name = ?, description = ? WHERE id = ?`;
// //     const [result] = await db.execute(query, [name, description, categoryId]);
// //     return result;
// //   }
// // }

// // // Export the class once at the end
// // module.exports = Category;


// // module.exports = class CategoryClass {
// //     static async addCategory(name, description) {
// //         return db.execute(
// //           `INSERT INTO category (name, description)
// //            VALUES (?, ?)`,
// //           [name, description]
// //         );
// //       }
  
// //       static async updateCategory(categoryId, name, description) {
// //         return db.execute(
// //           `UPDATE category 
// //            SET name = ?, description = ?
// //            WHERE id = ?`,
// //           [name, description, categoryId]
// //         );
// //       }
  
// //       static async deleteCategory(categoryId) {
// //         return db.execute(`DELETE FROM category WHERE id = ?`, [categoryId]);
// //       }
// //   }

// // module.exports = class Category {
// //     static async addCategory(name, description) {
// //       return db.execute(
// //         `INSERT INTO category (name, description)
// //          VALUES (?, ?)`,
// //         [name, description]
// //       );
// //     }
  
// //     static async updateCategory(categoryId, name, description) {
// //       return db.execute(
// //         `UPDATE category 
// //          SET name = ?, description = ?
// //          WHERE id = ?`,
// //         [name, description, categoryId]
// //       );
// //     }
  
// //     static async deleteCategory(categoryId) {
// //       return db.execute(`DELETE FROM category WHERE id = ?`, [categoryId]);
// //     }
// //   };

// module.exports = class Category {
//     static async addCategory(name, description) {
//       return db.execute(
//         `INSERT INTO category (name, description)
//          VALUES (?, ?)`,
//         [name, description]
//       );
//     }
  
//     static async updateCategory(categoryId, name, description) {
//       return db.execute(
//         `UPDATE category 
//          SET name = ?, description = ?
//          WHERE id = ?`,
//         [name, description, categoryId]
//       );
//     }
  
//     static async deleteCategory(categoryId) {
//       return db.execute(`DELETE FROM category WHERE id = ?`, [categoryId]);
//     }
//   };