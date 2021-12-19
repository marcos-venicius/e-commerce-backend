const { Cart } = require('../models/Cart');
const { Product } = require('../models/Product');

class RemoveProductFromCart {
  /**
   * remove product from cart
   * @param {string} userId user id
   * @param {string} productId product id
   * @returns {Promise<void | Error>}
   */
  async execute(userId, productId) {
    const productCart = await Cart.findOne({
      where: {
        user_id: userId,
        product_id: productId,
      },
    });

    if (!productCart) {
      return new Error('This product is not in cart');
    }

    await Cart.destroy({
      where: {
        user_id: userId,
        product_id: productId,
      },
    });
  }
}

module.exports = { RemoveProductFromCart };
