const Account = require('../models/account.model');
const Subject = require('../models/subject.model');
const Enrollment = require('../models/enrollment.model');
const { sql, Op } = require('@sequelize/core');
const Student = require('../models/student.model');
const sequelize = require('../configs/sequelize');
const Course = require('../models/course.model');
const Teacher = require('../models/teacher.model');
const Score = require('../models/score.model');
const LearningOutcome = require('../models/learningOutcome.model');
const LearningOutcomeScore = require('../models/learningOutcomeScore.model');
const Modification = require('../models/modification.model');
const SubjectLearningOutcome = require('../models/subjectLearningOutcome.model');
const axios = require('axios');
const { QueryTypes } = require('sequelize');

class ScoreService {
    static gradeScore = async (studentID, {
        courseID,
        teacherID,
        score,
    }) => {
        // Input Validation
        if (!courseID || !teacherID || !studentID) {
            throw new Error('Missing required fields: courseID, teacherID, or studentID');
        }

        if (!Array.isArray(score) || score.length > 3 || score.length < 1) {
            throw new Error('Score must be an array with 1-3 elements');
        }

        const validScoreTypes = ['progress', 'midterm', 'final'];
        score.forEach((s, index) => {
            if (!s.scoreType || typeof s.score !== 'number') {
                throw new Error(`Invalid score data at index ${index}`);
            }
            if (s.score < 0 || s.score > 10) {
                throw new Error(`Score must be between 0 and 10 at index ${index}`);
            }
            if (!validScoreTypes.includes(s.scoreType)) {
                throw new Error(`Invalid score type at index ${index}. Must be one of: ${validScoreTypes.join(', ')}`);
            }
        });

        // Entity validation
        const [student, course, teacher] = await Promise.all([
            Student.findByPk(studentID),
            Course.findByPk(courseID),
            Teacher.findByPk(teacherID)
        ]);

        if (!student || student.status !== 'active') {
            throw new Error('Student not found or inactive');
        }

        if (!course || !course.active) {
            throw new Error('Course not found or inactive');
        }

        if (!teacher || teacher.status !== 'active') {
            throw new Error('Teacher not found or inactive');
        }

        if (course.teacherID !== teacherID) {
            throw new Error('Teacher is not assigned to this course');
        }

        const subject = await Subject.findByPk(course.subjectID);
        if (!subject || !subject.active) {
            throw new Error('Subject not found or inactive');
        }

        const enrollment = await Enrollment.findOne({
            where: {
                studentID,
                courseID,
                completed: false,
            }
        });
        if (!enrollment) {
            throw new Error('Enrollment not found or student has completed the course');
        }


        // Update to Score Model
        try {
            for (let i = 0; i < score.length; i++) {
                const currentScore = await Score.findOne({
                    where: {
                        enrollmentID: enrollment.id,
                        scoreType: score[i].scoreType,
                    },
                });
                if (currentScore) {
                    await Score.update({
                        score: score[i].score,
                    }, {
                        where: {
                            enrollmentID: enrollment.id,
                            scoreType: score[i].scoreType,
                        },
                    });
                }
                else {
                    await Score.create({
                        score: score[i].score,
                        scoreType: score[i].scoreType,
                        enrollmentID: enrollment.id,
                        teacherID,
                    });
                }
            }

            // Calculate final score            
            const factors = await Modification.findAll({
                where: {
                    key: {
                        [Op.in]: ['progress', 'midterm', 'final']
                    }
                }
            });

            if (factors.length !== 3) {
                throw new Error('Factors not found');
            }

            const existingScores = await Score.findAll({
                where: {
                    enrollmentID: enrollment.id,
                    scoreType: {
                        [Op.in]: ['progress', 'midterm', 'final']
                    }
                }
            });

            if (existingScores.length === 3) {
                await enrollment.update({
                    completed: true,
                });

                const finalScore = existingScores.reduce((acc, s) => {
                    const factor = factors.find(f => f.key === s.scoreType);
                    return acc + s.score * factor.value;
                }, 0);

                await enrollment.update({
                    finalGrade: finalScore,
                });

                // Calculate learning outcome score
                const learningOutcomeObject = await SubjectLearningOutcome.findAll({
                    where: {
                        subjectID: subject.id,
                    },
                    attributes: ['learningOutcomeID'],
                }
                );
                if (learningOutcomeObject.length === 0) {
                    console.log('No learning outcome found');
                } else {
                    const learningOutcomeScoreFactor = await Modification.findAll({
                        where: {
                            key: {
                                [Op.in]: ['major', 'core']
                            }

                        }
                    });

                    if (learningOutcomeScoreFactor.length !== 2) {
                        throw new Error('Learning outcome score factor not found');
                    }

                    const learningOutcomeIDs = learningOutcomeObject.map(learningOutcome => learningOutcome.learningOutcomeID);

                    for (let i = 0; i < learningOutcomeIDs.length; i++) {
                        const learningOutcome = await LearningOutcome.findByPk(learningOutcomeIDs[i]);
                        if (!learningOutcome) {
                            throw new Error('Learning outcome not found');
                        }
                        // Output: LearningOutcome object

                        const learningOutcomeScores = await LearningOutcomeScore.findOne({
                            where: {
                                learningOutcomeID: learningOutcome.id,
                                studentID,
                            }
                        });
                        // Output: LearningOutcomeScore object

                        if (!learningOutcomeScores) {
                            // Create new learning outcome score
                            const newLearningOutcomeScore = await LearningOutcomeScore.create({
                                learningOutcomeID: learningOutcome.id,
                                studentID,
                                score: finalScore,
                            });
                            if (!newLearningOutcomeScore) {
                                throw new Error('Error creating learning outcome score');
                            }
                        } else {
                            // Update existing learning outcome score
                            // lay danh sach enrollemnt completed cua student (enrollment)
                            const result = await sequelize.query(
                                `SELECT enrollment.finalGrade as score, learningoutcomescore.learningoutcomeID, course.id as courseID, subject.type as subjectType, modification.value as factor
                                 FROM enrollment
                                 INNER JOIN course ON enrollment.courseID = course.id
                                 INNER JOIN subject ON course.subjectID = subject.id
                                 INNER JOIN subjectlearningoutcome ON subject.id = subjectlearningoutcome.subjectID
                                 INNER JOIN learningoutcome ON subjectlearningoutcome.learningoutcomeID = learningoutcome.id
                                 INNER JOIN learningoutcomescore ON learningoutcome.id = learningoutcomescore.learningoutcomeID
                                 INNER JOIN modification ON modification.key = subject.type
                                 WHERE enrollment.studentID = ${studentID} AND learningoutcome.id = ${learningOutcome.id} AND enrollment.completed = true          
                                 ;`,
                                { type: QueryTypes.SELECT } // This will return an array of results
                            );
                            console.log(result);
                            if (result.length === 0) {
                                throw new Error('No result found');
                            }
                            const factorSum = result.reduce((acc, s) => acc + parseFloat(s.factor), 0);
                            const averageScore = result.reduce((acc, s) => {
                                console.log(s.score, s.factor);
                                return acc + s.score * parseFloat(s.factor);
                            }, 0) / factorSum;
                            console.log(averageScore);
                            console.log(factorSum);

                            await LearningOutcomeScore.update({
                                score: averageScore,
                            }, {
                                where: {
                                    learningOutcomeID: learningOutcome.id,
                                    studentID,
                                }
                            });
                        }
                    }

                }
            }
        } catch (error) {
            console.log(error);
            throw new Error('Error grading score', error);
        }

    }

    static getStudentScoreByID = async (studentID, { courseID }) => {
        if (!studentID) {
            throw new Error('Missing student ID');
        }
        const student = await Student.findByPk(studentID);
        if (!student) {
            throw new Error('Student not found');
        }

        if (!courseID) {
            throw new Error('Missing course ID');
        }
        const course = await Course.findByPk(courseID);
        if (!course) {
            throw new Error('Course not found');
        }

        const enrollment = await Enrollment.findOne({
            where: {
                studentID,
                courseID,
            }
        });
        if (!enrollment) {
            throw new Error('Enrollment not found');
        }

        const scores = await Score.findAll({
            where: {
                enrollmentID: enrollment.id,
            },
            attributes: ['scoreType', 'score'],
        });
        console.log(JSON.stringify(scores));


        return {
            courseID: courseID,
            teacherID: course.teacherID,
            scores: scores.map(s => ({
                scoreType: s.scoreType,
                score: s.score,
            }))
        };
    }
}

module.exports = ScoreService;