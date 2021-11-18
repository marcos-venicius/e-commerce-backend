const { v4 } = require('uuid');
const { Product } = require('../models/Product');
const { UploadImageToS3Service } = require('./UploadImageToS3Service');

class CreateProductService {
  constructor() {
    this.required = ['name', 'price', 'photo', 'user_id'];
  }

  /**
   * @typedef {{
   * name: string,
   * price: number,
   * quantity: number,
   * description: string,
   * user_id: string,
   * photo: string
   * }} Product product
   * @param {Product} product product
   * @param {string} product.photo base64
   * @returns {Promise<Error | Product>}
   */
  async execute(product) {
    for (let requiredField of this.required) {
      if (!product[requiredField]) {
        return new Error(`'${requiredField}' is required`);
      }
    }

    const findProduct = await Product.findOne({
      where: {
        name: product.name,
        user_id: product.user_id,
      },
    });

    if (findProduct) {
      return new Error('Already exists a product with this same name');
    }

    const productUpload = new UploadImageToS3Service();

    const file = Buffer.from(product.photo, 'base64');

    const updaloadImageResult = await productUpload.upload('product', file);

    if (updaloadImageResult instanceof Error) {
      return new Error(updaloadImageResult.message);
    }

    const productItem = await Product.create({
      id: v4(),
      name: product.name,
      price: Number(product.price),
      quantity: Number(product.quantity || '0'),
      description: product.description || '',
      likes: 0,
      dislikes: 0,
      photo: updaloadImageResult,
      user_id: product.user_id,
    });

    const productSaved = await productItem.save();

    return productSaved;
  }
}

module.exports = { CreateProductService };
