const { DataTypes } = require("sequelize");
const sequelize = require("../configs/sequelize");

const Class = sequelize.define("Class", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    class_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    class_description: {
        type: DataTypes.STRING,
    },
    date_begin: {
        type: DataTypes.DATE,
        allowNull: false,
    }
})

module.exports = Class