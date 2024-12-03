const express= require('express');
const router = express.Router();
const bookController= require('../controllers/books.controller');

router.post('/books',bookController.addBook); // working
router.put('/update-books/:bookId',bookController.updateBook); // working 
router.delete('/delete-book/:bookId', bookController.deleteBook);  //working
router.get('/books/:bookId', bookController.getBookById);   //working
router.get('/books', bookController.getBooks);               //working
router.get('/books/:bookId/stock', bookController.getBookStock);    //working
router.post('/books/decrement-stock', bookController.decrementBookStock);  //working
router.post('/books/increment-stock', bookController.incrementBookStock);// working

//categories.....................
router.get('/categories', bookController.getAllCategories);   //done
router.get('/categories/:categoryId', bookController.getCategoryById); //done 
router.get('/books/category/:categoryId', bookController.getBooksByCategory); //done


module.exports = router;
