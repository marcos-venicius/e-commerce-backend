const { CreateUserService } = require('../services/CreateUserService');
const { EditUserService } = require('../services/EditUserService');
const { GetUserInformationService } = require('../services/GetUserInformationService');
const { UserLoginService } = require('../services/UserLoginService');

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

  async login(req, res) {
    const { email, password } = req.body;

    const userLoginService = new UserLoginService();

    const result = await userLoginService.execute(email, password);

    if (result instanceof Error) {
      return res.status(401).json({
        message: result.message,
      });
    }

    return res.json(result);
  }

  async edit(req, res) {
    const editUserService = new EditUserService();

    const result = await editUserService.execute(req.user_id, req.body);

    if (result instanceof Error) {
      return res.status(400).json({
        message: result.message,
      });
    }

    return res.status(201).json(result);
  }
}

module.exports = { UserController };
