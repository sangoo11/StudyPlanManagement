const { where } = require('sequelize');
const Course = require('../models/course.model');
const { ROLE } = require('./access.service');
const Teacher = require('../models/teacher.model');
const Subject = require('../models/subject.model');
const sequelize = require('../configs/sequelize');
const Student = require('../models/student.model');
const Enrollment = require('../models/enrollment.model');
const LearningOutcome = require('../models/learningOutcome.model');
const LearningOutcomeScore = require('../models/learningOutcomeScore.model');

class SubjectService {
    static getAllSubject = async () => {
        const subjectList = await Subject.findAll();
        if (!subjectList) throw new Error("Subject list not found");
        return subjectList
    }

    static getSubjectById = async (subjectId) => {
        const subject = await Subject.findByPk(subjectId);
        if (!subject) throw new Error('Subject not found');

        return subject
    }

    static getAllSubjectCode = async () => {
        const subjects = await Subject.findAll({
            attributes: ['id', 'subjectCode'], // Include subjectID in the attributes
            group: ['id', 'subjectCode'],     // Group by both subjectID and subjectCode
        });
        if (!subjects || subjects.length === 0) {
            throw new Error("No subjects found");
        }
        return subjects;
    };

    static createSubject = async (majorID, {
        subjectCode,
        subjectName,
        type,
        credit,
        description,
    }) => {
        if (!subjectCode || !subjectName || !type || !credit || !majorID) {
            throw new Error("Please provide all required fields");
        };

        const majorExists = await Course.findByPk(majorID);
        if (!majorExists) {
            throw new Error("Major not found");
        }

        // Validate subject code format
        const subjectCodeRegex = /^[A-Z]{2,4}\d{3}$/;
        if (!subjectCodeRegex.test(subjectCode)) {
            throw new Error("Invalid subject code format");
        };
        const subjectCodeExists = await Subject.findOne({
            where: { subjectCode }
        });
        if (subjectCodeExists) {
            throw new Error("Subject code already exists");
        }

        // Validate credit
        if (credit < 1 || credit > 15) {
            throw new Error("Credit must be between 1 and 15");
        };

        // Validate type
        if (type !== 'major' && type !== 'core') {
            throw new Error("Invalid subject type");
        };

        const subject = await Subject.create({
            subjectCode,
            subjectName,
            type,
            credit,
            description,
        });
        if (!subject) throw new Error("Subject not created");
        return subject
    }

    static editSubject = async (subjectID, {
        subjectName,
        type,
        credit,
        description
    }) => {
        const subject = await Subject.findOne({
            where: { id: subjectID }
        });
        if (!subject) throw new Error("Subject not found");

        // Validate credit
        if (credit < 1 || credit > 15) {
            throw new Error("Credit must be between 1 and 15");
        };

        // Validate type
        if (type !== 'major' && type !== 'core') {
            throw new Error("Invalid subject type");
        };

        const updatedSubject = await subject.update({
            subjectName,
            type,
            credit,
            description,
        });
        if (!updatedSubject) throw new Error("Subject not updated");
        return updatedSubject
    }

    static deleteSubject = async (subjectID) => {
        const subject = await Subject.findOne({
            where: { id: subjectID }
        });
        if (!subject) throw new Error("Subject not found");

        subject.update({
            active: false
        });
        return subject
    }

    static getAllSubjectFactor = async () => {
        const result = await sequelize.query(
            `SELECT subject.id, subject.subjectName, subject.subjectCode, subject.type, modification.value as factor
            FROM subject
            INNER JOIN modification ON subject.type = modification.key`,
            { type: sequelize.QueryTypes.SELECT }
        );
        if (!result) throw new Error("No subject factors found");
        return result
    }

    static getSubjectInLOByStudentID = async (studentID) => {
        // Check if student exists
        if (!studentID) throw new Error("Please provide student ID");
        const student = await Student.findByPk(studentID);
        if (!student) throw new Error("Student not found");

        const allLearningOutcomes = await LearningOutcome.findAll({
            attributes: ['id']
        });
        let subjectList = [];
        // console.log(JSON.stringify(allLearningOutcomes));
        for (let i = 0; i < allLearningOutcomes.length; i++) {
            const learningOutcome = allLearningOutcomes[i];
            console.log(learningOutcome.id);
            const result = await sequelize.query(
                `SELECT subject.id, subject.subjectName, enrollment.finalGrade as score, subjectlearningoutcome.level as level, enrollment.status as status, learningoutcome.id as loID
                FROM enrollment
                INNER JOIN course ON enrollment.courseID = course.id
                INNER JOIN subject ON course.subjectID = subject.id
                INNER JOIN subjectlearningoutcome ON subject.id = subjectlearningoutcome.subjectID
                INNER JOIN learningoutcome ON subjectlearningoutcome.learningoutcomeID = learningoutcome.id
                WHERE learningOutcome.id = ${learningOutcome.id} AND enrollment.studentID = ${studentID}`,
                { type: sequelize.QueryTypes.SELECT }
            );
            if (result.length > 0) {
                subjectList.push({
                    learningOutcomeId: learningOutcome.id,
                    subjects: result
                });
            }
        }
        return subjectList;
    }
}

module.exports = SubjectService;