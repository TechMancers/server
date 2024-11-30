const db = require("../../utils/database");

class PurchaseHistoryModel {
  // Method to get all purchase histories
  static async getAllPurchases() {
    const [rows] = await query('SELECT * FROM `kiyawanalk.purchase_history`');
    return rows;
  }

  // Method to get a single purchase by ID
  static async getPurchaseById(purchaseId) {
    const [rows] = await query('SELECT * FROM `purchase_history` WHERE purchase_id = ?', [purchaseId]);
    return rows[0]; // Return the first row (single purchase)
  }

  // Method to create a new purchase
  static async createPurchase(purchaseData) {
    const { user_id, description, pNumber, paymentMethod, address, purchase_datetime } = purchaseData;
    const [result] = await query(
      'INSERT INTO `purchase_history` (user_id, description, pNumber, paymentMethod, address, purchase_datetime) VALUES (?, ?, ?, ?, ?, ?)',
      [user_id, description, pNumber, paymentMethod, address, purchase_datetime]
    );
    return result.insertId; // Return the ID of the inserted purchase
  }

  // Method to update a purchase record
  static async updatePurchase(purchaseId, purchaseData) {
    const { description, pNumber, paymentMethod, address, purchase_datetime } = purchaseData;
    const [result] = await query(
      'UPDATE `purchase_history` SET description = ?, pNumber = ?, paymentMethod = ?, address = ?, purchase_datetime = ? WHERE purchase_id = ?',
      [description, pNumber, paymentMethod, address, purchase_datetime, purchaseId]
    );
    return result.affectedRows; // Return the number of updated rows
  }

  // Method to delete a purchase record
  static async deletePurchase(purchaseId) {
    const [result] = await query('DELETE FROM `purchase_history` WHERE purchase_id = ?', [purchaseId]);
    return result.affectedRows; // Return the number of deleted rows
  }
}

export default PurchaseHistoryModel;
