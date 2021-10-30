const { verify } = require('jsonwebtoken');
const { User } = require('../models/User');

function authenticate(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: 'Missing token',
    });
  }

  verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: 'Invalid token',
      });
    }

    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({
        message: 'This user not exists',
      });
    }

    req.user_id = decoded.id;

    next();
  });
}

module.exports = { authenticate };
