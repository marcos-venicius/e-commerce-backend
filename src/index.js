const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

require('dotenv/config');

const { userRouter } = require('./routes/user');
const { verify } = require('jsonwebtoken');

const app = express();

app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: '*',
  }),
);
app.use(morgan('dev'));

app.use('/user', userRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Listeng on port ${PORT}`);
});
