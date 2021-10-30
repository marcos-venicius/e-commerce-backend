const { CreateProductService } = require('../services/CreateProductService');
const { GetProductService } = require('../services/GetProductService');
const { ListProductService } = require('../services/ListProductsService');

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

  async all(req, res) {
    const listProductService = new ListProductService();

    const result = await listProductService.execute(req.user_id);

    return res.json(result);
  }

  async one(req, res) {
    const getProductService = new GetProductService();

    const result = await getProductService.execute(req.user_id, req.params.id);

    if (result instanceof Error) {
      return res.status(404).json({
        message: result.message,
      });
    } else {
      return res.json(result);
    }
  }
}

module.exports = { ProductController };
