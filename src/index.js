const { routes } = require('./routes');

require('dotenv/config');

const app = routes();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`\x1b[1;32m[ + ] \x1b[1;37mListening at port: \x1b[1;36m${PORT}\x1b[0m`);
});
