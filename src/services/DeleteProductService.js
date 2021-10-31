const { Product } = require('../models/Product');

class DeleteProductService {
  async execute(userId, productId) {
    await Product.destroy({
      where: {
        user_id: userId,
        id: productId,
      },
    });
  }
}

module.exports = { DeleteProductService };
