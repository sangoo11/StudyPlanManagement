const { DataTypes } = require("sequelize");
const sequelize = require("../configs/sequelize");

const Account = sequelize.define("Account", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accountableId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  accountableType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})

module.exports = Account