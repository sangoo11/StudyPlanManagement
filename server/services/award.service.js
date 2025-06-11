const { ROLE } = require('../services/access.service');
const Course = require('../models/course.model');
const Enrollment = require('../models/enrollment.model');
const Student = require('../models/student.model');
const Award = require('../models/award.model');
const AwardStudent = require('../models/awardStudent.model');
const { normalizedPath } = require("../utils/utils");
const fs = require('fs').promises;

const getAll = async ({ studentID }) => {
    if (studentID) {
        return await Award.findAll({
            where: { studentID }
        });
    }
    return await Award.findAll();
};

const getById = async (id) => {
    return await Award.findByPk(id);
};

const create = async ({ awardNumber, awardTypeID, description, receivedAt, studentID, status, invalidReason }, image) => {
    if (!awardNumber || !awardTypeID || !receivedAt || !studentID || !image) {
        throw new Error('Please provide all required fields');
    }

    const path = image.path;
    let award;

    try {
        award = await Award.create({
            awardNumber,
            awardTypeID,
            description,
            receivedAt,
            studentID,
            status: status || 'pending',
            invalidReason,
            image: normalizedPath(path),
        });

        if (!award) {
            // If award creation fails, delete the uploaded image
            await fs.unlink(path);
            throw new Error("Award not created");
        }

        return award;
    } catch (error) {
        // If any error occurs during award creation, delete the uploaded image
        try {
            await fs.unlink(path);
        } catch (unlinkError) {
            console.error('Error deleting image file:', unlinkError);
        }
        throw error;
    }
};

const update = async (id, data) => {
    const award = await Award.findByPk(id);
    if (!award) return null;
    await award.update(data);
    return award;
};

const remove = async (id) => {
    const award = await Award.findByPk(id);
    if (!award) return null;
    await award.destroy();
    return award;
};

const getStudentByAwardId = async (awardID) => {
    if (!awardID) {
        throw new Error('awardID is required');
    }
    const award = await Award.findByPk(awardID);
    if (!award) {
        throw new Error('Award not found');
    }

    const student = await AwardStudent.findAll({
        where: {
            awardID: awardID,
        },
        include: {
            model: Student,
        },
    });
    if (student.length === 0) {
        throw new Error('Student not found');
    }

    return student;
}

const getAllAwardByStudent = async (studentID) => {
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

const addAwardForStudent = async (awardID, data) => {
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

const deleteAwardForStudent = async (awardID, { studentID }) => {
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

const getNumberAward = async (accountID) => {
    if (!accountID) {
        throw new Error('accountID is required');
    }
    const student = await Student.findOne({
        where: {
            accountID: accountID,
        },
    });
    if (!student) {
        throw new Error('Student not found');
    }

    const award = await AwardStudent.findAll({
        where: {
            studentID: student.id,
        },
    });
    return {
        studentID: student.id,
        awardCount: award.length,
    };
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
    getStudentByAwardId,
    getAllAwardByStudent,
    addAwardForStudent,
    deleteAwardForStudent,
    getNumberAward,
};

