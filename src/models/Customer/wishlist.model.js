const db = require("../../utils/database");

class CustomerWishList {
  static fetchWishList(userId) {
    return db.execute(
      `
        SELECT 
          w.user_id AS customer_id,
          b.book_id,
          b.name AS book_name,
          b.author AS book_author,
          b.price AS book_price,
          b.cover_image AS book_cover_image,
          b.description AS book_description,
          b.stock AS available_stock,
          c.name AS category_name
        FROM 
          wishlist w
        INNER JOIN 
          book b ON w.book_id = b.book_id
        LEFT JOIN 
          category c ON b.category_id = c.category_id
        WHERE 
          w.user_id = ?
        GROUP BY 
          w.user_id, b.book_id;
      `,
      [userId]
    );
  }
}

module.exports = CustomerWishList;
