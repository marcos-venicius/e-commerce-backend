const productRouter = require('express').Router();

const { ProductController } = require('../controllers/ProductController');

const { authenticate } = require('../middleware/authenticate');

const productController = new ProductController();

productRouter.post('/create', authenticate, productController.create);
productRouter.get('/all', authenticate, productController.all);
productRouter.get('/one/:id', authenticate, productController.one);
productRouter.post('/delete/:id', authenticate, productController.destroy);
productRouter.put('/like/:id', authenticate, productController.like);
productRouter.put('/dislike/:id', authenticate, productController.dislike);
productRouter.put('/edit/:id', authenticate, productController.edit);

module.exports = { productRouter };
