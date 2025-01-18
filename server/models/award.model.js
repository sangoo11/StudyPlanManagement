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
}, {
    timestamps: false,
});

module.exports = Award;
