const userRouter = require('express').Router();

const { UserController } = require('../controllers/UserController');

const { authenticate } = require('../middleware/authenticate');

const userController = new UserController();

userRouter.post('/create', userController.create);
userRouter.get('/find', authenticate, userController.find);

module.exports = { userRouter };
