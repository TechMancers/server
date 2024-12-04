const express = require('express');
const router = express.Router();
const SearchBookController = require('../../controllers/Customer/search-book.controller');

// Route to search books by term and optional category filters
router.get('/search', SearchBookController.searchBooks);

// Route to get books by a specific category ID
router.get('/searchCategory/:categoryId', SearchBookController.getBooksByCategoryId);

// Route to fetch all categories
router.get('/categories', SearchBookController.getCategories);

module.exports = router;
