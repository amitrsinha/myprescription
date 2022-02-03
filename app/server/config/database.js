const DBCon = require("../../../config/database");
let db;
if(process.env.DEFAULT_DB_DRIVER === 'mysql') {
    db = DBCon.sequelize;
}

connect(db);

  async function connect(con) {
    try {
        await con.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
  }
  module.exports = db;
