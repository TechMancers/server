// Tests/Customer/categoryController.test.js
const categoryController = require('../../../controllers/Customer/category.controller.js');
const db = require('../../../utils/database');

// Mock the database execution method
jest.mock('../../../utils/database', () => ({
  execute: jest.fn(),
}));

jest.spyOn(console, 'error').mockImplementation(() => {}); // Silence error logs

describe('Category Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  describe('getcategories', () => {
    it('should return categories with status 200', async () => {
      const mockCategories = [
        { category_id: 1, name: 'Fiction' },
        { category_id: 2, name: 'Science Fiction' },
        { category_id: 3, name: 'Biography' },
        { category_id: 4, name: 'History' },
        { category_id: 5, name: 'new 1' },
        { category_id: 6, name: 'new 2' },
        { category_id: 7, name: 'new 3' },
      ];

      // Mock the database execute method to return mock categories
      db.execute.mockResolvedValue([mockCategories]);

      await categoryController.getcategories(req, res, next);

      expect(db.execute).toHaveBeenCalledWith(expect.any(String)); // Ensure query is executed
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockCategories);
    });

    it('should handle errors and call next with an error', async () => {
      const error = new Error('Database error');
      db.execute.mockRejectedValue(error);

      await categoryController.getcategories(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
