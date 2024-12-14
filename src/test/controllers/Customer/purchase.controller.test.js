// Tests/Customer/PurchaseController.test.js
const PurchaseController = require('../../../controllers/Customer/purchase.controller.js');
const Purchase = require('../../../models/Customer/purchase.model.js');

jest.mock('../../../models/Customer/purchase.model.js', () => ({
  createPurchase: jest.fn(),
  addCartItems: jest.fn(),
  getUserDetails: jest.fn(),
  getOrderDetails: jest.fn(),
}));

jest.spyOn(console, 'error').mockImplementation(() => {}); // Silence error logs

describe('PurchaseController', () => {
  let req, res, next;

  beforeEach(() => {
    req = { params: {}, body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  describe('createPurchase', () => {
    it('should create a purchase, add cart items, and respond with success', async () => {
      req.params.user_id = 1;
      req.body = {
        phoneNumber: '555-1234',
        location: '123 Main St',
        paymentMethod: 'Credit Card',
        cartItems: [{ product_id: 101, quantity: 2 }],
      };

      const mockPurchaseId = 123;
      const mockUser = {
        user_id: '1',
        email: 'john.doe@example.com',
        FName: 'John',
        LName: 'Doe',
        phone: '555-1234',
      };
      const mockOrderDetails = [
        { total_price: '50.00' },
        { total_price: '30.00' },
      ];

      Purchase.createPurchase.mockResolvedValue(mockPurchaseId);
      Purchase.addCartItems.mockResolvedValue();
      Purchase.getUserDetails.mockResolvedValue(mockUser);
      Purchase.getOrderDetails.mockResolvedValue(mockOrderDetails);

      await PurchaseController.createPurchase(req, res, next);

      expect(Purchase.createPurchase).toHaveBeenCalledWith(
        req.params.user_id,
        req.body.phoneNumber,
        req.body.location,
        req.body.paymentMethod
      );
      expect(Purchase.addCartItems).toHaveBeenCalledWith(mockPurchaseId, req.body.cartItems);
      expect(Purchase.getUserDetails).toHaveBeenCalledWith(req.params.user_id);
      expect(Purchase.getOrderDetails).toHaveBeenCalledWith(mockPurchaseId);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Purchase created successfully',
        purchase_id: mockPurchaseId,
        orderDetails: mockOrderDetails,
        totalPurchasePrice: 80.0, // Sum of total prices
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('should handle errors and call next with an error', async () => {
      const error = new Error('Database error');
      Purchase.createPurchase.mockRejectedValue(error);

      await PurchaseController.createPurchase(req, res, next);

      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('getUserDetails', () => {
    it('should return user details with status 200', async () => {
      req.params.user_id = 1;
      const mockUser = {
        user_id: '1',
        email: 'john.doe@example.com',
        FName: 'John',
        LName: 'Doe',
        registered_at: '2024-11-21T18:30:00.000Z',
        address: '123 Art Street',
        role: 'customer',
        phone: '555-1234',
      };

      Purchase.getUserDetails.mockResolvedValue(mockUser);

      await PurchaseController.getUserDetails(req, res, next);

      expect(Purchase.getUserDetails).toHaveBeenCalledWith(req.params.user_id);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ user: mockUser });
      expect(next).not.toHaveBeenCalled();
    });

    it('should respond with 404 if user is not found', async () => {
      req.params.user_id = 1;
      Purchase.getUserDetails.mockResolvedValue(null);

      await PurchaseController.getUserDetails(req, res, next);

      expect(Purchase.getUserDetails).toHaveBeenCalledWith(req.params.user_id);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
      expect(next).not.toHaveBeenCalled();
    });

    it('should handle errors and call next with an error', async () => {
      const error = new Error('Database error');
      Purchase.getUserDetails.mockRejectedValue(error);

      await PurchaseController.getUserDetails(req, res, next);

      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
