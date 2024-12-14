// Tests/Customer/ProfilePageController.test.js
const ProfilePageController = require('../../../controllers/Customer/profile-page.controller.js');

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
    it('should return the first customer with status 200', async () => {
      const mockCustomers = [{ id: 1, name: 'John Doe' }];
      const ProfilePageModel = require('../../../models/Customer/profile-page.model.js');
      ProfilePageModel.fetchAll.mockResolvedValue(mockCustomers);

      await ProfilePageController.getAllCustomers(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockCustomers[0]);
    });

    it('should handle errors and call next with an error', async () => {
      const error = new Error('Database error');
      const ProfilePageModel = require('../../../models/Customer/profile-page.model.js');
      ProfilePageModel.fetchAll.mockRejectedValue(error);

      await ProfilePageController.getAllCustomers(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('deactivateCustomer', () => {
    it('should deactivate a user and return success message', async () => {
      req.params.id = 1;
      const ProfilePageModel = require('../../../models/Customer/profile-page.model.js');
      ProfilePageModel.deactivateUser.mockResolvedValue(true);

      await ProfilePageController.deactivateCustomer(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'User deactivated successfully' });
    });

    it('should handle errors and call next with an error', async () => {
      const error = new Error('Deactivation error');
      req.params.id = 1;
      const ProfilePageModel = require('../../../models/Customer/profile-page.model.js');
      ProfilePageModel.deactivateUser.mockRejectedValue(error);

      await ProfilePageController.deactivateCustomer(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
