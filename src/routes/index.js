const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const { userRouter } = require('./user');
const { productRouter } = require('./product');
const { cartRouter } = require('./cart');

const app = express();

function routes() {
  app.use(
    express.json({
      limit: '50mb',
    }),
  );
  app.use(helmet());
  app.use(
    cors({
      origin: '*',
    }),
  );
  app.use(morgan('dev'));

  app.use('/user', userRouter);
  app.use('/product', productRouter);
  app.use('/cart', cartRouter);

  return app;
}

module.exports = { routes };
