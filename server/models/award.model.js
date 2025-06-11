const { DataTypes } = require("sequelize");
const sequelize = require("../configs/sequelize");

const Award = sequelize.define("Award", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    awardNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    receivedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('valid', 'invalid', 'pending'),
        allowNull: false,
        defaultValue: 'pending',
    },
    invalidReason: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "Explanation of why the award is marked as invalid"
    },
    studentID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    timestamps: true,
    tableName: 'awards'
});

module.exports = Award;
