const { Product } = require('../models/Product');
const { DeleteImageFromS3 } = require('./DeleteImageFromS3');
const { getImageName } = require('./getImageName');

class DeleteProductService {
  async execute(userId, productId) {
    const result = await Product.findOne({
      where: {
        id: productId,
        user_id: userId,
      },
    });

    if (!result) {
      return new Error('This product does not exits');
    }

    const product = result.toJSON();
    const deleteImageFromS3 = new DeleteImageFromS3('PRODUCTS');

    const productImageKey = getImageName(product.photo, true);

    const deleteImageResult = await deleteImageFromS3.execute(productImageKey);

    await Product.destroy({
      where: {
        user_id: userId,
        id: productId,
      },
    });
  }
}

module.exports = { DeleteProductService };
