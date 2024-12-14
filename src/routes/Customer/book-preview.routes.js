const express = require('express');
const router = express.Router();
const bookPreviewController = require('../../controllers/Customer/book-preview.controller');

router.get('/:book_id', bookPreviewController.getBookDetails);
router.get('/:book_id/related', bookPreviewController.getRelatedBooks);
router.post('/:book_id/wishlist', bookPreviewController.addToWhishlist);
router.delete('/:book_id/wishlist', bookPreviewController.removeFromWhishlist);

router.get('/:book_id/comments', bookPreviewController.getComments);
router.post('/:book_id/comments', bookPreviewController.postComment);
router.post('/:book_id/comments/:parent_comment_id/replies', bookPreviewController.replyComment);
router.put('/:book_id/comments/:comment_id', bookPreviewController.editComment);
router.delete('/:book_id/comments/:comment_id', bookPreviewController.deleteComment);


module.exports = router;