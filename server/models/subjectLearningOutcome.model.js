const { DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelize');

const SubjectLearningOutcome = sequelize.define('SubjectLearningOutcome', {
}, {
    timestamps: false,
});

module.exports = SubjectLearningOutcome;