const Account = require('../models/account.model');
const Course = require('../models/course.model');
const Enrollment = require('../models/enrollment.model');
const Score = require('../models/score.model');
const { sql, Op } = require('@sequelize/core');
const Teacher = require('../models/teacher.model');
const sequelize = require('../configs/sequelize');
class TeacherService {
    static getAllTeachers = async () => {
        const teachers = await Teacher.findAll();
        if (!teachers) throw new Error("No teacher found")

        return teachers;
    }

    static getAllInactiveTeachers = async () => {
        const teachers = await Teacher.findAll({
            where: {
                status: {
                    [Op.ne]: "active"
                }
            }
        })
        if (!teachers) throw new Error("No unactive teacher found")

        return teachers;
    }

    static getTeacherByID = async (teacherID) => {
        if (!teacherID) throw new Error('Missing teacher ID');

        const teacher = await Teacher.findOne({
            where: {
                id: teacherID,
            }
        });
        if (!teacher) throw new Error('Teacher not found');

        return teacher;
    }

    static updateTeacherByID = async ({
        fullName,
        major,
    }, teacherID) => {
        if (!teacherID) throw new Error('Missing teacher ID');

        const teacher = await Teacher.findOne({
            where: {
                id: teacherID
            }
        });
        if (!teacher) throw new Error('Teacher not found');

        await teacher.update({
            fullName: fullName || teacher.fullName,
            major: major || teacher.major,
        });

        return teacher;
    }

    static deleteTeacherByID = async (teacherID) => {
        if (!teacherID) throw new Error('Missing teacher ID');

        try {
            const teacher = await Teacher.findOne({
                where: {
                    id: teacherID
                }
            });
            if (!teacher) throw new Error('Teacher not found');

            await teacher.update({
                status: 'terminated',
            });

            const accountID = teacher.accountID;

            await Account.update({
                active: false,
            }, {
                where: {
                    id: accountID,
                }
            });

            return {
                teacherID: teacherID,
                status: teacher.status,
                accountID: accountID,
                active: false,
            };
        } catch (error) {
            throw new Error("Delete unsucessfully", error.message);
        }
    }
}

module.exports = TeacherService;