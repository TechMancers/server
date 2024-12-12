const db = require("../../utils/database");

class PurchaseHistory {
  // Fetch purchase history for a particular user
  static async getPurchaseHistory(userId) {
    try {
      const [purchaseHistory] = await db.execute(
        `
          SELECT 
            ph.purchase_id,
            ph.description,
            ph.pNumber AS phone_number,
            ph.paymentMethod AS payment_method,
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

  // Fetch cart items for a specific purchase
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
            b.cover_image AS book_cover_image,
            b.description AS book_description
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

  // Delete a purchase record by purchase ID
  static async deletePurchase(purchaseId) {
    try {
      return await db.execute(`DELETE FROM purchase_history WHERE purchase_id = ?`, [purchaseId]);
    } catch (error) {
      throw new Error("Error deleting purchase: " + error.message);
    }
  }

  // Delete associated cart items for a specific purchase
  static async deletePurchaseItems(purchaseId) {
    try {
      return await db.execute(`DELETE FROM cart_item WHERE purchase_id = ?`, [purchaseId]);
    } catch (error) {
      throw new Error("Error deleting purchase items: " + error.message);
    }
  }
}

module.exports = PurchaseHistory;
