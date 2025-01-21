const { DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelize');

const LearningOutcomeScore = sequelize.define('LearningOutcomeScore', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    score: {
        type: DataTypes.DECIMAL(4, 2),
        allowNull: false,
        validate: {
            min: 0,
            max: 10
        },
        defaultValue: 0
    },
    highestLevel: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            is: /^[A-z]{2}[0-9]{1}$/
        }
    },
    studentID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    learningOutcomeID: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    hooks: {
        beforeCreate: (record) => {
            if (record.learningOutcomeID == 2 || record.learningOutcomeID == 1) {
                record.highestLevel = 'NT1';
            } else if (record.learningOutcomeID == 8) {
                record.highestLevel = 'TD1';
            } else {
                record.highestLevel = 'KN1';
            }
        }
    }
});

module.exports = LearningOutcomeScore;