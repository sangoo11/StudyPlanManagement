const { DataTypes } = require("sequelize");
const sequelize = require("../configs/sequelize");

const Major = sequelize.define(
  "Major",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    majorName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    majorCode: {
      type: DataTypes.ENUM(
        "IT",
        "IS",
        "CS",
        "AI",
        "SE",
        "CE",
        "VLSI",
        "CNS",
        "CNC",
        "ISec",
        "Ecom",
        "DS"
      ),
      allowNull: false,
    },
    // "Công nghệ Thông tin": "IT",
    // "Hệ thống Thông tin": "IS",
    // "Khoa học Máy tính": "CS",
    // "Trí tuệ Nhân tạo": "AI",
    // "Kỹ thuật Phần mềm": "SE",
    // "Kỹ thuật Máy tính": "CE",
    // "Thiết kế Vi mạch": "VLSI",
    // "Mạng máy tính và An toàn thông tin": "CNS",
    // "Mạng máy tính và Truyền thông dữ liệu": "CNC",
    // "An toàn Thông tin": "ISec",
    // "Thương mại điện tử": "Ecom",
    // "Khoa học Dữ liệu": "DS",
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Major;
