// Tests/Customer/PurchaseHistoryController.test.js
const PurchaseHistoryController = require('../../../controllers/Customer/purchasehistory.controller');
const PurchaseHistory = require('../../../models/Customer/purchasehistory.model');

jest.mock('../../../models/Customer/purchasehistory.model', () => ({
  getPurchaseHistory: jest.fn(),
  getCartItems: jest.fn(),
  deletePurchaseItems: jest.fn(),
  deletePurchase: jest.fn(),
}));

jest.spyOn(console, 'error').mockImplementation(() => {}); // Silence error logs

describe('PurchaseHistoryController', () => {
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

  describe('getPurchaseHistory', () => {
    it('should return purchase history with cart items', async () => {
      req.params.userId = 1;

      const mockPurchaseHistory = [
        { purchase_id: 101, date: '2024-12-01', total_price: '100.00' },
        { purchase_id: 102, date: '2024-12-02', total_price: '200.00' },
      ];

      const mockCartItems = [
        { product_id: 1, quantity: 2, price: '50.00' },
        { product_id: 2, quantity: 1, price: '100.00' },
      ];

      PurchaseHistory.getPurchaseHistory.mockResolvedValue(mockPurchaseHistory);
      PurchaseHistory.getCartItems.mockResolvedValue(mockCartItems);

      await PurchaseHistoryController.getPurchaseHistory(req, res, next);

      expect(PurchaseHistory.getPurchaseHistory).toHaveBeenCalledWith(req.params.userId);
      expect(PurchaseHistory.getCartItems).toHaveBeenCalledTimes(mockPurchaseHistory.length);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        {
          ...mockPurchaseHistory[0],
          cartItems: mockCartItems,
        },
        {
          ...mockPurchaseHistory[1],
          cartItems: mockCartItems,
        },
      ]);
      expect(next).not.toHaveBeenCalled();
    });

    it('should handle errors and call next with an error', async () => {
      const error = new Error('Database error');
      PurchaseHistory.getPurchaseHistory.mockRejectedValue(error);

      await PurchaseHistoryController.getPurchaseHistory(req, res, next);

      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('deletePurchase', () => {
    it('should delete a purchase and its associated cart items', async () => {
      req.params.purchaseId = 101;

      PurchaseHistory.deletePurchaseItems.mockResolvedValue();
      PurchaseHistory.deletePurchase.mockResolvedValue();

      await PurchaseHistoryController.deletePurchase(req, res, next);

      expect(PurchaseHistory.deletePurchaseItems).toHaveBeenCalledWith(req.params.purchaseId);
      expect(PurchaseHistory.deletePurchase).toHaveBeenCalledWith(req.params.purchaseId);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Purchase deleted successfully' });
      expect(next).not.toHaveBeenCalled();
    });

    it('should throw an error if purchaseId is undefined', async () => {
      req.params.purchaseId = undefined;

      await PurchaseHistoryController.deletePurchase(req, res, next);

      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });

    it('should handle errors and call next with an error', async () => {
      req.params.purchaseId = 101;
      const error = new Error('Database error');

      PurchaseHistory.deletePurchaseItems.mockRejectedValue(error);

      await PurchaseHistoryController.deletePurchase(req, res, next);

      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
