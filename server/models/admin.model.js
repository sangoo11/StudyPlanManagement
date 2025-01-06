const { DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelize');

const Admin = sequelize.define('Admin', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
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

module.exports = Admin;