const jwt = require("jsonwebtoken");

const requireAuth = () => {
  return (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).redirect("/login");
      return;
    }
    const isLoggedIn = jwt.verify(token, process.env.JWT_SECRET);
    if (!isLoggedIn) {
      res.status(401).redirect("/login");
      return;
    }
    res.locals.user_id = isLoggedIn.user_id;
    res.locals.username = isLoggedIn.username;
    next();
  };
};

module.exports = { requireAuth };
