const { Product } = require('../models/Product');
const { Cart } = require('../models/Cart');

/**
 * @classdesc to add products to cart
 *
 * @class AddToCartService
 */
class AddToCartService {
  #userId = '';
  #productId = '';
  #quantity = -1;

  /**
   * add to cart
   * @param {string} productId product id
   * @param {string} userId user id
   * @param {number} quantity product quantity
   * @returns {Promise<void>} void
   */
  constructor(productId, userId, quantity) {
    this.#userId = userId;
    this.#productId = productId;
    this.#quantity = Number(quantity);
  }

  /**
   * remove quantity of a product
   * @param {number} quantity new product quantity
   * @returns {Promise<void>} void
   */
  async #removeProductQuantity(quantity) {
    await Product.update(
      {
        quantity,
      },
      {
        where: {
          id: this.#productId,
        },
      },
    );
  }

  /**
   * add/update products to/in cart
   */
  async execute() {
    const product = await Product.findByPk(this.#productId);

    if (!product) {
      return new Error('This product does not exists');
    }

    const productJSON = product.toJSON();

    if (Number(productJSON.quantity) < this.#quantity) {
      return new Error(
        `sorry, we only have ${productJSON.quantity} units of the '${productJSON.name}' product`,
      );
    }

    const isInCart = await Cart.findOne({
      where: {
        user_id: this.#userId,
        product_id: this.#productId,
      },
    });

    if (!isInCart) {
      const cart = await Cart.create({
        user_id: this.#userId,
        product_id: this.#productId,
        quantity: this.#quantity,
        price: Number(this.#quantity) * Number(productJSON.price),
      });

      await cart.save();
    } else {
      const cartProduct = isInCart.toJSON();

      await Cart.update(
        {
          quantity: this.#quantity + Number(cartProduct.quantity),
        },
        {
          where: {
            user_id: this.#userId,
            product_id: this.#productId,
          },
        },
      );
    }
    await this.#removeProductQuantity(product.quantity - this.#quantity);

    const result = await Cart.findOne({
      where: {
        user_id: this.#userId,
        product_id: this.#productId,
      },
    });

    return result.toJSON();
  }
}

module.exports = { AddToCartService };
