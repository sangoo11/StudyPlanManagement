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
}

module.exports = SubjectService;