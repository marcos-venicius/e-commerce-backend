const { User } = require('../../src/models/User');
const { Product } = require('../../src/models/Product');
const { RemoveProductFromCart } = require('../../src/services/RemoveProductFromCart');

describe('Remove product from cart', () => {
  test('removing existing product from cart', async () => {
    const removeProductFromCart = new RemoveProductFromCart();

    const user = await User.findAll();
    const product = await Product.findAll();

    const testingUser = user[0].toJSON();
    const testingProduct = product[0].toJSON();

    await removeProductFromCart.execute(testingUser.id, testingProduct.id);

    const findProduct = await Product.findByPk(testingProduct.id);

    expect(findProduct.toJSON().quantity).toBe(5);
  });

  test('removing product that not exists from cart', async () => {
    const removeProductFromCart = new RemoveProductFromCart();

    const user = await User.findAll();

    const testingUser = user[0].toJSON();

    const result = await removeProductFromCart.execute(testingUser.id, 'safsdfsdf');

    expect(result).toBeInstanceOf(Error);
  });
});
