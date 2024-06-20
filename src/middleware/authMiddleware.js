const jwt = require('jsonwebtoken');
const User = require('../models/user');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, 'your-secret-key');

      req.user = await User.findUserById(decoded.id);

      next();
    } catch (error) {
      res.status(401).json({ message: 'No autorizado, token fallido' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'No autorizado, sin token' });
  }
};

module.exports = { protect };
