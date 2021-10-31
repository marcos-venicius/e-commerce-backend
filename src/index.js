const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

require('dotenv/config');

const { userRouter } = require('./routes/user');
const { productRouter } = require('./routes/product');

const app = express();

app.use(express.json({
  limit: '50mb'
}));
app.use(helmet());
app.use(
  cors({
    origin: '*',
  }),
);
app.use(morgan('dev'));

app.use('/user', userRouter);
app.use('/product', productRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT);
