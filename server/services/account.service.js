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
        const transaction = await sequelize.transaction();

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
                },
                    { transaction }
                );
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
                },
                    { transaction }
                );
            }

            await account.update({
                active: true,
            },
                { transaction }
            );
            transaction.commit();
            return {
                accountID: account.id,
                active: true,
                status: 'active',
            };
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    static deactiveAccount = async (accountID, userStatus) => {
        const transaction = await sequelize.transaction();

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
                },
                    { transaction }
                );
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
                },
                    { transaction }
                );
            }

            await account.update({
                active: false,
            },
                { transaction }
            );
            transaction.commit();
            return {
                accountID: account.id,
                active: false,
                status: userStatus,
            };
        } catch (error) {
            await transaction.rollback();
            throw new Error(error);
        }
    }
}

module.exports = AccountService;