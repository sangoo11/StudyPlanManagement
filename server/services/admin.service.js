const { ROLE } = require('../services/access.service');
const { Enrollment, User, Course } = require('../models');

class AdminService {
    static getAllCourse = async () => {
        const courseList = await Course.findAll();
        if (!courseList) throw new Error("Course list not found");
        return courseList
    }

    static getAllTeacher = async () => {
        const teacherList = await User.findAll({ where: { role: ROLE.TEACHER } });
        if (!teacherList) throw new Error("Teacher list not found");
        return teacherList
    }

    static getAllStudent = async () => {
        const studentList = await User.findAll({ where: { role: ROLE.STUDENT } });
        if (!studentList) throw new Error("Student list not found");
        return studentList
    }

    static enrollStudentInCourse = async ({
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

        const existingEnrollment = await Enrollment.findOne({
            where: {
                studentId,
                courseId,
                status: 'inProgress'
            },
        });
        if (existingEnrollment) throw new Error('Student is already enrolled in this course');

        const enrollment = await Enrollment.create({
            studentId,
            courseId,
            status: 'inProgress'
        });
        if (!enrollment) throw new Error('Error enrolling student');

        return {
            code: 201,
            enrollment: {
                enrollmentId: enrollment.id,
                studentEnrolled: enrollment.studentId,
                courseEnrolled: enrollment.courseId,
                status: enrollment.status
            }
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

        return {
            code: 200,
            message: 'Student successfully removed from the course',
        };
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

        return {
            code: 200,
            message: 'Teacher successfully removed from the course',
        };
    }

    static getUserById = async (userId) => {
        const user = await User.findOne({ where: { id: userId } });
        if (!user) throw new Error("User not found");
        return user;
    }

    static deleteUser = async (userId) => {
        const user = await User.findOne({ where: { id: userId } });
        if (!user) throw new Error("User not found");
        await user.destroy();
        return { message: "User deleted successfully" };
    }

    static activateUser = async (userId) => {
        const user = await User.findOne({ where: { id: userId } });
        if (!user) throw new Error("User not found");
        user.isActive = true;
        await user.save();
        return user;
    }

    static deactivateUser = async (userId) => {
        const user = await User.findOne({ where: { id: userId } });
        if (!user) throw new Error("User not found");
        user.isActive = false;
        await user.save();
        return user;
    }

}

module.exports = { AdminService }
