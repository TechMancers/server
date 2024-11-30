import { createPool } from 'mysql2';

import { host as _host, user as _user, database as _database, password as _password } from '../config/db.config.json';

const pool = createPool({
  host: _host,
  user: _user,
  database: _database,
  password: _password,
});

export default pool.promise();
