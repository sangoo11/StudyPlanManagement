const { DataTypes } = require("sequelize");
const sequelize = require("../configs/sequelize");


const Award = sequelize.define("Award", {
    awardNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    receivedAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
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
    timestamps: false,
});

module.exports = Award;
