const { DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelize');

const learningOutcomeScore = sequelize.define('learningOutcomeScore', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    contributionPercentage: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: 0,
            max: 100
        }
    }
}, {
    timestamps: true,
});

module.exports = learningOutcomeScore;