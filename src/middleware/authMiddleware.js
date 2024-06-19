// const jwt = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {
//   const token = req.header('x-auth-token');

//   if (!token) {
//     return res.status(401).json({ error: 'No token provided' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.p455w0rd);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res.status(401).json({ error: 'Invalid token' });
//   }
// };

// module.exports = authMiddleware;

// middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }
  jwt.verify(token, 'secretKey', (error, decoded) => {
    if (error) {
      return res.status(500).json({ error: 'Failed to authenticate token' });
    }
    req.userId = decoded.idUsuario;
    next();
  });
};
