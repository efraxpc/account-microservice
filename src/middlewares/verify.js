const jwt = require('jsonwebtoken');
const path = require('path');
const { createConfig } = require('../config/config');

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Unauthorized: Missing JWT token',
    });
  }

  const token = authHeader.split(' ')[1];
  const configPath = path.join(__dirname, '../../configs/.env');
  const appConfig = createConfig(configPath);
console.log(appConfig);
  jwt.verify(token, appConfig.jwt.accessTokenSecret, (err, decoded) => {
    if (err) {
      if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
          message: 'Unauthorized: Invalid JWT token format',
        });
      } else if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
          message: 'Unauthorized: JWT token expired',
        });
      } else {
        console.error('JWT verification error:', err);
        return res.status(500).json({
          message: 'Internal Server Error',
        });
      }
    }

    req.user = decoded;
    next();
  });
};

module.exports = verifyJWT;