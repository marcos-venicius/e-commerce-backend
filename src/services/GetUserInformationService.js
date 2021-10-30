const { User } = require('../models/User');

class GetUserInformationService {
  async execute(userId) {
    const result = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (result) {
      return result.toJSON();
    }

    return new Error("User does not exists");
  }
}

module.exports = { GetUserInformationService };
