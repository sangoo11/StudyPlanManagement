const { DataTypes } = require("sequelize");
const sequelize = require("../configs/sequelize");

const VerificationLogs = sequelize.define("VerificationLogs", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    certificateID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    verifiedBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    result: {
        type: DataTypes.ENUM('valid', 'invalid', 'expired'),
        allowNull: false,
    },
    verifiedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: true,
});

module.exports = VerificationLogs;
