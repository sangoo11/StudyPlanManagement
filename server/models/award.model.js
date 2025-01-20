const { DataTypes } = require("sequelize");
const sequelize = require("../configs/sequelize");

const Award = sequelize.define("Award", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    awardName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    awardType: {
        type: DataTypes.ENUM('university', 'city', 'country'),
        allowNull: false,
        validate: {
            isIn: [['university', 'city', 'country']]
        }
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    criteria: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: new Date().getFullYear(),
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    }
}, {
    timestamps: false,
});

module.exports = Award;
