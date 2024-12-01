const db = require("../../utils/database");

class admin{
    static async getAdminDetails(adminId){
        const query = "SELECT * FROM users WHERE user_id = ? AND role = 'admin'";
        const [rows] = await db.execute(query, [adminId]);
        return rows;
    }

    static async updateAdminDetails(FName, LName, email, profile_photo, adminId){
        const query = "UPDATE users SET FName = ?, LName = ?, email = ?, profile_photo = ? WHERE user_id = ? AND role = 'admin'";
        const [result] = await db.execute(query, [FName, LName, email, profile_photo, adminId]);
        if(result.affectedRows > 0){
            return {
                success: true,
                message: "Admin details updated successfully"
            };
        }
        return {
            success: false,
            message: "Failed to update admin details"
        };
    }
    static async updateAdminPassword(password, adminId){
        const query = "UPDATE users SET password_hash = ? WHERE user_id = ? AND role = 'admin'";
        const [result] = await db.execute(query, [password, adminId]);
        if(result.affectedRows > 0){
            return {
                success: true,
                message: "Password updated successfully"
            };
        }
        return {
            success: false,
            message: "Failed to update password"
        };
    }

    static async getAdminPassword(adminId) {
        try {
          const [rows] = await db.execute(
            `SELECT password_hash FROM users WHERE user_id = ?`,
            [adminId]
          );
      
          if (rows.length > 0) {
            return rows[0]; 
          } else {
            return null;
          }
        } catch (err) {
          console.error("Error retrieving admin password:", err);
          throw err;
        }
      }
      
}

module.exports = { admin };