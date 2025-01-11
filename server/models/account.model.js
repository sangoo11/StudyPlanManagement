const { DataTypes } = require("sequelize");
const sequelize = require("../configs/sequelize");

const Account = sequelize.define("Account", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    accountableType: {
        type: DataTypes.ENUM('student', 'teacher', 'admin'),
        allowNull: false,
        valdidate: {
            isIn: [['student', 'teacher', 'admin']]
        }
    },
}, {
    timestamps: true,
});

module.exports = Account;
