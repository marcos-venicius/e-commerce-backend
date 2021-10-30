const productRouter = require('express').Router();

const { ProductController } = require('../controllers/ProductController');

const { authenticate } = require('../middleware/authenticate');

const productController = new ProductController();

productRouter.post('/create', authenticate, productController.create);
productRouter.get('/all', authenticate, productController.all);

module.exports = { productRouter };
