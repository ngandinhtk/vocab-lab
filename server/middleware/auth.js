import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (token == null) {
    // No token provided. Treat as a guest/free user.
    // We can attach a default free user profile to the request.
    req.user = { subscription_tier: 'free' };
    return next();
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      // Token is invalid, but we don't want to block them,
      // just treat them as a free user.
      req.user = { subscription_tier: 'free' };
    } else {
      req.user = user;
    }
    next();
  });
};
