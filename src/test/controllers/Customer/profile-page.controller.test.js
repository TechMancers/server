// Tests/Customer/ProfilePageController.test.js
const ProfilePageController = require('../../../controllers/Customer/profile-page.controller.js');
const ProfilePageModel = require('../../../models/Customer/profile-page.model.js');

jest.mock('../../../models/Customer/profile-page.model.js', () => ({
  fetchAll: jest.fn(),
  deactivateUser: jest.fn(),
}));

jest.spyOn(console, 'error').mockImplementation(() => {}); // Silence error logs

describe('ProfilePageController', () => {
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

  describe('getAllCustomers', () => {
    const mockCustomer = {
      fName: 'John',
      LName: 'Doe',
      address: '123 Art Street',
      joined_date: '2024-11-21T18:30:00.000Z',
      total_wishlist_items: 1,
      total_purchases: 17,
      email: 'john.doe@example.com',
      phone: '555-1234',
    };

    it('should return the first customer with status 200', async () => {
      ProfilePageModel.fetchAll.mockResolvedValue([mockCustomer]);

      await ProfilePageController.getAllCustomers(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockCustomer); // First customer
      expect(next).not.toHaveBeenCalled();
    });

    it('should handle errors and call next with an error', async () => {
      const error = new Error('Database error');
      ProfilePageModel.fetchAll.mockRejectedValue(error);

      await ProfilePageController.getAllCustomers(req, res, next);

      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('deactivateCustomer', () => {
    beforeEach(() => {
      req.params.id = 1;
    });

    it('should deactivate a user and return success message', async () => {
      ProfilePageModel.deactivateUser.mockResolvedValue(true);

      await ProfilePageController.deactivateCustomer(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'User deactivated successfully' });
      expect(next).not.toHaveBeenCalled();
    });

    it('should handle errors and call next with an error', async () => {
      const error = new Error('Deactivation error');
      ProfilePageModel.deactivateUser.mockRejectedValue(error);

      await ProfilePageController.deactivateCustomer(req, res, next);

      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
