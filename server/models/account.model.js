const { DataTypes } = require("sequelize");
const sequelize = require("../configs/sequelize");

const Account = sequelize.define(
  "Account",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accountableType: {
      type: DataTypes.ENUM("student", "teacher", "admin"),
      allowNull: false,
      valdidate: {
        isIn: [["student", "teacher", "admin"]],
      },
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    resetToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetTokenExpiry: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = Account;
