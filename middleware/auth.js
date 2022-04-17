const jwt = require('jsonwebtoken');

const config = process.env;

const isAuthenticated = (req, res, next) => {
  try {
    const bearerHeader = req.headers.authorization;
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    if (!bearerToken) {
      res.status(403).send({ error: 'A token is required for authentication' });
    }

    const decoded = jwt.verify(bearerToken, config.TOKEN_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(500).send({ error: 'Invalid Token' });
  }
};

module.exports = isAuthenticated;
