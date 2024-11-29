const { ManageUsers } = require("../../models/Admin/user-manage.model");

exports.fetchUsers = async (req, res) => {
  const { search = "", isActive = null, isBanned = null, isSuspended = null, role = null, page = 1, limit = 10  } = req.query;
  console.log("Query Params in controller:", { search, isActive, role, page, limit });

  try {
    const result = await ManageUsers.fetchUsers(search, isActive, isBanned, isSuspended, role, page, limit);

    if (result.success && result.data.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({
        success: false,
        message: "No users found for the given criteria",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving users",
      error: error.message,
    });
  }
};

exports.getUserDetails = async (req, res) => {
  const { userId } = req.params; 

  try {
    const result = await ManageUsers.getUserById(userId);

    if (result.success) {
      res.status(200).json(result); 
    } else {
      res.status(404).json({
        success: false,
        message: result.message,
      });
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving user details",
      error: error.message,
    });
  }
};

exports.getPurchaseHistory = async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "User ID is required",
    });
  }
  try {
    const purchaseHistory = await ManageUsers.getPurchaseHistory(userId);

    if (!purchaseHistory || purchaseHistory.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No purchase history found for the given user",
      });
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

    res.status(500).json({
      success: false,
      message: "An unexpected error occurred while retrieving purchase history",
      error: error.message,
    });
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