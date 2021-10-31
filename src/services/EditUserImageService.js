const { User } = require('../models/User');
const { UploadImageToS3Service } = require('./UploadImageToS3Service');
const { getImageName } = require('./getImageName');

class EditUserImageService {
  async execute(base64, userId) {
    const user = await User.findByPk(userId);

    const uploadImageToS3Service = new UploadImageToS3Service();

    const json = user.toJSON();

    const result = await uploadImageToS3Service.upload('user', base64, getImageName(json.photo));

    return result;
  }
}

module.exports = { EditUserImageService };
