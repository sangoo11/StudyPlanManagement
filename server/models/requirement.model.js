const { DataTypes, Model } = require("sequelize");
const sequelize = require("../configs/sequelize");

const Requirement = sequelize.define("Requirement", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    req_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    req_description: {
        type: DataTypes.STRING,
    },
})

module.exports = Requirement