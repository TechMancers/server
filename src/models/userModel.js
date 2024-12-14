const db = require('../utils/database');
const transporter = require('../config/nodemailer')


exports.checkExistingEmail = (email) => {
    const sql = "SELECT * FROM users WHERE email=?";
    return db.execute(sql, [email]);
};

exports.createUser = async (user) => {
  const status = user.role === "admin" ? 0 : 1;

  // SQL query
  const userSql = `
    INSERT INTO users (
      user_id, email, password_hash, FName, LName, address, role, registered_at, isActive
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    console.log("Prepared SQL values:", {
      user_id: user.user_id,
      email: user.email,
      password: user.password,
      FName: user.FName || null,
      LName: user.LName || null,
      address: user.address || null,
      role: user.role,
      registered_at: user.registered_at || new Date(),
      status: status,
    });

    // Execute query
    const userResult = await db.execute(userSql, [
      user.user_id,
      user.email,
      user.password,
      user.FName || null,
      user.LName || null,
      user.address || null,
      user.role,
      user.registered_at || new Date(),
      status,
    ]);

    console.log("User created successfully:", userResult);
    return userResult;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};


exports.loginUser = (email) => {
    const sql = "SELECT user_id, email, password_hash, role, isActive FROM users WHERE email=?"
    return db.execute(sql, [email])
}

exports.forgotPasword = async (email,link) => {
    let error= false;
    try {
    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: 'Artista - Reset Password',
        html: link,
    });
}catch (e) {
    error = true;
  }

  return error;
};

exports.sendForgotPasswordEmail = async (senderAddress, link) => {
    let error = false;
    //console.log("LINK",link);

    try {
      
      transporter.sendMail({
        from: process.env.SMTP_USER,
        to: senderAddress,
        subject: "New Password",
        html: `Please reset your password by clicking <a href="${link}">here</a>.<br>This email is valid for two days.`,
      });
    } catch (e) {
      error = true;
    }
  
    return error;
  };

  exports.verificationEmail = async (senderAddress) => {
    let error = false;
    try {
      
      transporter.sendMail({
        from: process.env.SMTP_USER,
        to: senderAddress,
        subject: "Email Verification",
        html: `<p>REGISTERED SUCCESSFULLY!<p>`,
      });
    } catch (e) {
      error = true;
    }
  
    return error;
  };

  exports.getUserByEmail = (email) => {
    const sql = "SELECT * FROM users WHERE email=?";
    return db.execute(sql, [email]);
};

exports.checkUserId = async (user_id) => {
  try {
    const [rows, fields] = await db.execute('SELECT * FROM users WHERE user_id = ?', [user_id]);
    return rows[0];
  } catch (err) {
    console.error(err);
    throw err;
  }
};

exports.checkEmail = async (email) => {
  try {
    const [rows, fields] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0]; // Assuming email is unique and you want the first match
  } catch (err) {
    console.error(err);
    throw err;
  }
};

exports.updatePassword = async (hashedPassword, email) => {
  if (!hashedPassword || !email) {
    throw new Error("Hashed password and email are required");
  }
  try {
    const [result] = await db.execute('UPDATE users SET password_hash = ? WHERE email = ?', [hashedPassword, email]);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

exports.updateUserPassword = (password, email) => {
  const sql = "UPDATE users SET password_hash=? WHERE email=?";
  return db.execute(sql, [password, email]);

}

exports.getHighestUserIdByRole = async (rolePrefix) => {
  const sql = `SELECT user_id FROM users WHERE user_id LIKE '${rolePrefix}%' ORDER BY user_id DESC LIMIT 1`;
  const [rows, fields] = await db.execute(sql);
  return rows.length > 0 ? rows[0].user_id : null;
};

exports.generateNewUserId = async (role) => {
  const rolePrefix = role === 'admin' ? 'Ad' : 'Cu';
  const highestUserId = await this.getHighestUserIdByRole(rolePrefix);
  console.log('Highest User ID:', highestUserId);

  if (!highestUserId) {
    return `${rolePrefix}-00001`;
  }

  const userIdNumber = parseInt(highestUserId.split('-')[1]);
  const newUserIdNumber = userIdNumber + 1;
  const newUserId = `${rolePrefix}-${newUserIdNumber.toString().padStart(5, '0')}`;

  return newUserId;
};

