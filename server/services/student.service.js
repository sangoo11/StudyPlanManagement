const Account = require('../models/account.model');
const Subject = require('../models/subject.model');
const Enrollment = require('../models/enrollment.model');
const Certificate = require('../models/certificate.model')
const Student = require('../models/student.model');
const sequelize = require('../configs/sequelize');
const LearningOutcomeScore = require('../models/learningOutcomeScore.model');
const LearningOutcome = require('../models/learningOutcome.model');
const { QueryTypes } = require('sequelize');

class StudentService {
    static getAllStudents = async () => {
        const students = await Student.findAll();
        return students;
    }

    static getStudentByID = async (studentID) => {
        if (!studentID) throw new Error('Missing student ID');

        const student = await Student.findOne({
            where: {
                id: studentID,
            }
        });
        if (!student) throw new Error('Student not found');

        return student;
    }

    static updateStudentByID = async (updateData, studentID) => {
        if (!updateData) throw new Error('Missing update data');
        if (!studentID) throw new Error('Missing student ID');

        const student = await Student.findOne({
            where: {
                id: studentID
            }
        });
        if (!student) throw new Error('Student not found');

        await student.update(updateData);

        return student;
    }

    static deleteStudentByID = async (studentID) => {
        if (!studentID) throw new Error('Missing student ID');

        const transaction = await sequelize.transaction();
        try {
            const student = await Student.findOne({
                where: {
                    id: studentID
                }
            });
            if (!student) throw new Error('Student not found');

            await student.update({
                status: 'terminated',
            }, {
                transaction: transaction,
            });

            const accountID = student.accountID;

            await Account.update({
                active: false,
            }, {
                where: {
                    id: accountID,
                },
                transaction: transaction,
            });

            await transaction.commit();
            return {
                studentID: studentID,
                status: student.status,
                accountID: accountID,
                active: false,
            };
        } catch (error) {
            await transaction.rollback();
            throw new Error("Delete unsucessfully", error.message);
        }
    }

    static getStudentLearningOutcomeScore = async (studentID) => {
        if (!studentID) throw new Error('Missing student ID');

        const student = await Student.findOne({
            where: {
                id: studentID,
            }
        });
        if (!student) throw new Error('Student not found');

        const learningOutcomeScore = await LearningOutcomeScore.findAll({
            where: {
                studentID: studentID,
            },
            include: {
                model: LearningOutcome,
                attributes: ['learningOutcomeCode'],
            },
        });
        if (!learningOutcomeScore) throw new Error('Learning Outcome Score not found');
        return learningOutcomeScore;
    }

    static getStudentGraduate = async (studentID) => {
        if (!studentID) throw new Error('Missing studentID');

        const student = await Student.findOne({ where: { id: studentID } });
        if (!student) throw new Error('Student not found');

        // 1. Credit check
        if (student.credit < 130) {
            return fail('Minimum credit is 130');
        }

        // 2. Certificate checks
        const certificates = await Certificate.findAll({
            where: {
                studentID,
                status: 'valid',
            }
        });

        if (certificates.length === 0) {
            return fail('Student does not have any certificates');
        }

        const requiredFLCertificates = [
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
        ];

        const hasFLCertificate = certificates.some(cert => requiredFLCertificates.includes(cert.type));
        if (!hasFLCertificate) {
            return fail('Foreign language certificate is required');
        }

        const hasNFCertificate = certificates.some(cert => cert.type === 'Chứng chỉ GDQP&AN');
        if (!hasNFCertificate) {
            return fail('GDQP&AN certificate is required');
        }

        // 3. Ongoing course check
        const enrollments = await Enrollment.findAll({
            where: {
                studentID,
                status: 'enrolled'
            }
        });
        if (enrollments.length > 0) {
            return fail('The student has not yet completed all the courses');
        }

        // 4. Subject failure check
        const result = await sequelize.query(
            `SELECT s.id AS subjectId, e.status
             FROM enrollment AS e
             INNER JOIN course AS c ON e.courseID = c.id
             INNER JOIN subject AS s ON c.subjectID = s.id
             WHERE e.studentID = :studentID`,
            {
                replacements: { studentID },
                type: QueryTypes.SELECT
            }
        );

        const unpassedSubjects = getUnpassedSubjects(result);
        if (unpassedSubjects.length > 0) {
            return fail('The student still has failed subject(s)', unpassedSubjects);
        }

        // 5. Final result
        return {
            status: 'pass',
            message: 'Student meets all graduation requirements'
        };
    };

}

// Helper: check subject pass/fail logic
function getUnpassedSubjects(results) {
    const subjectStatusMap = new Map();

    for (const { subjectId, status } of results) {
        if (!subjectStatusMap.has(subjectId)) {
            subjectStatusMap.set(subjectId, []);
        }
        subjectStatusMap.get(subjectId).push(status);
    }

    return Array.from(subjectStatusMap.entries())
        .filter(([_, statuses]) => !statuses.includes('pass'))
        .map(([subjectId]) => subjectId);
}

// Helper: fail response
function fail(reason, data = null) {
    const response = {
        status: 'fail',
        reason
    };
    if (data) response.data = data;
    return response;
}


module.exports = StudentService;