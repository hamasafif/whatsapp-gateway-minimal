const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const log = require('../utils/logger');

exports.register = (req, res) => {
          const { username, password } = req.body;
          User.create(username, password, (err) => {
                    if (err) return res.status(500).json({ message: '❌ Gagal Register' });
                    log('✅ User Baru Terdaftar');
                    res.json({ message: '✅ Register Berhasil' });
          });
};

exports.login = (req, res) => {
          const { username, password } = req.body;
          User.findByUsername(username, (err, results) => {
                    if (err || results.length === 0) return res.status(401).json({ message: '❌ Login Gagal' });
                    const user = results[0];
                    if (!bcrypt.compareSync(password, user.password)) return res.status(401).json({ message: '❌ Password Salah' });
                    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
                    log('✅ Login Berhasil untuk ' + username);
                    res.json({ token });
          });
};