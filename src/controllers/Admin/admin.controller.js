const { admin } = require("../../models/Admin/admin.model");

const passwordValidator = require("password-validator");
const bcrypt = require("bcryptjs");
const schema = new passwordValidator();

schema
  .is()
  .min(8)
  .has()
  .uppercase(1)
  .has()
  .lowercase(1)
  .has()
  .digits(1)
  .has()
  .symbols(1);

exports.getAdminDetails = async (req, res) => {
  const { adminId } = req.params;

  try {
    const result = await admin.getAdminDetails(adminId);

    if (result.length > 0) {
      res.status(200).json({
        success: true,
        data: result[0],
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }
  } catch (error) {
    console.error("Error fetching admin details:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving admin details",
      error: error.message,
    });
  }
};

exports.updateAdminDetails = async (req, res) => {
  const { FName, LName, email, profile_photo } = req.body;
  const { adminId } = req.params;

  try {
    const result = await admin.updateAdminDetails(
      FName,
      LName,
      email,
      profile_photo,
      adminId
    );

    if (result.success) {
      res.status(200).json({
        success: true,
        message: result.message,
      });
    } else {
      res.status(400).json({
        success: false,
        message: result.message,
      });
    }
  } catch (error) {
    console.error("Error updating admin details:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating admin details",
      error: error.message,
    });
  }
};

exports.updateAdminPassword = async (req, res) => {
  const { password } = req.body;
  const { adminId } = req.params;

  try {
    const currentPasswordData = await admin.getAdminPassword(adminId);
    console.log(currentPasswordData);
    if (!currentPasswordData) {
      return res.status(404).json({
        success: false,
        message: "Admin not found.",
      });
    }
    const currentPasswordHash = currentPasswordData.password_hash;

    const isSamePassword = await bcrypt.compare(password, currentPasswordHash);
    if (isSamePassword) {
      return res.status(400).json({
        success: false,
        message: "New password cannot be the same as the old password.",
      });
    }

    if (!schema.validate(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password does not meet security requirements. It must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, one digit, and one special character.",
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await admin.updateAdminPassword(hashedPassword, adminId);

    if (result.success) {
      res.status(200).json({
        success: true,
        message: "Password updated successfully.",
      });
    } else {
      res.status(400).json({
        success: false,
        message: result.message,
      });
    }
  } catch (error) {
    console.error("Error updating admin password:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the password.",
      error: error.message,
    });
  }
};
