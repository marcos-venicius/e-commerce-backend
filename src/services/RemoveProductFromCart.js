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
    const product = await Product.findByPk(productId);

    if (!product) {
      return new Error('This product does not exists');
    }

    const productJSON = product.toJSON();

    const productCart = await Cart.findOne({
      where: {
        user_id: userId,
        product_id: productId,
      },
    });

    const productCartJSON = productCart.toJSON();

    if (!productCart) {
      return new Error('This product is not in cart');
    }

    await Product.update(
      {
        quantity: Number(productCartJSON.quantity) + Number(productJSON.quantity),
      },
      {
        where: {
          id: productId,
        },
      },
    );

    await Cart.destroy({
      where: {
        user_id: userId,
        product_id: productId,
      },
    });
  }
}

module.exports = { RemoveProductFromCart };
