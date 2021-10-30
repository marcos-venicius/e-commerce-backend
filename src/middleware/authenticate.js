const { verify } = require("jsonwebtoken");

function authenticate(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: 'Missing token',
    });
  }

  verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: 'Invalid token',
      });
    }

    req.user_id = decoded.id;

    next();
  });
}

module.exports = { authenticate };
