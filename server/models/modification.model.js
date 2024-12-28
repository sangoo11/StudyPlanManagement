const { DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelize');

const Score = sequelize.define('score', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    key: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    value: {
        type: DataTypes.DECIMAL(4, 2),
        allowNull: false,
    },
}, {
    timestamps: false
});

module.exports = Score;