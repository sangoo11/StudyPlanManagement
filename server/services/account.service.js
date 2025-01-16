const Account = require('../models/account.model');
const Course = require('../models/course.model');
const Teacher = require('../models/teacher.model');
const Subject = require('../models/subject.model');
const Student = require('../models/student.model');
const sequelize = require('../configs/sequelize');

class AccountService {
    static checkAccountRole = async (accountID) => {
        const account = await Account.findByPk(accountID);
        if (!account) throw new Error('Account not found');
        return {
            accountID: account.id,
            accountableType: account.accountableType,
        };
    }

    static activeAccount = async (accountID) => {
        const account = await Account.findByPk(accountID);
        if (!account) throw new Error('Account not found');
        const accountActive = account.active;
        if (accountActive) throw new Error('Account is already active');
        const accountRole = account.accountableType;

        try {
            if (accountRole === 'teacher') {
                const teacher = await Teacher.findOne({
                    where: {
                        accountID: accountID,
                    },
                });
                if (!teacher) throw new Error('Teacher not found');
                teacher.update({
                    status: 'active',
                });
            }
            if (accountRole === 'student') {
                const student = await Student.findOne({
                    where: {
                        accountID: accountID,
                    },
                });
                if (!student) throw new Error('Student not found');
                student.update({
                    status: 'active',
                });
            }

            await account.update({
                active: true,
            });
            return {
                accountID: account.id,
                active: true,
                status: 'active',
            };
        } catch (error) {
            throw error;
        }
    }

    static deactiveAccount = async (accountID, userStatus) => {
        const account = await Account.findByPk(accountID);
        if (!account) throw new Error('Account not found');
        const accountActive = account.active;
        if (accountActive === false) throw new Error('Account is already deactive');

        if (!userStatus) throw new Error('Missing user status');
        if (!['terminated', 'onleave', 'suspended'].includes(userStatus.userStatus)) throw new Error('Invalid user status');
        const accountRole = account.accountableType;
        try {
            if (accountRole === 'teacher') {
                const teacher = await Teacher.findOne({
                    where: {
                        accountID: accountID,
                    },
                });
                if (!teacher) throw new Error('Teacher not found');
                teacher.update({
                    status: userStatus.userStatus,
                });
            }
            if (accountRole === 'student') {
                const student = await Student.findOne({
                    where: {
                        accountID: accountID,
                    },
                });
                if (!student) throw new Error('Student not found');
                student.update({
                    status: userStatus.userStatus,
                });
            }

            await account.update({
                active: false,
            });
            return {
                accountID: account.id,
                active: false,
                status: userStatus,
            };
        } catch (error) {
            throw new Error(error);
        }
    }

    static getUserIDByAccountID = async (accountID) => {
        if (!accountID) throw new Error('Missing account ID');
        if (parseInt(accountID) === 1) throw new Error('This account is not allowed to get user ID');
        const account = await Account.findByPk(accountID);
        if (!account) throw new Error('Account not found');

        const accountRole = account.accountableType;

        if (accountRole === 'teacher') {
            const teacher = await Teacher.findOne({
                where: {
                    accountID: accountID,
                },
            });
            if (!teacher) throw new Error('Teacher not found');
            return {
                teacherID: teacher.id,
            };
        }

        if (accountRole === 'student') {
            const student = await Student.findOne({
                where: {
                    accountID: accountID,
                },
            });
            if (!student) throw new Error('Student not found');
            return {
                studentID: student.id,
            };
        }
    }
}

module.exports = AccountService;