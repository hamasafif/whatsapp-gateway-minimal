const db = require('../config/db');
const bcrypt = require('bcrypt');

const User = {
          create: (username, password, callback) => {
                    const hashed = bcrypt.hashSync(password, 10);
                    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashed], callback);
          },
          findByUsername: (username, callback) => {
                    db.query('SELECT * FROM users WHERE username = ?', [username], callback);
          }
};

module.exports = User;