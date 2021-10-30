const { sign } = require('jsonwebtoken');
const md5 = require('md5');
const { User } = require('../models/User');

class CreateUserService {
  constructor() {
    this.secret = process.env.JWT_SECRET;
  }

  async execute(username, email, password, photo) {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (user) {
      return new Error('This user already exists');
    }

    const userObject = await User.create({
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
        expiresIn: 60 * 60,
      },
    );

    return {
      data: {
        token,
        ...userCreated.toJSON(),
        password: null,
      },
    };
  }
}

module.exports = { CreateUserService };
