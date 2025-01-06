const { DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelize');

const Teacher = sequelize.define('Teacher', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    fullName: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    major: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM("Active", "Terminated", "On leave", "Suspended"),
        allowNull: false,
        defaultValue: "Active",
    },
    accountID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: false,
});

module.exports = Teacher;