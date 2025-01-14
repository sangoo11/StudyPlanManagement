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
        type: DataTypes.ENUM("active", "terminated", "onleave", "suspended"),
        allowNull: false,
        defaultValue: "active",
    },
    accountID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: false,
});

module.exports = Admin;