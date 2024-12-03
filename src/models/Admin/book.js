const db = require("../../utils/database");

module.exports = class Book {
    static async addBook(name, author, price, description, stock, category_id) {
        return db.execute(
          `INSERT INTO book (name, author, price, description, stock, category_id)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [name, author, price, description, stock, category_id]
        );
      }





  static async updateBook(bookId, book) {
    const query = `
        UPDATE book 
        SET name = ?, author = ?, price = ?, description = ?, stock = ?, category_id = ?
        WHERE book_id = ?
    `;
    const [result] = await db.execute(query, [
        book.name,
        book.author,
        book.price,
        book.description,
        book.stock,
        book.category_id,
        bookId,
    ]);
    return result;
}


  static async deleteBook(book_id) {
    return db.execute(`DELETE FROM book WHERE book_id = ?`, [book_id]);
  }

  static async getBookById(bookId) {
    return db.execute(`SELECT * FROM book WHERE book_id = ?`, [bookId]);
  }
  static async getBooks() {
    return db.execute("SELECT * FROM book");
  }

  static async getBookStock(bookId) {
    return db.execute(`SELECT stock FROM book WHERE book_id = ?`, [bookId]);
  }


  
 
    static async decrementBookStock(bookId, quantity) {
      const query = `
        UPDATE book 
        SET stock = stock - ? 
        WHERE book_id = ? AND stock >= ?;
      `;
      return db.execute(query, [quantity, bookId, quantity]);
    }
  


  static async incrementBookStock(bookId, quantity) {
    const query = `
        UPDATE book
        SET stock = stock + ?
        WHERE book_id = ? AND stock >= 0
    `;
    const [result] = await db.execute(query, [quantity, bookId]);
    return result;
}

  static async getAllCategories() {
    const query = 'SELECT * FROM category';
    const [rows] = await db.execute(query);
    return rows;
  }

  // Function to get category by ID
  static async getCategoryById(categoryId) {
    const query = 'SELECT * FROM category WHERE category_id = ?';
    const [rows] = await db.execute(query, [categoryId]);
    return rows[0]; // returns the first matching row
  }

  static async getBooksByCategory(categoryId) {
    const query = 'SELECT * FROM book WHERE category_id = ?';
    const [rows] = await db.execute(query, [categoryId]);
    return rows;
  }

};