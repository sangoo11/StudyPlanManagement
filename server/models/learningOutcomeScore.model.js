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
        allowNull: false,
        validate: {
            is: /^[A-z]{2}[0-9]{1}$/
        },
        beforeCreate() {
            if (this.learningOutcomeID == 2 || this.learningOutcomeID == 1) {
                this.highestLevel = 'NT1';
            } else if (this.learningOutcomeID == 8) {
                this.highestLevel = 'TD1';
            } else {
                this.highestLevel = 'KN1';
            }
        },
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
    timestamps: false
});

module.exports = LearningOutcomeScore; 