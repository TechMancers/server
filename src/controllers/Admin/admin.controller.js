const { admin } = require("../../models/Admin/admin.model");
const ErrorFactory = require("../../utils/ErrorFactory");

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
      const error = ErrorFactory.createError("NotFoundError", "Admin not found");
      res.status(error.statusCode).json(error.format());
    }
  } catch (error) {
    console.error("Error fetching admin details:", error);
    const internalError = ErrorFactory.createError(
      "InternalServerError",
      "An error occurred while retrieving admin details"
    );
    res.status(internalError.statusCode).json(internalError.format());
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
      const error = ErrorFactory.createError("ValidationError", result.message);
      res.status(error.statusCode).json(error.format());
    }
  } catch (error) {
    console.error("Error updating admin details:", error);
    const internalError = ErrorFactory.createError(
      "InternalServerError",
      "An error occurred while updating admin details"
    );
    res.status(internalError.statusCode).json(internalError.format());
  }
};

exports.updateAdminPassword = async (req, res) => {
  const { password } = req.body;
  const { adminId } = req.params;

  try {
    const currentPasswordData = await admin.getAdminPassword(adminId);

    if (!currentPasswordData) {
      const error = ErrorFactory.createError("NotFoundError", "Admin not found");
      return res.status(error.statusCode).json(error.format());
    }

    const currentPasswordHash = currentPasswordData.password_hash;
    const isSamePassword = await bcrypt.compare(password, currentPasswordHash);

    if (isSamePassword) {
      const error = ErrorFactory.createError(
        "ValidationError",
        "New password cannot be the same as the old password."
      );
      return res.status(error.statusCode).json(error.format());
    }

    if (!schema.validate(password)) {
      const error = ErrorFactory.createError(
        "ValidationError",
        "Password does not meet security requirements. It must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, one digit, and one special character."
      );
      return res.status(error.statusCode).json(error.format());
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
      const error = ErrorFactory.createError("ValidationError", result.message);
      res.status(error.statusCode).json(error.format());
    }
  } catch (error) {
    console.error("Error updating admin password:", error);
    const internalError = ErrorFactory.createError(
      "InternalServerError",
      "An error occurred while updating the password."
    );
    res.status(internalError.statusCode).json(internalError.format());
  }
};
 