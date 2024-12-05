const { Enrollment, User, Course, Score } = require('../models')
const { sql, Op } = require('@sequelize/core');

class TeacherService {
    static grade = async ({
        studentId,
        teacherId,
        courseId,
        score,
    }) => {
        const student = await User.findOne({
            where: {
                id: studentId,
                role: 'student'
            }
        });
        if (!student) throw new Error('Student not found or student role is invalid');

        const teacher = await User.findOne({
            where: {
                id: teacherId,
                role: 'teacher'
            }
        });
        if (!teacher) throw new Error('Teacher not found or teacher role is invalid');

        const course = await Course.findOne({
            where: {
                id: courseId,
                teacherId: teacherId
            }
        });
        if (!course) throw new Error('Course not exists or teacher id is not in this course');

        const enrollment = await Enrollment.findOne({
            where: {
                courseId: courseId,
                studentId: studentId,
            }
        });
        if (!enrollment) throw new Error('Student id is not in this course');

        const studentGrades = await Score.findAll({
            where: {
                studentId: studentId,
                teacherId: teacherId,
                courseId: courseId,
            },
            attributes: ['score'],
        });

        function calculateAverage(grades) {
            if (grades.length === 0) {
                return 0;
            }
            const sum = grades.reduce(
                (acc, grade) => acc + parseFloat(grade), 0);
            return sum / grades.length;
        }

        function formatToDecimal(value, precision) {
            return value.toFixed(precision);
        }

        const grades = studentGrades.map(studentGrades => studentGrades.score);

        const finalGrade = formatToDecimal((calculateAverage(grades)), 2);

        console.log(grades, finalGrade)
        const updateFinalScore = await Enrollment.update(
            { finalGrade: finalGrade },
            {
                where: {
                    studentId: studentId,
                    courseId: courseId
                }
            }
        );
        if (!updateFinalScore) throw new Error('Update final score fail')

        const scoreAdd = await Score.create({
            score: score,
            studentId: studentId,
            teacherId: teacherId,
            courseId: courseId,
        });
        if (!scoreAdd) throw new Error('Grade student fail');


        return {
            studentId: studentId,
            teacherId: teacherId,
            courseId: courseId,
            score: score,
            finalGrade: finalGrade
        }
    }
}

module.exports = TeacherService;