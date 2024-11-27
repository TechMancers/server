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

module.exports = router;
