const { ROLE } = require('../services/access.service');
const Course = require('../models/course.model');
const Enrollment = require('../models/enrollment.model');
const Student = require('../models/student.model');

class AdminService {
    static enrollStudentInCourse = async ({
        studentId,
        courseId,
    }) => {
        if (!studentId || !courseId) throw new Error('StudentId and courseId are required');

        const student = await Student.findByPk({
            where: {
                id: studentId,
            }
        });
        if (!student) throw new Error('Student not found');

        const course = await Course.findByPk(courseId);
        if (!course) throw new Error('Course not found');

        const enrollment = await Enrollment.findOrCreate({
            where: {
                studentId,
                courseId,
                comepleted: false,
            },
        });
        if (!enrollment) throw new Error('Error enrolling student');

        return {
            enrollmentID: enrollment.id,
            studentId: enrollment.studentId,
            courseId: enrollment.courseId,
            comepleted: enrollment.comepleted,
        }

    }

    static enrollTeacherInCourse = async ({
        teacherId,
        courseId,
    }) => {
        const teacher = await User.findOne({
            where: {
                id: teacherId,
                role: ROLE.TEACHER
            }
        })
        if (!teacher) throw new Error('Teacher not found or teacher role is invalid')

        const course = await Course.findByPk(courseId);
        if (!course) throw new Error('Course not found');

        const existingTeacher = await Course.findOne({
            where: {
                id: courseId,
                teacherId: null,
            },
        });
        if (!existingTeacher) throw new Error('Teacher is already enrolled in this course');

        const courseUpdate = await Course.update(
            { teacherId: teacherId },
            { where: { id: courseId } }
        );
        if (!courseUpdate) throw new Error('Error enrolling teacher');

        const courseUpdated = await Course.findOne({ where: { id: courseId } }
        );


        return {
            code: 201,
            enrollment: {
                courseId: courseUpdated.id,
                teacherEnrolled: courseUpdated.teacherId,
            }
        }
    }

    static deleteStudentFromCourse = async ({
        studentId,
        courseId,
    }) => {
        const student = await User.findOne({
            where: {
                id: studentId,
                role: ROLE.STUDENT,
            }
        });
        if (!student) throw new Error('Student not found or student role is invalid');

        const course = await Course.findByPk(courseId);
        if (!course) throw new Error('Course not found');

        const enrollment = await Enrollment.findOne({
            where: {
                studentId,
                courseId,
                // status: 'inProgress',
            },
        });
        if (!enrollment) throw new Error('No active enrollment found for this student in the course');

        const deletedEnrollment = await enrollment.destroy();
        if (!deletedEnrollment) throw new Error('Error deleting enrollment');

        return 'Student successfully removed from the course'
    }

    static deleteTeacherFromCourse = async ({
        teacherId,
        courseId,
    }) => {
        const teacher = await User.findOne({
            where: {
                id: teacherId,
                role: ROLE.TEACHER,
            }
        });
        if (!teacher) throw new Error('Teacher not found or teacher role is invalid');

        const course = await Course.findByPk(courseId);
        if (!course) throw new Error('Course not found');

        if (course.teacherId != parseInt(teacherId)) {
            throw new Error('Teacher is not assigned to this course');
        }

        const courseUpdate = await Course.update(
            { teacherId: null },
            { where: { id: courseId } }
        );
        if (!courseUpdate[0]) throw new Error('Error removing teacher from course');

        return 'Teacher successfully removed from the course'
    }

    static getUserById = async (userId) => {
        const user = await User.findOne({ where: { id: userId } });
        if (!user) throw new Error("User not found");
        return {
            code: 201,
            user: user
        };
    }

    static deleteUser = async (userId) => {
        const user = await User.findOne({
            where: {
                id: userId
            }
        });
        if (!user) throw new Error("User not found");
        await user.destroy();
        return { message: "User deleted successfully" };
    }
}

module.exports = { AdminService }

