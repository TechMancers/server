const { EditProfile } = require('../../models/Customer/edit-profile.model');

exports.updateProfile = async (req, res, next) => {
  const userId = req.params.userId;
  const {firstName, lastName, address, phone } = req.body;
  console.log('Received data:', req.body);
  console.log('Received userId:', userId);

  try {
    
    await EditProfile.update(userId, firstName, lastName, address, phone);
    res.status(200).json({ message: 'Profile updated successfully!' });
  } catch (error) { 
    console.error('Error updating customer profile:', error);
    next(error);
  }
}
