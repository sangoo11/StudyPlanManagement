const { DataTypes } = require("sequelize");
const sequelize = require("../configs/sequelize");

const Student = sequelize.define("Student", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fullname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  major_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birth: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date_begin: {
    type: DataTypes.DATE,
    allowNull: false,
  },
})

module.exports = Student