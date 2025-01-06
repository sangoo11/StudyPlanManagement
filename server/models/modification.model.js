const { DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelize');

const Modification = sequelize.define('Modification', {
    key: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    value: {
        type: DataTypes.DECIMAL(4, 2),
        allowNull: false,
    },
}, {
    timestamps: false
});

module.exports = Modification;