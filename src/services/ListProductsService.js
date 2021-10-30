const { Product } = require('../models/Product');

class ListProductService {
  async execute(userId) {
    const products = await Product.findAll({
      where: {
        user_id: userId,
      },
    });

    return products;
  }
}

module.exports = { ListProductService };
