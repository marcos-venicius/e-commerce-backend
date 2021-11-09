const { Product } = require('../models/Product');
const { Likes } = require('../models/Likes');
const { Dislikes } = require('../models/Dislikes');

class LikeAndDislikeProductService {
  #product_id = 0;
  #user_id = 0;

  constructor(product_id, user_id) {
    this.#product_id = product_id;
    this.#user_id = user_id;
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

    const hasLike = await Likes.findOne({
      where: {
        user_id: this.#user_id,
        product_id: this.#product_id,
      },
    });

    if (!hasLike) {
      const newLike = await Likes.create({
        user_id: this.#user_id,
        product_id: this.#product_id,
      });

      await newLike.save();

      const count = await Likes.count({
        where: {
          product_id: this.#product_id,
        },
      });

      await Product.update(
        {
          likes: count,
        },
        {
          where: {
            id: this.#product_id,
          },
        },
      );
    } else {
      await Likes.destroy({
        where: {
          user_id: this.#user_id,
          product_id: this.#product_id,
        },
      });

      const count = await Likes.count({
        where: {
          product_id: this.#product_id,
        },
      });

      await Product.update(
        {
          likes: count,
        },
        {
          where: {
            id: this.#product_id,
          },
        },
      );
    }
  }

  async dislike() {
    const product = await this.#getProduct();

    if (product instanceof Error) {
      return product;
    }

    const hasDislike = await Dislikes.findOne({
      where: {
        user_id: this.#user_id,
        product_id: this.#product_id,
      },
    });

    if (!hasDislike) {
      const newDislike = await Dislikes.create({
        user_id: this.#user_id,
        product_id: this.#product_id,
      });

      await newDislike.save();

      const count = await Dislikes.count({
        where: {
          product_id: this.#product_id,
        },
      });

      await Product.update(
        {
          dislikes: count,
        },
        {
          where: {
            id: this.#product_id,
          },
        },
      );
    } else {
      await Dislikes.destroy({
        where: {
          user_id: this.#user_id,
          product_id: this.#product_id,
        },
      });

      const count = await Dislikes.count({
        where: {
          product_id: this.#product_id,
        },
      });

      await Product.update(
        {
          dislikes: count,
        },
        {
          where: {
            id: this.#product_id,
          },
        },
      );
    }
  }
}

module.exports = { LikeAndDislikeProductService };
