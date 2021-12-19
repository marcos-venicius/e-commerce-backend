const { sign } = require('jsonwebtoken');
const md5 = require('md5');
const { v4 } = require('uuid');
const { User } = require('../models/User');

class CreateUserService {
  constructor() {
    this.secret = process.env.JWT_SECRET;
  }

  async exists(email) {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (user) {
      return new Error('This user already exists');
    }
  }

  async execute(username, email, password, photo) {
    try {
      const userObject = await User.create({
        id: v4(),
        username,
        email,
        password: md5(password),
        photo,
      });

      const userCreated = await userObject.save();

      const token = sign(
        {
          id: userCreated.id,
        },
        this.secret,
        {
          expiresIn: "1h",
        },
      );

      return {
        data: {
          token,
          ...userCreated.toJSON(),
          password: null,
        },
      };
    } catch (err) {
      return new Error(err?.errors?.[0]?.message || err.message);
    }
  }
}

module.exports = { CreateUserService };
