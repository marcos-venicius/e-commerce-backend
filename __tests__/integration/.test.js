const { User } = require('../../src/models/User');
const { Product } = require('../../src/models/Product');
const { Dislikes } = require('../../src/models/Dislikes');
const { Likes } = require('../../src/models/Likes');
const { Cart } = require('../../src/models/Cart');

beforeAll(async () => {
  await User.destroy({ truncate: true });
  await Product.destroy({ truncate: true });
  await Dislikes.destroy({ truncate: true });
  await Likes.destroy({ truncate: true });
  await Cart.destroy({ truncate: true });
});

require('./addToCart');
require('./removeProductFromCart');
