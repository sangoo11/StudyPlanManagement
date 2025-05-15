const { DataTypes } = require("sequelize");
const sequelize = require("../configs/sequelize");

const Certificate = sequelize.define("Certificate", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    certificateNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    type: {
        type: DataTypes.ENUM(
            'Chứng chỉ TOEIC (Nghe-Đọc)',
            'Chứng chỉ TOEIC (Nói- Viết)',
            'Chứng chỉ TOEFL iBT',
            'Chứng chỉ IELTS',
            'Chứng chỉ PTE Academic',
            'Chứng chỉ Cambridge',
            'Chứng chỉ VNU-EPT',
            'Tiếng Nhật',
            'Tiếng Pháp',
            'VPET',
            'Chứng chỉ GDQP&AN',
            'Bằng TN THPT',
            'Giấy Khai sinh',
            'VSTEP - Đánh giá năng lực',
            'Bằng đại học ngoại ngữ',
            'Bằng cao đẳng'
        ),
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    point: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    takenAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    expiredAt: {
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
        comment: "Explanation of why the certificate is marked as invalid"
    },
    studentID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    timestamps: true,
});

module.exports = Certificate;