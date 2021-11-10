const { AddToCartService } = require('../services/AddToCartService');
const { RemoveProductFromCart } = require('../services/RemoveProductFromCart');

class CartController {
  async add(req, res) {
    const { body } = req;

    if (!body.product_id) {
      return res.status(400).json({
        message: 'Missing field product_id',
      });
    }

    if (!body.quantity || Number.isNaN(Number(body.quantity))) {
      return res.status(400).json({
        message: 'Invalid quantity',
      });
    }

    const addToCartService = new AddToCartService(body.product_id, req.user_id, body.quantity);

    const result = await addToCartService.execute();

    if (result instanceof Error) {
      return res.status(500).json({
        message: result.message,
      });
    }

    return res.status(201).end();
  }

  async remove(req, res) {
    if (!body.product_id) {
      return res.status(400).json({
        message: 'Missing field product_id',
      });
    }

    const removeProductFromCart = new RemoveProductFromCart();

    const result = await removeProductFromCart.execute(req.user_id, body.product_id);

    if (result instanceof Error) {
      return res.status(500).json({
        message: result.message,
      });
    }

    return res.status(201).end();
  }
}

module.exports = { CartController };
