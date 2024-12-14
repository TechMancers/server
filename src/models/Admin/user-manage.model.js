const db = require("../../utils/database");

class ManageUsers {

  static async fetchUsers(search = "", isActive = null, isBanned = null, isSuspended = null, role = null, page = 1, limit = 10) {
    const offset = parseInt((page - 1) * limit, 10);
    const limitInt = parseInt(limit, 10);
  
    try {
      const filters = [];
      const values = [];

      if (search) {
        filters.push("(FName LIKE ? OR LName LIKE ?)");
        values.push(`%${search}%`, `%${search}%`);
      }
  
      if (isActive !== null) {
        filters.push("isActive = ?");
        values.push(isActive);
      }

      if (isBanned !== null) {
        filters.push("isBanned = ?");
        values.push(isBanned);
      }

      if (isSuspended !== null) {
        filters.push("isSuspended = ?");
        values.push(isSuspended);
      }
  
      if (role) {
        filters.push("role = ?");
        values.push(role);
      }
  
      const whereClause = filters.length > 0 ? `WHERE ${filters.join(" AND ")}` : "";
  
      const query = `
        SELECT * FROM users
        ${whereClause}
        ORDER BY registered_at DESC
        LIMIT ? OFFSET ?;
      `;
      values.push(limitInt, offset);
  
      const [users] = await db.query(query, values);
  
      const countQuery = `SELECT COUNT(*) as count FROM users ${whereClause}`;
      const [[{ count }]] = await db.query(countQuery, values.slice(0, -2));
  
      return {
        success: true,
        data: users,
        pagination: {
          totalUsers: count,
          currentPage: page,
          totalPages: Math.ceil(count / limit),
        },
      };
    } catch (error) {
      console.error("Database Error:", error);
      throw error;
    }
  }

  static async getPurchaseHistory(userId) {
    try {
      const [purchaseHistory] = await db.execute(
        `
              SELECT 
                ph.purchase_id,
                ph.description,
                ph.pNumber AS phone_number,
                ph.paymentMethod AS paymentMethod,
                ph.address,
                ph.purchase_datetime
              FROM 
                purchase_history ph
              WHERE 
                ph.user_id = ?
            `,
        [userId]
      );
      return purchaseHistory;
    } catch (error) {
      throw new Error("Error fetching purchase history: " + error.message);
    }
  }

  static async getCartItems(purchaseId) {
    try {
      const [cartItems] = await db.execute(
        `
              SELECT 
                ci.book_id,
                ci.quantity,
                b.name AS book_name,
                b.author AS book_author,
                b.price AS book_price,
                b.description AS book_description,
                b.cover_image AS cover_image
              FROM 
                cart_item ci
              JOIN 
                book b ON ci.book_id = b.book_id
              WHERE 
                ci.purchase_id = ?
            `,
        [purchaseId]
      );
      return cartItems;
    } catch (error) {
      throw new Error("Error fetching cart items: " + error.message);
    }
  }

  static async getUserById(userId) {
    try {
      const [user] = await db.execute(
        `SELECT * FROM users WHERE user_id = ? LIMIT 1`,
        [userId]
      );
      if (user.length > 0) {
        return {
          success: true,
          data: user[0],
        };
      } else {
        return {
          success: false,
          message: "User not found",
        };
      }
    } catch (error) {
      console.error("Database Error:", error);
      throw error; 
    }
  }

  static async updateUserState(userId, isActive, isBanned) {
    try {
      const result = await db.execute(
        `UPDATE users SET isActive = ?, isBanned = ? WHERE user_id = ?`,
        [isActive, isBanned, userId]
      );

      if (result[0].affectedRows > 0) {
        return { success: true, message: "User state updated successfully" };
      } else {
        return { success: false, message: "User not found or no changes made" };
      }
    } catch (err) {
      console.error("Error updating user state:", err);
      throw err;
    }
  }

  static async deleteUser(userId) {
    try {
      const result = await db.execute(
        `DELETE FROM users WHERE user_id = ?`,
        [userId]
      );
      if (result[0].affectedRows > 0) {
        return { success: true, message: "User deleted successfully" };
      } else {
        return { success: false, message: "User not found" };
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      throw err;
    }
  }

  static async suspendUser(userId, isSuspended, suspendReason, suspendBegin, suspendEnd) {
    try {
      const result = await db.execute(
        `UPDATE users 
         SET isSuspended = ?, suspend_reason = ?, suspend_begin = ?, suspend_end = ? 
         WHERE user_id = ?`,
        [isSuspended, suspendReason, suspendBegin, suspendEnd, userId]
      );
  
      if (result[0].affectedRows > 0) {
        return { success: true, message: "User suspension state updated successfully" };
      } else {
        return { success: false, message: "User not found or no changes made" };
      }
    } catch (err) {
      console.error("Error updating suspension state:", err);
      throw err;
    }
  }

}

module.exports = { ManageUsers };