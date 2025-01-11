const sequelize = require('../configs/sequelize')
const { DataTypes } = require('sequelize');

const Enrollment = sequelize.define('Enrollment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    finalGrade: {
        type: DataTypes.DECIMAL(4, 2),
        allowNull: true,
        validate: {
            min: 0,
            max: 10,
        },
    },
    completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    enrolledDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
    },
    studentID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    courseID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: false,
});

module.exports = Enrollment