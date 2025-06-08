const { DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelize');

const LearningOutcomeLevel = sequelize.define('LearningOutcomeLevel', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    level: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false
});

module.exports = LearningOutcomeLevel; 