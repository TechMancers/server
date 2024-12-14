const { BookOrders } = require('../../../models/Admin/order-manage.model');
jest.mock('../../../models/Admin/order-manage.model', () => ({
  BookOrders: {
    getOrders: jest.fn(),
  },
}));

const { getOrders } = require('../../../controllers/Admin/order-manage.controller');

// Helper function to create mock response objects
const createMockResponse = () => ({
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
});

describe('getOrders Controller Tests', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  describe('Positive Tests', () => {
    it('should return a list of purchase orders with status 200', async () => {
      // Arrange
      const mockOrders = [
        {
          purchase_id: 1,
          user_id: '1',
          description: null,
          pNumber: '1234567890',
          paymentMethod: 'Credit Card',
          address: '123 Main Street, Springfield',
          purchase_datetime: '2024-11-22T11:16:58.000Z',
        },
        {
          purchase_id: 2,
          user_id: '1',
          description: null,
          pNumber: '1234567890',
          paymentMethod: 'Credit Card',
          address: '123 Main Street, Springfield',
          purchase_datetime: '2024-11-22T11:18:38.000Z',
        },
      ];
      BookOrders.getOrders.mockResolvedValue(mockOrders);

      const req = {};
      const res = createMockResponse();

      // Act
      await getOrders(req, res);

      // Assert
      expect(BookOrders.getOrders).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockOrders);
    });
  });

  describe('Negative Tests', () => {
    it('should return status 500 with an error message when database fails', async () => {
      // Arrange
      const mockError = new Error('Database connection failed');
      BookOrders.getOrders.mockRejectedValue(mockError);

      const req = {};
      const res = createMockResponse();

      // Act
      await getOrders(req, res);

      // Assert
      expect(BookOrders.getOrders).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Database connection failed' });
    });
  });

  describe('Edge Case Tests', () => {
    it('should return an empty array with status 200 if no orders exist', async () => {
      // Arrange
      BookOrders.getOrders.mockResolvedValue([]); // No orders in the database

      const req = {};
      const res = createMockResponse();

      // Act
      await getOrders(req, res);

      // Assert
      expect(BookOrders.getOrders).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([]);
    });
  });
});
