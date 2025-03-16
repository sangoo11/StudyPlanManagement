const { DataTypes } = require("sequelize");
const sequelize = require("../configs/sequelize");

const SubjectLearningOutcome = sequelize.define(
  "SubjectLearningOutcome",
  {
    level: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[A-z]{2}[0-9]{1}$/,
      },
    },
  },
  {
    timestamps: false,
  }
);

module.exports = SubjectLearningOutcome;
