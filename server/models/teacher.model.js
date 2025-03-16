const { DataTypes } = require("sequelize");
const sequelize = require("../configs/sequelize");

const Teacher = sequelize.define(
  "Teacher",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    majorID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM("active", "terminated", "onleave", "suspended"),
      allowNull: false,
      defaultValue: "onleave",
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    accountID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Teacher;
