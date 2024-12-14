

const db = require("../../utils/database");

class Book {
  static fetchBestSellingBooks() {
    return db.execute(
      `SELECT 
          b.book_id,
          b.name AS book_name,
          b.price AS book_price,
          b.cover_image AS book_image_url,
          b.author AS author_name,
          SUM(ci.quantity) AS total_sold
       FROM 
          book b
       INNER JOIN 
          cart_item ci ON b.book_id = ci.book_id
       INNER JOIN 
          purchase_history ph ON ci.purchase_id = ph.purchase_id
       WHERE 
          ph.purchase_datetime >= NOW() - INTERVAL 30 DAY
       GROUP BY 
          b.book_id
       ORDER BY 
          total_sold DESC
       LIMIT 20;`
    );
  }


  static fetchBooks() {
   return db.execute(
     `SELECT 
         b.book_id,
         b.name AS book_name,
         b.price AS book_price,
         b.cover_image AS book_image_url,
         b.author AS author_name
      FROM 
         book b
     
      WHERE 
         b.stock > 0
      ORDER BY 
         b.price DESC, b.name ASC
      LIMIT 20;`
   );
 }

}

exports.getBestSellingBooks = async (req, res, next) => {
  try {
    const books = await Book.fetchBestSellingBooks();
    res.status(200).json(books[0]);
  } catch (error) {
    console.error("Error fetching best-selling books:", error);
    next(error);
  }
};

exports.getBooks = async (req, res, next) => {
   try {
     const books = await Book.fetchBooks();
     res.status(200).json(books[0]);
   } catch (error) {
     console.error("Error fetching books:", error);
     next(error);
   }
 };