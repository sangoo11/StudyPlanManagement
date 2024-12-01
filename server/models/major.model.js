const { DataTypes, Model } = require("sequelize");
const sequelize = require("../configs/sequelize");

const Major = sequelize.define("Major", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    major_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    major_description: {
        type: DataTypes.STRING,
    },
    min_credit: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: true,
})

module.exports = Major