const CustomerWishList = require("../../models/Customer/wishlist.model");

exports.getCustomerWishList = async (req, res, next) => {
  const userId = req.params.userId; // Extract the user ID from request parameters
  try {
    const wishlist = await CustomerWishList.fetchWishList(userId); // Call the model to fetch the wishlist
    res.status(200).json(wishlist[0]); // Return the first row of the fetched wishlist data
  } catch (error) {
    console.error("Error fetching customer wishlist:", error); // Log the error for debugging
    next(error); // Pass the error to the next middleware
  }
};
