const { User } = require('../models/User');
const { ValidateFieldsService } = require('./ValidateFieldsService');

class EditUserService {
  async execute(userId, newObject) {
    const allowedFields = [
      {
        name: 'username',
        type: String(),
      },
      {
        name: 'photo',
        type: String(),
      },
    ];

    const validateFieldsService = new ValidateFieldsService(newObject, allowedFields);

    const objectToUpdate = validateFieldsService.execute();

    if (objectToUpdate instanceof Error) {
      return objectToUpdate;
    }

    if (Object.keys(objectToUpdate).length !== 0) {
      await User.update(objectToUpdate, {
        where: {
          id: userId,
        },
      });
    }

    return (
      await User.findOne({
        where: {
          id: userId,
        },
      })
    ).toJSON();
  }
}

module.exports = { EditUserService };
