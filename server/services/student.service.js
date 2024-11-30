class StudentService {
    static getStudentList = async () => {
        const studentList = await Student.findAll()

        if (!studentList) {
            return {
                throw: new Error("Student list not found")
            }
        }
        return studentList
    }
}

module.exports = StudentService;