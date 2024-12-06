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
    status: {
        type: DataTypes.ENUM('inProgress', 'completed'),
        allowNull: true,
    },
}, {
    timestamps: false
});

module.exports = Enrollment