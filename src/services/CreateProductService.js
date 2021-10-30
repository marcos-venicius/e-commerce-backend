const { v4 } = require('uuid');
const { Product } = require('../models/Product');
const { User } = require('../models/User');

class CreateProductService {
  constructor() {
    this.required = ['name', 'price', 'photo', 'user_id'];
  }
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

    const user = await User.findByPk(product.user_id);

    if (!user) {
      return new Error('The user that is trying to create this product does not exists');
    }

    if (findProduct) {
      return new Error('Already exists a product with this same name');
    }

    const productItem = await Product.create({
      id: v4(),
      name: product.name,
      price: Number(product.price),
      quantity: Number(product.quantity || '0'),
      description: product.description || '',
      likes: 0,
      dislikes: 0,
      photo: product.photo,
      user_id: product.user_id,
    });

    const productSaved = await productItem.save();

    return productSaved;
  }
}

module.exports = { CreateProductService };
