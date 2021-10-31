const { CreateProductService } = require('../services/CreateProductService');
const { DeleteProductService } = require('../services/DeleteProductService');
const { EditProductService } = require('../services/EditProductService');
const { GetProductService } = require('../services/GetProductService');
const { LikeAndDislikeProductService } = require('../services/LikeAndDislikeProductService');
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

  async destroy(req, res) {
    const { id } = req.params;
    const deleteProductService = new DeleteProductService();

    const result = await deleteProductService.execute(req.user_id, id);

    if (result instanceof Error) {
      return res.status(400).json({
        message: result.message,
      });
    }

    return res.status(200).json({
      message: 'success',
    });
  }

  async like(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: 'You need to pass product id',
      });
    }

    const likeAndDislikeProductService = new LikeAndDislikeProductService(id);

    const result = await likeAndDislikeProductService.like();

    if (result instanceof Error) {
      return res.status(400).json({
        message: result.message,
      });
    }

    return res.status(200).json({
      message: 'success',
    });
  }

  async dislike(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: 'You need to pass product id',
      });
    }

    const likeAndDislikeProductService = new LikeAndDislikeProductService(id);

    const result = await likeAndDislikeProductService.dislike();

    if (result instanceof Error) {
      return res.status(400).json({
        message: result.message,
      });
    }

    return res.status(200).json({
      message: 'success',
    });
  }

  async edit(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: 'You need to pass product id',
      });
    }

    const editProductService = new EditProductService();

    const result = await editProductService.execute(req.user_id, id, req.body);

    if (result instanceof Error) {
      return res.status(400).json({
        message: result.message,
      });
    }

    return res.status(201).json(result);
  }
}

module.exports = { ProductController };
