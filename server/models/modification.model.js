const { DataTypes } = require("sequelize");
const sequelize = require("../configs/sequelize");

const Modification = sequelize.define(
  "Modification",
  {
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Modification;
