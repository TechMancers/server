const db = require("../../utils/database");

class bookPreview {
  static async getBookDetails(book_id) {
    const query = `SELECT book.*, category.name as category_name FROM book LEFT JOIN category ON book.category_id = category.category_id WHERE book.book_id = ?`;
    const [rows] = await db.execute(query, [book_id]);
    return rows;
  }

  static async getRelatedBooks(book_id) {
    const query = `
        SELECT * 
        FROM book 
        WHERE author = (SELECT author FROM book WHERE book_id = ?)
          AND book_id != ? 
    `;

    try {
      const [rows] = await db.execute(query, [book_id, book_id]);
      return rows;
    } catch (error) {
      console.error("Error fetching related books:", error);
      throw new Error("An error occurred while fetching related books.");
    }
  }

  static async addToWhishlist(book_id, user_id) {
    const query = `INSERT INTO wishlist (book_id, user_id) VALUES (?, ?)`;
    const [rows] = await db.execute(query, [book_id, user_id]);
    return rows;
  }

  static async removeFromWhishlist(book_id, user_id) {
    const query = `DELETE FROM wishlist WHERE book_id = ? AND user_id = ?`;
    const [rows] = await db.execute(query, [book_id, user_id]);
    return rows;
  }
}

class comments {
  static async getComments(book_id) {
    const query = `SELECT c.*, u.FName, u.LName, u.profile_photo FROM comment c JOIN users u ON u.user_id = c.user_id WHERE book_id = ?`;
    const [rows] = await db.execute(query, [book_id]);
    return rows;
  }

  static async insertComment(book_id, user_id, content) {
    try {
      const result = await db.execute(
        "INSERT INTO comment (book_id, user_id, content) VALUES (?, ?, ?)",
        [book_id, user_id, content]
      );

      const insertedCommentId = result[0].insertId;

      const insertedComment = await this.getCommentById(insertedCommentId);
      return insertedComment;
    } catch (error) {
      console.error("Error inserting comment:", error);
      throw new Error("An error occurred while inserting comment.");
    }
  }

  static async getCommentById(comment_id) {
    const query = `SELECT c.*, u.FName, u.LName, u.profile_photo FROM comment c JOIN users u ON u.user_id = c.user_id WHERE comment_id = ?`;
    const [rows] = await db.execute(query, [comment_id]);
    if (rows.length === 0) {
      throw new Error("Comment not found.");
    }
    return rows[0];
  }

  static async insertReply(comment_id, user_id, content, parent_id) {
    console.log(comment_id, user_id, content, parent_id);
    try {
      //   const query = `INSERT INTO comment (book_id, user_id, content, parent_comment_id) VALUES (?, ?, ?, ?)`;
      //   const rows = await db.execute(query, [
      //     comment_id,
      //     user_id,
      //     content,
      //     parent_id,
      //   ]);
      const result = await db.execute(
        "INSERT INTO comment (book_id, user_id, content, parent_comment_id) VALUES (?, ?, ?, ?)",
        [comment_id, user_id, content, parent_id]
      );
      //what is this insertId?????
      // why commented code doen't work
      const insertedCommentId = result[0].insertId;

      const insertedComment = await this.getCommentById(insertedCommentId);
      return insertedComment;
    } catch (error) {
      console.error("Error inserting reply:", error);
      throw new Error("An error occurred while inserting reply.");
    }
  }

  static async updateComment(comment_id, content) {
    try {
      const query = `UPDATE comment SET content = ? WHERE comment_id = ?`;
      const [rows] = await db.execute(query, [content, comment_id]);

      const updatedComment = await this.getCommentById(comment_id);
      return updatedComment;
    } catch (error) {
      console.error("Error updating comment:", error);
      throw new Error("An error occurred while updating comment.");
    }
  }

  static async deleteComment(comment_id) {
    try {
      const query = `DELETE FROM comment WHERE comment_id = ?`;
      await db.execute(query, [comment_id]);
    } catch (error) {
      console.error("Error deleting comment:", error);
      throw new Error("An error occurred while deleting comment.");
    }
  }
}

module.exports = { bookPreview, comments };
