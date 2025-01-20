const { ROLE } = require('../services/access.service');
const Course = require('../models/course.model');
const Enrollment = require('../models/enrollment.model');
const Student = require('../models/student.model');
const Award = require('../models/award.model');
const AwardStudent = require('../models/awardStudent.model');

class AwardService {
    static getAllAward = async () => {
        return await Award.findAll();
    }

    static getAwardById = async (awardID) => {
        if (!awardID) {
            throw new Error('awardID is required');
        }
        return await Award.findByPk(awardID);
    }

    static createAward = async ({
        awardName,
        awardType,
        description,
        criteria,
    }) => {
        if (!awardName || !awardType || !description || !criteria) {
            throw new Error('awardName, awardType, description, criteria are required');
        }

        return await Award.create({
            awardName,
            awardType,
            description,
            criteria,
        });
    }

    static updateAward = async (awardID, {
        awardName,
        awardType,
        description,
        criteria,
    }) => {
        if (!awardID) {
            throw new Error('awardID is required');
        }
        const award = await Award.findByPk(awardID);
        if (!award) {
            throw new Error('Award not found');
        }

        return award.update({
            awardName: awardName || award.awardName,
            awardType: awardType || award.awardType,
            description: description || award.description,
            criteria: criteria || award.criteria,
        });
    }

    static deleteAward = async (awardID) => {
        if (!awardID) {
            throw new Error('awardID is required');
        }
        const award = await Award.findByPk(awardID);
        if (!award) {
            throw new Error('Award not found');
        }

        return award.update({
            active: false,
        });
    }

    static getAllAwardByStudent = async (studentID) => {
        if (!studentID) {
            throw new Error('studentID is required');
        }

        return await Award.findAll({
            include: {
                model: Student,
                where: { id: studentID },
            },
        });
    }

    static addAwardForStudent = async (awardID, data) => {
        if (!data || data.length === 0 || !awardID) throw new Error('Student ID and Award ID are required');
        const award = await Award.findByPk(awardID);
        if (!award) {
            throw new Error('Award not found');
        }

        const studentListsID = [];
        for (let student of data.studentLists) {
            const currentStudent = await Student.findByPk(student.studentID);
            if (!currentStudent) throw new Error(`Student with ID ${student.studentID} not found`);
            if (currentStudent.status !== 'active') throw new Error(`Student with ID ${student.studentID} is not active`);

            const existingAward = await AwardStudent.findOne({
                where: {
                    studentID: student.studentID,
                    awardID: awardID,
                },
            });
            if (existingAward) throw new Error(`Student with ID ${student.studentID} already has this award`);

            await AwardStudent.create({
                studentID: student.studentID,
                awardID: awardID,
            });

            studentListsID.push(student.studentID);
        }
        return studentListsID;
    }

    static deleteAwardForStudent = async (awardID, { studentID }) => {
        if (!awardID || !studentID) throw new Error('Student ID and Award ID are required');

        const award = await Award.findByPk(awardID);
        if (!award) {
            throw new Error('Award not found');
        }

        const student = await Student.findByPk(studentID);
        if (!student) {
            throw new Error('Student not found');
        }

        const existingAward = await AwardStudent.findOne({
            where: {
                studentID: studentID,
                awardID: awardID,
            },
        });
        if (!existingAward) throw new Error(`Student with ID ${studentID} does not have this award. Please check again`);

        await existingAward.destroy();
        return "Delete Award for Student Success";
    }
}

module.exports = AwardService

