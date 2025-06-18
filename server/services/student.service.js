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
        // Check student existence only if studentID is provided
        if (studentID) {
            const student = await Student.findOne({
                where: { id: studentID }
            });

            if (!student) throw new Error('Student not found');
        }

        // Build query condition for LearningOutcomeScore
        const whereConditions = {};
        if (studentID) {
            whereConditions.studentID = studentID;
        }

        const learningOutcomeScores = await LearningOutcomeScore.findAll({
            where: whereConditions,
            attributes: ['id', 'studentID', 'highestLevel', 'learningOutcomeID'],
            include: {
                model: LearningOutcome,

                attributes: ['learningOutcomeCode'],
            },
        });

        if (!learningOutcomeScores || learningOutcomeScores.length === 0) {
            throw new Error('Learning Outcome Scores not found');
        }

        return learningOutcomeScores;
    }

    static getStudentGraduate = async (studentID) => {
        if (!studentID) throw new Error('Missing studentID');

        const checklist = {
            minCredit: false,
            foreignLanguage: false,
            GDANQPCertificate: false,
            allCoursesCompleted: false,
            allSubjectsPassed: false,
        };

        const student = await Student.findOne({ where: { id: studentID } });
        if (!student) throw new Error('Student not found');

        // 1. Credit
        if (student.credit >= 130) {
            checklist.minCredit = true;
        }

        // 2. Certificates
        const certificates = await Certificate.findAll({
            where: { studentID, status: 'valid' }
        });

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

        const hasFLCertificate = certificates.some(cert =>
            requiredFLCertificates.includes(cert.type)
        );
        const hasGDNQPCertificate = certificates.some(cert =>
            cert.type === 'Chứng chỉ GDQP&AN'
        );

        if (hasFLCertificate) checklist.foreignLanguage = true;
        if (hasGDNQPCertificate) checklist.GDANQPCertificate = true;

        // 3. No active (enrolled) course
        const enrollments = await Enrollment.findAll({
            where: { studentID, status: 'enrolled' }
        });
        if (enrollments.length === 0) checklist.allCoursesCompleted = true;

        // 4. Subject pass/fail
        const subjectResults = await sequelize.query(
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

        const unpassedSubjects = getUnpassedSubjects(subjectResults);
        if (unpassedSubjects.length === 0) checklist.allSubjectsPassed = true;

        // Final decision
        const allPassed = Object.values(checklist).every(v => v === true);

        return allPassed
            ? {
                status: 'pass',
                result: checklist,
                message: 'Student meets all graduation requirements'
            }
            : {
                status: 'fail',
                result: checklist,
                reason: getFirstFailReason(checklist)
            };
    };

}

// Helper: Subject fail logic
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

// Helper: First failed reason message
function getFirstFailReason(checklist) {
    if (!checklist.minCredit) return 'Minimum credit is 130';
    if (!checklist.foreignLanguage) return 'Foreign language certificate is required';
    if (!checklist.GDANQPCertificate) return 'GDQP&AN certificate is required';
    if (!checklist.allCoursesCompleted) return 'The student has not yet completed all the courses';
    if (!checklist.allSubjectsPassed) return 'The student still has failed subject(s)';
    return 'Unknown failure';
}


module.exports = StudentService;