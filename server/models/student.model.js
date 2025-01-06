const { DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelize');

const Student = sequelize.define('Student', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    fullName: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    year: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            is: /^\d{4}-\d{4}$/,
            isValidYearRange(value) {
                const [startYear, endYear] = value.split('-').map(Number);
                if (endYear <= startYear) {
                    throw new Error('Not correct year');
                }
            }
        },
        defaultValue: '2025-2029'
    },
    major: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    credit: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    status: {
        type: DataTypes.ENUM("active", "terminated", "onleave", "suspended"),
        allowNull: false,
        defaultValue: "active",
    },
    accountID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: true,
    hooks: {
        beforeCreate: (student) => {
            const createdAt = student.createdAt || new Date();
            const year = createdAt.getFullYear();
            student.year = `${year}-${year + 4}`;
        }
    }
});

module.exports = Student;