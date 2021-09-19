const jwt = require('jsonwebtoken');
const ClientError = require('./client-error');

function authorizationMiddleware(req, res, next) {
  const token = req.headers.authorization;
  if (!req.headers.authorization) {
    throw new ClientError(401, 'authentication required');
  }
  const payload = jwt.verify(token, process.env.TOKEN_SECRET);
  req.user = payload;
  next();
}

module.exports = authorizationMiddleware;
