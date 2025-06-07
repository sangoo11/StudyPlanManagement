const Account = require('../models/account.model');
const Course = require('../models/course.model');
const Enrollment = require('../models/enrollment.model');
const Student = require('../models/student.model');
const Teacher = require('../models/teacher.model');
const Subject = require('../models/subject.model');
const Major = require('../models/major.model');
const sequelize = require('../configs/sequelize');
const {ROLE} = require('./access.service');

class MajorService {
    static getMajors = async ({fields}) => {
        let attributes = ['id']

        if (fields) {
            fields = fields.split(',')
            attributes = [...attributes, ...fields]
        }

        const majorLists = await Major.findAll({
            attributes: fields ? attributes : null,
        });
        return majorLists;
    }

    static getMajorByID = async (majorID) => {
        if (!majorID) throw new Error('Major ID is required');
        const currentMajor = await Major.findByPk(majorID);
        if (!currentMajor) throw new Error('Major not found');
        return currentMajor;
    }

}

module.exports = MajorService;