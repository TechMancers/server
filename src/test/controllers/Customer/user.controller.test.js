const request = require('supertest');
const app = require('../../../../server'); // Adjust the path to your app entry point
const userModel = require('../../../models/userModel.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

jest.mock('../../../models/userModel.js');
jest.mock('jsonwebtoken');
jest.mock('bcryptjs');

describe('User Controller', () => {
  describe('Signup', () => {
    it('should successfully register a user', async () => {
      const user = {
        user_id: 'Cu-00001',
        email: 'Beaulah72@example.com',
        password: 'Password1!',
        role: 'customer',
        
      };
      userModel.generateNewUserId.mockResolvedValue('Cu-00001');
      userModel.checkExistingEmail.mockResolvedValue([[false]]);
      userModel.createUser.mockResolvedValue([[user]]);
      // userModel.verificationEmail.mockResolvedValue([[]]);

      const response = await request(app)
        .post('/signup')
        .send({
          user: {
            email: 'Beaulah72@example.com',
            password: '',
            role: 'customer',
          },
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Successfully Registered');
    });

    it('should return an error if email already exists', async () => {
      userModel.checkExistingEmail.mockResolvedValue([[{ email: 'test@example.com' }]]);

      const response = await request(app)
        .post('/signup')
        .send({
          user: {
            email: 'test@example.com',
            password: 'Password1!',
            role: 'customer',
          },
        });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Email Already Exists.');
    });

    it('should return an error if the password is invalid', async () => {
      userModel.checkExistingEmail.mockReturnValue(true);
      const response = await request(app)
        .post('/signup')
        .send({
          user: {
            email: 'test@example.com',
            password: 'wesword',
            role: 'customer',
          },
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        "Password must at least contain 8 characters, uppercase letters, lowercase letters, digits, and special characters!"
      );
    });
  });

  describe('Login', () => {
    it('should successfully login a user', async () => {
      userModel.loginUser.mockResolvedValue([[{ email: 'test@example.com', password_hash: 'hashedPassword', role: 'customer' }]]);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('fakeAccessToken');

      const response = await request(app)
        .post('/login')
        .send({
          email: 'test@example.com',
          password: 'Password1!',
        });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Successful Login');
      expect(response.body.accessToken).toBe('fakeAccessToken');
    });

    it('should return an error for invalid credentials', async () => {
      userModel.loginUser.mockResolvedValue([[]]);

      const response = await request(app)
        .post('/login')
        .send({
          email: 'wrong@example.com',
          password: 'Password1!',
        });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Invalid Credentials');
    });
  });

  describe('Forgot Password', () => {
    it('should send a forgot password email', async () => {
      userModel.checkExistingEmail.mockResolvedValue([[{ email: 'test@example.com' }]]);
      userModel.sendForgotPasswordEmail.mockResolvedValue(false);
      jwt.sign.mockReturnValue('fakeToken');

      const response = await request(app)
        .post('/forgot-password')
        .send({
          email: 'test@example.com',
        });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Forgot Password email send');
    });

    it('should return an error if the user is not found', async () => {
      userModel.checkExistingEmail.mockResolvedValue([[]]);

      const response = await request(app)
        .post('/forgot-password')
        .send({
          email: 'nonexistent@example.com',
        });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('User not found.');
    });
  });

  describe('Reset Password', () => {
    it('should reset the password', async () => {
      userModel.checkEmail.mockResolvedValue({ email: 'test@example.com' });
      userModel.updatePassword.mockResolvedValue({ affectedRows: 1 });
      bcrypt.hash.mockResolvedValue('newHashedPassword');

      const response = await request(app)
        .post('/reset-password')
        .send({
          email: 'test@example.com',
          password: 'NewPassword1!',
          confirmPassword: 'NewPassword1!',
        });

      expect(response.status).toBe(200);
      expect(response.body.msg).toBe('Password updated successfully');
    });

    it('should return an error if passwords do not match', async () => {
      const response = await request(app)
        .post('/reset-password')
        .send({
          email: 'test@example.com',
          password: 'NewPassword1!',
          confirmPassword: 'MismatchPassword!',
        });

      expect(response.status).toBe(400);
      expect(response.body.msg).toBe('Passwords do not match');
    });
  });

  // describe('Change Password', () => {
  //   it('should change the password', async () => {
  //     userModel.getUserByEmail.mockResolvedValue([[{ password_hash: 'oldHashedPassword' }]]);
  //     bcrypt.compare.mockResolvedValue(true);
  //     bcrypt.hash.mockResolvedValue('newHashedPassword');
  //     userModel.updateUserPassword.mockResolvedValue();

  //     const response = await request(app)
  //       .post('/change-password')
  //       .send({
  //         email: 'test@example.com',
  //         oldPassword: 'OldPassword1!',
  //         newPassword: 'NewPassword1!',
  //         confirmPassword: 'NewPassword1!',
  //       });

  //     expect(response.status).toBe(200);
  //     expect(response.body.message).toBe('Password changed successfully');
  //   });

    // it('should return an error for invalid old password', async () => {
    //   userModel.getUserByEmail.mockResolvedValue([[{ password_hash: 'oldHashedPassword' }]]);
    //   bcrypt.compare.mockResolvedValue(false);

    //   const response = await request(app)
    //     .post('/change-password')
    //     .send({
    //       email: 'test@example.com',
    //       oldPassword: 'WrongPassword!',
    //       newPassword: 'NewPassword1!',
    //       confirmPassword: 'NewPassword1!',
    //     });

    //   expect(response.status).toBe(400);
    //   expect(response.body.message).toBe('Invalid old password');
    // });
//   });
});
