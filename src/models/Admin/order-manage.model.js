const db = require("../../utils/database");

class BookOrders {
  static async getOrders() {
    const query = "SELECT * FROM purchase_history";
    const [rows] = await db.execute(query);
    return rows;
  }
}

module.exports = { BookOrders };
