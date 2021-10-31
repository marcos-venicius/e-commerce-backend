const { Product } = require('../models/Product');
const { UploadImageToS3Service } = require('./UploadImageToS3Service');
const { getImageName } = require('./getImageName');

class EditProductImageService {
  async execute(base64, productId) {
    const product = await Product.findByPk(productId);

    if (!product) {
      return new Error("This product does not exists");
    }

    const uploadImageToS3Service = new UploadImageToS3Service();

    const json = product.toJSON();

    const result = await uploadImageToS3Service.upload('product', base64, getImageName(json.photo));

    return result;
  }
}

module.exports = { EditProductImageService };
