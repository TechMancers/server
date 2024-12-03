const Book = require("../../models/Admin/book");


exports.addBook = async (req, res, next) => {
  try { 
    // Log the incoming request body for debugging
    console.log("Request Body:", req.body);

    // Destructure and validate request body
    const { name, author, price, description, stock, category_id } = req.body;

    if (!name || !author || !price || !stock || !category_id) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Call the model method to add the book
    const result = await Book.addBook(
      name,
      author,
      price,
      description,
      stock,
      category_id
    );

    // Send success response
    res.status(201).json({ message: "Book added successfully!", data: result });
  } catch (error) {
    // Log and pass the error to the error handler
    console.error("Error adding book:", error);
    next(error);
  }
};






exports.updateBook = async (req, res, next) => {
  const bookId = req.params.bookId;
  const { name, author, price, description, stock, category_id } = req.body;

  if (!bookId || !name || !author || price === undefined || !description || stock === undefined || !category_id) {
      return res.status(400).json({ message: "Invalid input. All fields are required." });
  }

  try {
      const result = await Book.updateBook(bookId, {
          name,
          author,
          price,
          description,
          stock,
          category_id,
      });

      if (result.affectedRows > 0) {
          res.status(200).json({ message: "Book updated successfully!" });
      } else {
          res.status(404).json({ message: "Book not found." });
      }
  } catch (error) {
      console.error("Error updating book:", error);
      next(error);
  }
};


exports.deleteBook = async (req, res, next) => {
  const bookId = req.params.bookId;

  try {
    await Book.deleteBook(bookId);
    res.status(200).json({ message: "Book deleted successfully!" });
  } catch (error) {
    console.error("Error deleting book:", error);
    next(error);
  }
};

exports.getBookById = async (req, res, next) => {
  const bookId = req.params.bookId;

  try {
    const [book] = await Book.getBookById(bookId);
    if (book.length > 0) {
      res.status(200).json(book[0]);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    console.error("Error fetching book by ID:", error);
    next(error);
  }
};
exports.getBooks = async (req, res, next) => {
  try {
    const [books] = await Book.getBooks();
    res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    next(error);
  }
};

exports.getBookStock = async (req, res, next) => {
  const bookId = req.params.bookId;

  try {
    const [stock] = await Book.getBookStock(bookId);
    if (stock.length > 0) {
      res.status(200).json({ stock: stock[0].stock });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    console.error("Error fetching book stock:", error);
    next(error);
  }
};




exports.decrementBookStock = async (req, res, next) => {
  const { bookId, quantity } = req.body;

  try {
    const [result] = await Book.decrementBookStock(bookId, quantity); // Destructuring the first element  
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Book stock decremented successfully!" });
      console.log("Book stock decremented successfully")   // should remove 
    } else {
      res
        .status(400)
        .json({ message: "Unable to decrement stock or insufficient stock" });
    }
  } catch (error) {
    console.error("Error decrementing book stock:", error);
    next(error);
  }
};



exports.incrementBookStock = async (req, res, next) => {
  const { bookId, quantity } = req.body;

  if (!bookId || !quantity) {
      return res.status(400).json({ message: "Invalid input. Book ID and quantity are required." });
  }

  try {
      const result = await Book.incrementBookStock(bookId, quantity);

      if (result.affectedRows > 0) {
          res.status(200).json({ message: "Book stock incremented successfully!" });
      } else {
          res.status(400).json({ message: "Unable to increment stock. Check the book ID or stock availability." });
      }
  } catch (error) {
      console.error("Error incrementing book stock:", error);
      next(error);
  }
};

//category................................................

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Book.getAllCategories();
    res.status(200).json({ categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    next(error);
  }
};

exports.getCategoryById = async (req, res, next) => {
  const categoryId = req.params.categoryId;

  try {
    const category = await Book.getCategoryById(categoryId);
    if (category) {
      res.status(200).json({ category });
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    console.error('Error fetching category:', error);
    next(error);
  }
};

exports.getBooksByCategory = async (req, res, next) => {
  const categoryId = req.params.categoryId;

  try {
    const books = await Book.getBooksByCategory(categoryId);
    res.status(200).json({ books });
  } catch (error) {
    console.error('Error fetching books:', error);
    next(error);
  }
};