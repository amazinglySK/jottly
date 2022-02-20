const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const { token } = req.cookies;
  const isLoggedIn = jwt.verify(token, process.env.JWT_SECRET);
  if (!isLoggedIn) {
    res.status(400);
    return;
  }
  res.locals.user_id = isLoggedIn.user_id;
  res.locals.username = isLoggedIn.username;
  next();
};

module.exports = requireAuth;
