// Tests/Customer/EditProfileController.test.js
const EditProfileController = require('../../../controllers/Customer/edit-profile.controller');
const { EditProfile } = require('../../../models/Customer/edit-profile.model');

jest.mock('../../../models/Customer/edit-profile.model', () => ({
  EditProfile: {
    update: jest.fn(),
  },
}));

jest.spyOn(console, 'error').mockImplementation(() => {}); // Silence error logs

describe('EditProfileController', () => {
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

  describe('updateProfile', () => {
    it('should update the profile and return a success message', async () => {
      req.params.userId = 1;
      req.body = {
        firstName: 'John',
        lastName: 'Doe',
        address: '123 Art Street',
        phone: '555-1234',
      };

      EditProfile.update.mockResolvedValue();

      await EditProfileController.updateProfile(req, res, next);

      expect(EditProfile.update).toHaveBeenCalledWith(
        req.params.userId,
        req.body.firstName,
        req.body.lastName,
        req.body.address,
        req.body.phone
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Profile updated successfully!' });
      expect(next).not.toHaveBeenCalled();
    });

    it('should handle errors and call next with an error', async () => {
      const error = new Error('Database error');
      req.params.userId = 1;
      req.body = {
        firstName: 'John',
        lastName: 'Doe',
        address: '123 Art Street',
        phone: '555-1234',
      };

      EditProfile.update.mockRejectedValue(error);

      await EditProfileController.updateProfile(req, res, next);

      expect(EditProfile.update).toHaveBeenCalledWith(
        req.params.userId,
        req.body.firstName,
        req.body.lastName,
        req.body.address,
        req.body.phone
      );
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
