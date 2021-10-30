const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite',
  logging: true,
});

sequelize
  .authenticate()
  .then(() => {
    console.log('[+] DATABASE CONNECTED');
  })
  .catch(err => {
    console.log(`[!] CANNOT CONNECT TO DATABASE: ${err}`);
  });

module.exports = {
  sequelize,
};
