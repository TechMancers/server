const { BookCategories } = require("../../models/Admin/category-manage.model");
const ErrorFactory = require("../../utils/ErrorFactory");

exports.getCategories = async (req, res) => {
  try {
    const categories = await BookCategories.getCategories();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    const internalError = ErrorFactory.createError(
      "InternalServerError",
      "An error occurred while retrieving categories."
    );
    res.status(internalError.statusCode).json(internalError.format());
  }
};

exports.createCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    const error = ErrorFactory.createError(
      "ValidationError",
      "'name' is required."
    );
    return res.status(error.statusCode).json(error.format());
  }

  try {
    const result = await BookCategories.createCategory(name);

    if (result.success) {
      res.status(201).json(result);
    } else {
      const error = ErrorFactory.createError(
        "ValidationError",
        result.message || "Failed to create category."
      );
      res.status(error.statusCode).json(error.format());
    }
  } catch (error) {
    console.error("Error creating category:", error);
    const internalError = ErrorFactory.createError(
      "InternalServerError",
      "An error occurred while creating the category."
    );
    res.status(internalError.statusCode).json(internalError.format());
  }
};

exports.updateCategory = async (req, res) => {
  const { category_id } = req.params;
  const { name } = req.body;

  if (!category_id || !name) {
    const error = ErrorFactory.createError(
      "ValidationError",
      "Both 'category_id' and 'name' are required."
    );
    return res.status(error.statusCode).json(error.format());
  }

  try {
    const result = await BookCategories.updateCategory(category_id, name);

    if (result.success) {
      res.status(200).json(result);
    } else {
      const error = ErrorFactory.createError(
        "NotFoundError",
        "Category not found or no changes made."
      );
      res.status(error.statusCode).json(error.format());
    }
  } catch (error) {
    console.error("Error updating category:", error);
    const internalError = ErrorFactory.createError(
      "InternalServerError",
      "An error occurred while updating the category."
    );
    res.status(internalError.statusCode).json(internalError.format());
  }
};

exports.deleteCategory = async (req, res) => {
  const { category_id } = req.params;

  if (!category_id) {
    const error = ErrorFactory.createError(
      "ValidationError",
      "'category_id' is required."
    );
    return res.status(error.statusCode).json(error.format());
  }

  try {
    const bookCount = await BookCategories.getBookCount(category_id);

    if (bookCount > 0) {
      const error = ErrorFactory.createError(
        "ValidationError",
        "There are books in this category; it cannot be deleted."
      );
      return res.status(error.statusCode).json(error.format());
    }

    const result = await BookCategories.deleteCategory(category_id);

    if (result.success) {
      res.status(200).json({
        success: true,
        message: result.message,
      });
    } else {
      const error = ErrorFactory.createError(
        "NotFoundError",
        "Category not found."
      );
      res.status(error.statusCode).json(error.format());
    }
  } catch (error) {
    console.error("Error deleting category:", error);
    const internalError = ErrorFactory.createError(
      "InternalServerError",
      "An error occurred while deleting the category."
    );
    res.status(internalError.statusCode).json(internalError.format());
  }
};
