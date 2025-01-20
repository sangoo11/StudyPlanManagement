const sequelize = require('../configs/sequelize')
const { DataTypes } = require('sequelize');

const Enrollment = sequelize.define('Enrollment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    finalGrade: {
        type: DataTypes.DECIMAL(4, 2),
        allowNull: true,
        validate: {
            min: 0,
            max: 10,
        },
        set(value) {
            this.setDataValue('finalGrade', value);  // Set the finalGrade value
            if (value !== null) {
                // Automatically set status based on finalGrade value
                this.status = value >= 5 ? 'pass' : 'fail';
            } else {
                this.status = 'enrolled'; // If no finalGrade, set default status
            }
        },
    },
    status: {
        type: DataTypes.ENUM('enrolled', 'pass', 'fail'),
        allowNull: false,
        defaultValue: 'enrolled',
        validate: {
            isIn: [['enrolled', 'pass', 'fail']],
        },
    },
    enrolledDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
    },
    studentID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    courseID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: false,
});

module.exports = Enrollment