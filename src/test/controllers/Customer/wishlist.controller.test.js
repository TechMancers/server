// Tests/Customer/WishListController.test.js
const WishListController = require('../../../controllers/Customer/wishlist.controller');
const CustomerWishList = require('../../../models/Customer/wishlist.model');

jest.mock('../../../models/Customer/wishlist.model', () => ({
  fetchWishList: jest.fn(),
}));

jest.spyOn(console, 'error').mockImplementation(() => {}); // Silence error logs

describe('WishListController', () => {
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

  describe('getCustomerWishList', () => {
    it('should return the first wishlist item with status 200', async () => {
      req.params.userId = 1;

      const mockWishList = [
        {
          customer_id: "1",
          book_id: "1",
          book_name: "The Great Gatsby",
          book_author: "F. Scott Fitzgerald",
          book_price: "10.99",
          book_description: "A classic novel set in the Jazz Age.",
          available_stock: 50,
          category_name: "Fiction",
        },
      ];

      CustomerWishList.fetchWishList.mockResolvedValue(mockWishList);

      await WishListController.getCustomerWishList(req, res, next);

      expect(CustomerWishList.fetchWishList).toHaveBeenCalledWith(req.params.userId);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockWishList[0]);
      expect(next).not.toHaveBeenCalled();
    });

    it('should handle errors and call next with an error', async () => {
      const error = new Error('Database error');
      CustomerWishList.fetchWishList.mockRejectedValue(error);

      await WishListController.getCustomerWishList(req, res, next);

      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
