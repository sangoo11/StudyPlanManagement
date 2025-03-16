// create knowfield model with id name descrtiption status minCredit using sequelize
// Here the example
const { DataTypes } = require("sequelize");
const sequelize = require("../configs/sequelize");

const KnowledgeField = sequelize.define(
  "KnowledgeField",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    minCredit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    KnowledgeDomainID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = KnowledgeField;
