const { CreateUserService } = require('../services/CreateUserService');
const { GetUserInformationService } = require('../services/GetUserInformationService');

class UserController {
  async create(req, res) {
    const { username, email, password, photo } = req.body;

    const createUserService = new CreateUserService();
    const result = await createUserService.execute(username, email, password, photo);

    if (result instanceof Error) {
      return res.status(400).json({
        error: result.message,
      });
    }

    return res.json({
      message: 'success',
      data: result.data,
    });
  }

  async find(req, res) {
    const { user_id } = req;

    const getUserInformationService = new GetUserInformationService();

    const result = await getUserInformationService.execute(user_id);

    if (result instanceof Error) {
      return res.status(500).json({
        message: result.message,
      });
    }

    return res.json({
      ...result,
      password: null,
    });
  }
}

module.exports = { UserController };
