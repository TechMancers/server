const {
  bookPreview,
  comments,
} = require("../../models/Customer/book-preview.model");
const ErrorFactory = require("../../utils/ErrorFactory");

exports.getBookDetails = async (req, res) => {
  const { book_id } = req.params;

  try {
    const result = await bookPreview.getBookDetails(book_id);

    if (result.length > 0) {
      res.status(200).json({
        success: true,
        data: result[0],
      });
    } else {
      const error = ErrorFactory.createError("NotFoundError", "Book not found");
      res.status(error.statusCode).json(error.format());
    }
  } catch (error) {
    console.error("Error fetching book details:", error);
    const internalError = ErrorFactory.createError(
      "InternalServerError",
      "An error occurred while retrieving book details"
    );
    res.status(internalError.statusCode).json(internalError.format());
  }
};

exports.getRelatedBooks = async (req, res) => {
  const { book_id } = req.params;

  try {
    const result = await bookPreview.getRelatedBooks(book_id);

    if (result.length > 0) {
      res.status(200).json({
        success: true,
        data: result,
      });
    } else {
      const error = ErrorFactory.createError(
        "NotFoundError",
        "No related books found"
      );
      res.status(error.statusCode).json(error.format());
    }
  } catch (error) {
    console.error("Error fetching related books:", error);
    const internalError = ErrorFactory.createError(
      "InternalServerError",
      "An error occurred while retrieving related books"
    );
    res.status(internalError.statusCode).json(internalError.format());
  }
};

exports.addToWhishlist = async (req, res) => {
  const { book_id } = req.params;
  const { user_id } = req.query;

  try {
    const result = await bookPreview.addToWhishlist(book_id, user_id);

    if (result.affectedRows > 0) {
      res.status(200).json({
        success: true,
        message: "Book added to wishlist",
      });
    } else {
      const error = ErrorFactory.createError(
        "BadRequestError",
        "Book already in wishlist"
      );
      res.status(error.statusCode).json(error.format());
    }
  } catch (error) {
    console.error("Error adding book to wishlist:", error);
    const internalError = ErrorFactory.createError(
      "InternalServerError",
      "An error occurred while adding book to wishlist"
    );
    res.status(internalError.statusCode).json(internalError.format());
  }
};

exports.removeFromWhishlist = async (req, res) => {
  const { book_id } = req.params;
  const { user_id } = req.query;

  try {
    const result = await bookPreview.removeFromWhishlist(book_id, user_id);

    if (result.affectedRows > 0) {
      res.status(200).json({
        success: true,
        message: "Book removed from wishlist",
      });
    } else {
      const error = ErrorFactory.createError(
        "BadRequestError",
        "Book not in wishlist"
      );
      res.status(error.statusCode).json(error.format());
    }
  } catch (error) {
    console.error("Error removing book from wishlist:", error);
    const internalError = ErrorFactory.createError(
      "InternalServerError",
      "An error occurred while removing book from wishlist"
    );
    res.status(internalError.statusCode).json(internalError.format());
  }
};

exports.getComments = async (req, res) => {
  const { book_id } = req.params;

  try {
    const result = await comments.getComments(book_id);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    const internalError = ErrorFactory.createError(
      "InternalServerError",
      "An error occurred while fetching comments"
    );
    res.status(internalError.statusCode).json(internalError.format());
  }
};

exports.postComment = async (req, res) => {
  const { book_id } = req.params;
  const { user_id } = req.body;
  const { content } = req.body;

  try {
    const result = await comments.insertComment(book_id, user_id, content);
    console.log(result);
    const commentId = result.comment_id;
    const comment = await comments.getCommentById(commentId);
    res.status(200).json({
      success: true,
      data: comment,
    });
  } catch (error) {
    console.error("Error posting comment:", error);
    const internalError = ErrorFactory.createError(
      "InternalServerError",
      "An error occurred while posting comment"
    );
    res.status(internalError.statusCode).json(internalError.format());
  }
};

exports.replyComment = async (req, res) => {
  const { book_id, parent_comment_id } = req.params;
  const { user_id, content } = req.body;

  try {
    const reply = await comments.insertReply(
      book_id,
      user_id,
      content,
      parent_comment_id
    );
    const replyId = reply.comment_id;
    const comment = await comments.getCommentById(replyId);
    res.status(200).json({
      success: true,
      data: comment,
    });
  } catch (error) {
    console.error("Error replying to comment:", error);
    const internalError = ErrorFactory.createError(
      "InternalServerError",
      "An error occurred while replying to comment"
    );
    res.status(internalError.statusCode).json(internalError.format());
  }
};

exports.editComment = async (req, res) => {
  const { comment_id } = req.params;
  const { content } = req.body;
  try {
    const updatedComment = await comments.updateComment(comment_id, content);
    const updatedCommentId = updatedComment.comment_id;
    const comment = await comments.getCommentById(updatedCommentId);
    res.status(200).json({
      success: true,
      data: comment,
    });
  } catch (error) {
    console.error("Error updating comment:", error);
    const internalError = ErrorFactory.createError(
      "InternalServerError",
      "An error occurred while updating comment"
    );
    res.status(internalError.statusCode).json(internalError.format());
  }
};

exports.deleteComment = async (req, res) => {
  const { comment_id } = req.params;
  try {
    await comments.deleteComment(comment_id);
    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting comment:", error);
    const internalError = ErrorFactory.createError(
      "InternalServerError",
      "An error occurred while deleting comment"
    );
    res.status(internalError.statusCode).json(internalError.format());
  }
};
