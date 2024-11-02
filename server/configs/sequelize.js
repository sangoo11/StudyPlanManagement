const { Sequelize } = require("sequelize");

require("dotenv").config();

const sequelize = new Sequelize(
  process.env.LOCAL_DB_NAME,
  process.env.LOCAL_DB_USER,
  process.env.LOCAL_DB_PASSWORD,
  {
    host: process.env.LOCAL_DB_HOST,
    dialect: 'mysql',
    timezone: "+07:00",
    port: process.env.LOCAL_DB_PORT,
    define: {
      freezeTableName: true
    },
    pool: {
      max: 3, // Maximum number of connections in pool
      min: 0, // Minimum number of connections in pool
      acquire: 30000, // Maximum time (in ms) that pool will try to get a connection before throwing an error
      idle: 10000, // Maximum time (in ms) a connection can be idle before being released
    },
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false, // Adjust based on your SSL requirements
      },
    },
    logging: false,
  }
);


module.exports = sequelize;


