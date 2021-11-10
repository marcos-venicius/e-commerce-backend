const cartRouter = require('express').Router();

const { CartController } = require('../controllers/CartController');

const { authenticate } = require('../middleware/authenticate');

const cartController = new CartController();

cartRouter.post('/add', authenticate, cartController.add);
cartRouter.delete('/remove', authenticate, cartController.remove);

module.exports = { cartRouter };
