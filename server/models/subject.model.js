const { DataTypes } = require("sequelize");
const sequelize = require("../configs/sequelize");
const KnowledgeField = require("./knowledgeField.model");

const Subject = sequelize.define(
  "Subject",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    subjectCode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^[A-Z]{2,4}\d{3}$/, // Regular expression for the subject code format
          msg: "Invalid subject code format.",
        },
      },
    },
    subjectName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    credit: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: 1,
        max: 15,
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    knowledgeFieldID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "KnowledgeField",
        key: "id",
      }, 
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Subject;
