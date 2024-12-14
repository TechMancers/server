const db = require("../../utils/database");

class EditProfile {
  static update(
    userId,
    firstName,
    lastName,
    address,
    phone
  ) {
    return db.execute(
      `
            UPDATE 
                users 
            SET 
                FName = ?,
                LName = ?,
                address = ?,
                phone = ?
            WHERE 
                user_id = ?
            `,
      [firstName, lastName, address, phone, userId]
    );
  }

  static updateWithoutPassword(
    userId,
    firstName,
    lastName,
    email,
    address,
    phone
  ) {
    return db.execute(
      `
            UPDATE 
                users 
            SET 
                FName = ?,
                LName = ?,
                email = ?,
                address = ?,
                phone = ?
            WHERE 
                user_id = ?
            `,
      [firstName, lastName, email, address, phone, userId]
    );
  }
}

module.exports = { EditProfile };
