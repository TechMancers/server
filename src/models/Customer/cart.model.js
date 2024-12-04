//const db = require('../utils/database');

const db = require('../../utils/database');

class Cart {
  static async addItem(userId, bookId) {
    const [rows] = await db.execute(
      'SELECT * FROM cart WHERE user_id = ? AND book_id = ?',
      [userId, bookId]
    );
    if (rows.length === 0) {
      return db.execute(
        'INSERT INTO cart (user_id, book_id, quantity) VALUES (?, ?, 1)',
        [userId, bookId]
      );
    } else {
      return Promise.resolve();
    }
  }

  static async removeItem(userId, bookId) {
    return db.execute(
      'DELETE FROM cart WHERE user_id = ? AND book_id = ?',
      [userId, bookId]
    );
  }

  static async getCartItems(userId) {
    const query = `
      SELECT c.book_id, a.name AS name, a.price, c.quantity, a.author AS author_name
      FROM cart c
      JOIN book a ON c.book_id = a.book_id
      
      WHERE c.user_id = ?
    `;
    return db.execute(query, [userId]);
  }

  static async updateQuantity(userId, bookId, quantity) {
    return db.execute(
      'UPDATE cart SET quantity = ? WHERE user_id = ? AND book_id = ?',
      [quantity, userId, bookId]
    );
  }

  static async incrementQuantity(userId, bookId) {
    const [rows] = await db.execute(
      'SELECT quantity FROM cart WHERE user_id = ? AND book_id = ?',
      [userId, bookId]
    );
    if (rows.length === 0) {
      throw new Error('Item not found in cart');
    }
    const newQuantity = rows[0].quantity + 1;
    return db.execute(
      'UPDATE cart SET quantity = ? WHERE user_id = ? AND book_id = ?',
      [newQuantity, userId, bookId]
    );
  }

  static async decrementQuantity(userId, bookId) {
    const [rows] = await db.execute(
      'SELECT quantity FROM cart WHERE user_id = ? AND book_id = ?',
      [userId, bookId]
    );
    if (rows.length === 0) {
      throw new Error('Item not found in cart');
    }
    const currentQuantity = rows[0].quantity;
    if (currentQuantity <= 1) {
      return Promise.resolve();
    } else {
      const newQuantity = currentQuantity - 1;
      return db.execute(
        'UPDATE cart SET quantity = ? WHERE user_id = ? AND book_id = ?',
        [newQuantity, userId, bookId]
      );
    }
  }

  static async clearCart(userId) {
    return db.execute('DELETE FROM cart WHERE user_id = ?', [userId]);
  }

  static async likeArtwork(userId, bookId) {
    const [rows] = await db.execute(
      'SELECT * FROM book_like WHERE user_id = ? AND book_id = ?',
      [userId, bookId]
    );
    if (rows.length === 0) {
      return db.execute(
        'INSERT INTO book_like (user_id, book_id, liked_at) VALUES (?, ?, NOW())',
        [userId, bookId]
      );
    } else {
      return db.execute(
        'DELETE FROM book_like WHERE user_id = ? AND book_id = ?',
        [userId, bookId]
      );
    }
  }

  static async getTotalLikes(bookId) {
    const [rows] = await db.execute(
      'SELECT COUNT(*) AS total_likes FROM book_like WHERE book_id = ?',
      [bookId]
    );
    return rows[0].total_likes;
  }

  static async getLikedStatus(userId, bookId) {
    const [rows] = await db.execute(
      'SELECT * FROM book_like WHERE user_id = ? AND book_id = ?',
      [userId, bookId]
    );
    return rows.length > 0;
  }
}

module.exports = Cart;
