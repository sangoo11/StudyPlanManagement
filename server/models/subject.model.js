const { DataTypes, Model } = require("sequelize");
const sequelize = require("../configs/sequelize");

const Subject = sequelize.define("Subject", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    subject_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    subject_description: {
        type: DataTypes.STRING,
    },
    credits: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
})

module.exports = Subject