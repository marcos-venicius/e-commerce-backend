const { Product } = require('../models/Product');

class GetProductService {
  async execute(userId, productId) {
    const product = await Product.findOne({
      where: {
        user_id: userId,
        id: productId,
      },
    });

    if (product) {
      return product.toJSON();
    } else {
      return new Error('Product not found');
    }
  }
}

module.exports = { GetProductService };
