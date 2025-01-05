const { DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelize');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [6, 255]
        }
    },
    fullName: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    role: {
        type: DataTypes.ENUM('student', 'teacher', 'admin'),
        allowNull: false,
        valdidate: {
            isIn: [['student', 'teacher', 'admin']]
        }
    },
    status: {
        type: DataTypes.ENUM('active', 'unactive', 'terminated'),
        allowNull: false,
        defaultValue: 'unactive'
    },
    year: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^\d{4}-\d{4}$/,
            isValidYearRange(value) {
                const [startYear, endYear] = value.split('-').map(Number);
                if (endYear <= startYear) {
                    throw new Error('Not correct year');
                }
            }
        },
        defaultValue: '2020-2099'
    },
    major: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    credit: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
    timestamps: false,
});

module.exports = User;