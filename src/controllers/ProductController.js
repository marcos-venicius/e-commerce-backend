const { CreateProductService } = require('../services/CreateProductService');

class ProductController {
  async create(req, res) {
    const { product } = req.body;

    if (!product) {
      return res.status(400).json({
        message: 'You need to send product information',
      });
    }

    const createProductService = new CreateProductService();

    const result = await createProductService.execute(product);

    if (result instanceof Error) {
      return res.status(400).json({
        error: result.message,
      });
    }

    return res.json(result);
  }
}

module.exports = { ProductController };
