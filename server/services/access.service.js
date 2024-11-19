import bycrypt from 'bcrypt'
import Student from '../models/student.model'
import Teacher from '../models/teacher.model'
import Admin from '../models/admin.model'
import Account from '../models/account.model'
import { AuthFailureError } from '../core/error.response'
import { getInfoData } from '../utils'

const RoleUser = {
    STUDENT: "student",
    TEACHER: "teacher",
    ADMIN: "admin",
};

class StudentAccessService {
    static signUp = async ({
        username,
        password,
        email,
        fullname,
        phone_number,
        role,
    }) => {
        //find student email exits or not
        const holderStudent = await Account.findOne({ where: { email: email } });
        if (holderStudent) {
            throw new Error("Email already exists");
        }

        //hash password
        const passwordHash = await bycrypt.hash(password, 10);

        //create new student
        const newStudent = await Student.create({
            fullname,
            phone_number,
            email,
            major_id: 'CNPM',
            birth: '1/1/2006',
            date_begin: '1/1/2006',
        })

        //check student is created or not
        if (!newStudent) {
            throw new AuthFailureError("Student not created")
        }

        //create new account 
        const newStudentAccount = await Account.create({
            username,
            email,
            password: passwordHash,
            accountableId: newStudent.id,
            accountableType: RoleUser.STUDENT,
        })

        //check student account create or not
        if (!newStudentAccount) {
            throw new AuthFailureError("Account not created");
        }

        return {
            code: 201,
            metadata: {

            }
        }


    }
    static signIn
}

class TeacherAccessService {
    static signUp
    static signIn
}

class AdminAccessService {
    static signIn
}

module.exports = { StudentAccessService, TeacherAccessService, AdminAccessService }

