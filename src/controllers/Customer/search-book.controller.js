const searchBookModel = require("../../models/Customer/search-book.model");

exports.searchBooks = async (req, res) => {
  const {searchTerm=""} = req.query
  console.log("searchTerm", searchTerm);
  const selectedCategories = req.query.categories 
    ? req.query.categories.split(",") 
    : [];

  try {
    const books = await searchBookModel.searchBooks(searchTerm, selectedCategories);
    res.status(200).json(books);
  } catch (error) {
    console.error("Error in searchBooks controller:", error);
    res.status(500).json({ error: "Error searching books" });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await searchBookModel.getCategories();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error in getCategories controller:", error);
    res.status(500).json({ error: "Error fetching categories" });
  }
};

exports.getBooksByCategoryId = async (req, res) => {
  const categoryId = req.params.categoryId;

  try {
    const books = await searchBookModel.getBooksByCategoryId(categoryId);
    res.status(200).json(books);
  } catch (error) {
    console.error("Error in getBooksByCategoryId controller:", error);
    res.status(500).json({ error: "Error fetching books by category" });
  }
};
