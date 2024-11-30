const PurchaseHistory = require("../../models/Customer/purchasehistory.model");

// Fetch purchase history for a user
exports.getPurchaseHistory = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const purchaseHistory = await PurchaseHistory.getPurchaseHistory(userId);

    const purchasedItems = await Promise.all(
      purchaseHistory.map(async (purchase) => {
        const cartItems = await PurchaseHistory.getCartItems(purchase.purchase_id);
        return {
          ...purchase,
          cartItems: cartItems,
        };
      })
    );

    res.status(200).json(purchasedItems);
  } catch (error) {
    console.error("Error fetching purchase history:", error);
    next(error);
  }
};

// Delete a purchase and its associated cart items
exports.deletePurchase = async (req, res, next) => {
  const purchaseId = req.params.purchaseId;
  try {
    if (purchaseId) {
      await PurchaseHistory.deletePurchaseItems(purchaseId);
      await PurchaseHistory.deletePurchase(purchaseId);

      res.status(200).json({ message: "Purchase deleted successfully" });
    } else {
      throw new Error("Purchase ID is undefined");
    }
  } catch (error) {
    console.error("Error deleting purchase:", error);
    next(error);
  }
};
