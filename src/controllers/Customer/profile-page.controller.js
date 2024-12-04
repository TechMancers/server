const CustomerProfile = require("../../models/Customer/profile-page.model");


exports.getAllCustomers = async (req, res, next) => {
    const userId = req.params.userId;
    try {
      const customers = await CustomerProfile.fetchAll(userId);
      res.status(200).json(customers[0]);
    } catch (error) {
      console.error("Error fetching customers:", error);
      next(error);
    }
  };
  
  exports.deactivateCustomer = async (req, res, next) => {
    const userId = req.params.userId;
    try {
      await CustomerProfile.deactivateUser(userId);
      res.status(200).json({ message: 'User deactivated successfully' });
    } catch (error) {
      console.error("Error deactivating user:", error);
      next(error);
    }
  };
  