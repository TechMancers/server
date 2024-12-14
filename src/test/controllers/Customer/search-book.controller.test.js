// Tests/Customer/searchBookController.test.js
const searchBookController = require('../../../controllers/Customer/search-book.controller');
const searchBookModel = require('../../../models/Customer/search-book.model');

jest.mock('../../../models/Customer/search-book.model', () => ({
  searchBooks: jest.fn(),
  getCategories: jest.fn(),
  getBooksByCategoryId: jest.fn(),
}));

jest.spyOn(console, 'error').mockImplementation(() => {}); // Silence error logs

describe('searchBookController', () => {
  let req, res, next;

  beforeEach(() => {
    req = { query: {}, params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  describe('searchBooks', () => {
    it('should return books based on search term and categories', async () => {
      req.query.searchTerm = 'The Great Gatsby';
      req.query.categories = 'Fiction,Science Fiction';
      
      const mockBooks = [
        {
          book_id: '1',
          book_name: 'The Great Gatsby',
          author_name: 'F. Scott Fitzgerald',
          book_price: '10.99',
          book_description: 'A classic novel set in the Jazz Age.',
          book_stock: 50,
          category_name: 'Fiction',
          category_id: 1,
        },
        {
          book_id: '2',
          book_name: 'Updated Book Name',
          author_name: 'Updated Author',
          book_price: '25.99',
          book_description: 'Updated description of the book.',
          book_stock: 30,
          category_name: 'Science Fiction',
          category_id: 2,
        },
      ];
      
      searchBookModel.searchBooks.mockResolvedValue(mockBooks);

      await searchBookController.searchBooks(req, res);

      expect(searchBookModel.searchBooks).toHaveBeenCalledWith('The Great Gatsby', ['Fiction', 'Science Fiction']);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockBooks);
    });

    it('should return books based on search term without categories', async () => {
      req.query.searchTerm = 'The Catcher in the Rye';
      
      const mockBooks = [
        {
          book_id: 'Bo-0001',
          book_name: 'The Catcher in the Rye',
          author_name: 'J.D. Salinger',
          book_price: '9.99',
          book_description: 'A novel about a young man’s journey through confusion, disillusionment, and rebellion.',
          book_stock: 20,
          category_name: 'Fiction',
          category_id: 1,
        },
      ];
      
      searchBookModel.searchBooks.mockResolvedValue(mockBooks);

      await searchBookController.searchBooks(req, res);

      expect(searchBookModel.searchBooks).toHaveBeenCalledWith('The Catcher in the Rye', []);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockBooks);
    });

    it('should handle errors and return status 500', async () => {
      const error = new Error('Database error');
      req.query.searchTerm = 'The Great Gatsby';
      searchBookModel.searchBooks.mockRejectedValue(error);

      await searchBookController.searchBooks(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error searching books' });
    });
  });

  describe('getCategories', () => {
    it('should return categories', async () => {
      const mockCategories = [
        { category_id: 1, name: 'Fiction' },
        { category_id: 2, name: 'Science Fiction' },
        { category_id: 3, name: 'Biography' },
        { category_id: 4, name: 'History' },
        { category_id: 5, name: 'new 1' },
        { category_id: 6, name: 'new 2' },
        { category_id: 7, name: 'new 3' },
      ];

      searchBookModel.getCategories.mockResolvedValue(mockCategories);

      await searchBookController.getCategories(req, res);

      expect(searchBookModel.getCategories).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockCategories);
    });

    it('should handle errors and return status 500', async () => {
      const error = new Error('Database error');
      searchBookModel.getCategories.mockRejectedValue(error);

      await searchBookController.getCategories(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error fetching categories' });
    });
  });

  describe('getBooksByCategoryId', () => {
    it('should return books by category ID', async () => {
      req.params.categoryId = '1';
      
      const mockBooks = [
        {
          book_id: '1',
          book_name: 'The Great Gatsby',
          author_name: 'F. Scott Fitzgerald',
          book_price: '10.99',
          book_description: 'A classic novel set in the Jazz Age.',
          book_stock: 50,
          category_name: 'Fiction',
          category_id: 1,
        },
        {
          book_id: 'Bo-0001',
          book_name: 'The Catcher in the Rye',
          author_name: 'J.D. Salinger',
          book_price: '9.99',
          book_description: 'A novel about a young man’s journey through confusion, disillusionment, and rebellion.',
          book_stock: 20,
          category_name: 'Fiction',
          category_id: 1,
        },
      ];

      searchBookModel.getBooksByCategoryId.mockResolvedValue(mockBooks);

      await searchBookController.getBooksByCategoryId(req, res);

      expect(searchBookModel.getBooksByCategoryId).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockBooks);
    });

    it('should handle errors and return status 500', async () => {
      const error = new Error('Database error');
      req.params.categoryId = '1';
      searchBookModel.getBooksByCategoryId.mockRejectedValue(error);

      await searchBookController.getBooksByCategoryId(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error fetching books by category' });
    });
  });
});
