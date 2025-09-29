const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
          const token = req.headers['authorization'];
          if (!token) return res.status(403).json({ message: '❌ Token Tidak Ada' });
          jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                    if (err) return res.status(403).json({ message: '❌ Token Tidak Valid' });
                    req.userId = decoded.id;
                    next();
          });
};