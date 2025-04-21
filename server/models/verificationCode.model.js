const { DataTypes } = require("sequelize");
const sequelize = require("../configs/sequelize");

const VerificationCode = sequelize.define(
  "VerificationCode",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    code: {
      type: DataTypes.INTEGER(),
      allowNull: true,
    },
    expiredAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: () => {
        const now = Date.now(); // current time in milliseconds
        return new Date(now + parseInt(process.env.CODE_EXPIRE) * 60 * 1000);
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = VerificationCode;
