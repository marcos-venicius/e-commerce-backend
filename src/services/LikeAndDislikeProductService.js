const { Product } = require('../models/Product');

class LikeAndDislikeProductService {
  #product_id = 0;

  constructor(product_id) {
    this.#product_id = product_id;
  }

  async #getProduct() {
    const product = await Product.findOne({
      where: {
        id: this.#product_id,
      },
    });

    if (!product) {
      return new Error('This product does not exists');
    }

    return product.toJSON();
  }

  async like() {
    const product = await this.#getProduct();

    if (product instanceof Error) {
      return product;
    }

    await Product.update(
      {
        likes: product.likes + 1,
      },
      {
        where: {
          id: this.#product_id,
        },
      },
    );
  }

  async dislike() {
    const product = await this.#getProduct();

    if (product instanceof Error) {
      return product;
    }

    await Product.update(
      {
        dislikes: product.dislikes + 1,
      },
      {
        where: {
          id: this.#product_id,
        },
      },
    );
  }
}

module.exports = { LikeAndDislikeProductService };
