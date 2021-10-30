const { sign } = require('jsonwebtoken');
const md5 = require('md5');
const { User } = require('../models/User');

class UserLoginService {
  constructor() {
    this.secret = process.env.JWT_SECRET;
  }

  async execute(email, password) {
    const user = await User.findOne({
      where: {
        email: email || "",
        password: md5(password || ""),
      },
    });

    if (!user) {
      return new Error('Email and/or password are incorrect');
    }

    const token = sign(
      {
        id: user.id,
      },
      this.secret,
      {
        expiresIn: 60 * 60,
      },
    );

    return {
      data: {
        token,
        ...user.toJSON(),
        password: null,
      },
    };
  }
}

module.exports = { UserLoginService };
