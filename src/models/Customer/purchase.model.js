//const db = require('../../utils/database');

const db = require('../../utils/database')

class Purchase {
    static async createPurchase(user_id, phoneNumber, address, paymentMethod) {
        // Insert purchase into the database
        const [result] = await db.execute(
            'INSERT INTO purchase_history (user_id, pNumber, address, paymentMethod, purchase_datetime) VALUES (?, ?, ?, ?, NOW())',
            [user_id, phoneNumber, address, paymentMethod]
        );
        return result.insertId; // Return the purchase ID
    }

    static async addCartItems(purchase_id, cartItems) {
        const cartItemPromises = cartItems.map(cartItem =>
            db.execute(
                'INSERT INTO cart_item (purchase_id, book_id, quantity) VALUES (?, ?, ?)',
                [purchase_id, cartItem.book_id, cartItem.quantity]
            )
        );
        await Promise.all(cartItemPromises); // Wait for all insertions to complete
    }

    static async getUserDetails(user_id) {
        const [userData] = await db.execute('SELECT * FROM users WHERE user_id = ?', [user_id]);
        return userData[0];
    }

    static async getOrderDetails(purchase_id) {
        const [orderDetails] = await db.execute(`
            SELECT ai.book_id, a.name, a.author AS author_name, 
                   a.price, ai.quantity, (a.price * ai.quantity) AS total_price
            FROM cart_item ai
            JOIN book a ON ai.book_id = a.book_id
            
            WHERE ai.purchase_id = ?
        `, [purchase_id]);
        return orderDetails;
    }
}

module.exports = Purchase;
