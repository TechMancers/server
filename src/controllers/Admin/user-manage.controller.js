const { ManageUsers } = require("../../models/Admin/admin.model");
const ErrorFactory = require("../../utils/ErrorFactory");

exports.fetchUsers = async (req, res) => {
  const { search = "", isActive = null, isBanned = null, isSuspended = null, role = null, page = 1, limit = 10  } = req.query;
  console.log("Query Params in controller:", { search, isActive, role, page, limit });

  try {
    const result = await ManageUsers.fetchUsers(search, isActive, isBanned, isSuspended, role, page, limit);

    if (result.success && result.data.length > 0) {
      res.status(200).json(result);
    } else {
      const error = ErrorFactory.createError(
        "NotFoundError",
        result.message || "No users found"
      )
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    const internalError = ErrorFactory.createError(
      "InternalServerError",
      "An error occurred while retrieving users"
    );
    res.status(internalError.statusCode).json(internalError.format());
  }
};

exports.getUserDetails = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await ManageUsers.getUserById(userId);

    if (result.success) {
      res.status(200).json(result);
    } else {
      const notFoundError = ErrorFactory.createError(
        "NotFoundError",
        result.message || "User not found"
      );
      res.status(notFoundError.statusCode).json(notFoundError.format());
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
    const internalError = ErrorFactory.createError(
      "InternalServerError",
      "An error occurred while retrieving user details"
    );
    res.status(internalError.statusCode).json(internalError.format());
  }
};

exports.getPurchaseHistory = async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    const error = ErrorFactory.createError(
      "ValidationError",
      "User ID is required"
    );
    return res.status(error.statusCode).json(error.format());
  }
  try {
    const purchaseHistory = await ManageUsers.getPurchaseHistory(userId);

    if (!purchaseHistory || purchaseHistory.length === 0) {
      const error = ErrorFactory.createError(
        "NotFoundError",
        "No purchase history found for the given user"
      )
      return res.status(error.statusCode).json(error.format());
    }
    const purchasedItems = await Promise.all(
      purchaseHistory.map(async (purchase) => {
        try {
          const cartItems = await ManageUsers.getCartItems(purchase.purchase_id);
          return {
            ...purchase,
            cartItems: cartItems[0] || [],
          };
        } catch (cartError) {
          console.error("Error fetching cart items:", cartError);
          return { ...purchase, cartItems: [] };
        }
      })
    );

    res.status(200).json({
      success: true,
      data: purchasedItems,
    });

  } catch (error) {
    console.error("Error fetching purchase history:", error);
    const internalError = ErrorFactory.createError(
      "InternalServerError",
      "An error occurred while updating the category."
    )
    res.status(internalError.statusCode).json(internalError.format());
  }
};

exports.updateUserState = async (req, res) => {
  const { userId } = req.params;
  const { isActive, isBanned } = req.body;

  try {
    if (isActive === undefined && isBanned === undefined) {
      return res.status(400).json({
        success: false,
        message: "isActive or isBanned must be specified",
      });
    }

    const result = await ManageUsers.updateUserState(
      userId,
      isActive,
      isBanned
    );

    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (err) {
    console.error("Error updating user state:", err);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating user state",
      error: err.message,
    });
  }
};

exports.suspendUser = async (req, res) => {
  const { userId } = req.params;
  const { isSuspended, suspendReason, suspendBegin, suspendEnd } = req.body;

  try {
    if (suspendBegin && suspendEnd) {
      const start = new Date(suspendBegin);
      const end = new Date(suspendEnd);
      if (end < start) {
        throw new Error("suspendEnd cannot be earlier than suspendBegin");
      }
    }
    const result = await ManageUsers.suspendUser(
      userId,
      isSuspended,
      suspendReason,
      suspendBegin,
      suspendEnd
    );

    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(404).json({
        success: false,
        message: "User not found or no changes made",
      });
    }
  } catch (err) {
    console.error("Error suspending user:", err);
    res.status(500).json({
      success: false,
      message: "An error occurred while suspending the user",
      error: err.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await ManageUsers.deleteUser(userId);

    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the user",
      error: err.message,
    });
  }
};