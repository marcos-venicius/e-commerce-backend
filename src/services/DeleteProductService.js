const { Product } = require('../models/Product');

class DeleteProductService {
  async execute(userId, productId) {
    const result = await Product.findOne({
      where: {
        id: productId,
      },
    });

    if (!result) {
      return new Error('This product does not exits');
    }

    await Product.destroy({
      where: {
        user_id: userId,
        id: productId,
      },
    });
  }
}

module.exports = { DeleteProductService };
