const { DataTypes } = require("sequelize");
const sequelize = require("../configs/sequelize");

const AwardStudent = sequelize.define("AwardStudent", {
    studentID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    awardID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    receivedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date()
    },
}, {
    timestamps: true,
});

module.exports = AwardStudent;
