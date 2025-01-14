const { where } = require('sequelize');
const Course = require('../models/course.model');
const { ROLE } = require('./access.service');
const Teacher = require('../models/teacher.model');
const Subject = require('../models/subject.model');

class SubjectService {
    static getAllSubject = async () => {
        const subjectList = await Subject.findAll();
        if (!subjectList) throw new Error("Subject list not found");
        return subjectList
    }

    static getAllSubjectCode = async () => {
        const subjectCode = await Subject.findAll({
            attributes: ['subjectCode'],
            group: ['subjectCode'],
        });
        if (!subjectCode) throw new Error("Subject code not found");
        return subjectCode
    }

    static createSubject = async ({
        subjectCode,
        subjectName,
        type,
        credit,
        description,
    }) => {
        if (!subjectCode || !subjectName || !type || !credit) {
            throw new Error("Please provide all required fields");
        };

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
}

module.exports = SubjectService;