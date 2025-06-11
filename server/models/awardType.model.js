const { DataTypes } = require("sequelize");
const sequelize = require("../configs/sequelize");

const AwardType = sequelize.define("AwardType", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Name of the award (e.g., 'Employee of the Month')"
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "Detailed explanation of the award"
    },
    type: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "Category/type (e.g., 'Performance', 'Attendance')"
    },
    level: {
        type: DataTypes.ENUM('School', 'City', 'Country'),
        allowNull: true,
        comment: "Tier/level of the award"
    },
    date_awarded: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: "Date when the award was given"
    }
}, {
    timestamps: true,
});

module.exports = AwardType; 