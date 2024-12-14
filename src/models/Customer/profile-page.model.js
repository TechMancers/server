const db = require("../../utils/database");

class CustomerProfile{
    static fetchAll(userId) {
        return db.execute(
          `SELECT
            u.fName,
            u.LName,
            u.address,
            u.registered_at AS joined_date,
            COUNT(DISTINCT w.book_id) AS total_wishlist_items,
            COUNT(DISTINCT ph.purchase_id) AS total_purchases,
            u.email,
            u.phone
          FROM
            users u
          LEFT JOIN
            wishlist w ON u.user_id = w.user_id
          LEFT JOIN
            purchase_history ph ON u.user_id = ph.user_id
          WHERE
            u.user_id = ?
          GROUP BY
            u.user_id;`,
          [userId]
        );
    }
    
  static deactivateUser(userId) {
    return db.execute(
      `UPDATE user
       SET isActive = 0
       WHERE user_id = ?`,
      [userId]
    );
  }
}

module.exports = CustomerProfile;