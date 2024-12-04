const mysql = require('mysql2');

const config = require('../config/db.config.json');

const pool = mysql.createPool({
  host: config.host,
  user: config.user,
  database: config.database,
  password: config.password,
});

const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
        return;
      }
      connection.query(sql, values, (err, results) => {
        connection.release(); // Release the connection
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      });
    });
  });
};

module.exports = pool.promise();
