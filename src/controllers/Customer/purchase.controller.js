//const Purchase = require('../Customer/purchase.model');
const Purchase = require('../../models/Customer/purchase.model');

class PurchaseController {
    static async createPurchase(req, res, next) {
        const user_id = req.params.user_id;
        const { phoneNumber, location, paymentMethod, cartItems } = req.body;

        try {
            // Create a new purchase
            const purchase_id = await Purchase.createPurchase(user_id, phoneNumber, location, paymentMethod);

            // Add cart items to the purchase
            await Purchase.addCartItems(purchase_id, cartItems);

            // Get user details
            const user = await Purchase.getUserDetails(user_id);
            const userName = `${user?.fName} ${user?.LName}`;

            // Get order details
            const orderDetails = await Purchase.getOrderDetails(purchase_id);

            // Calculate total purchase price
            const totalPurchasePrice = orderDetails.reduce((sum, item) => sum + parseFloat(item.total_price), 0);

            // Respond with success
            res.status(201).json({
                message: 'Purchase created successfully',
                purchase_id,
                orderDetails,
                totalPurchasePrice,
            });
        } catch (error) {
            console.error('Error creating purchase: ', error);
            next(error);
        }
    }
    static async getUserDetails(req, res, next) {
        const user_id = req.params.user_id;

        try {
            const user = await Purchase.getUserDetails(user_id);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json({ user });
        } catch (error) {
            console.error('Error fetching user details: ', error);
            next(error);
        }
    }

}

module.exports = PurchaseController;
