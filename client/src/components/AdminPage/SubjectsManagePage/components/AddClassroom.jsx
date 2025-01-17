import React, { useState, useEffect } from "react";
import axios from "axios";

function AddClassroom({ onClose, subjectID }) {
    // State to manage form inputs
    const [formData, setFormData] = useState({
        courseCode: "",
        semester: "1",
        year: "",
        teacherId: "",
    });

    // State to manage teacher data
    const [teachers, setTeachers] = useState([]);

    // Fetch teacher data when component mounts
    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await axios.get("http://localhost:8080/v1/api/teacher/get-all-teacher");
                setTeachers(response.data.metadata || []);
            } catch (error) {
                console.error("Error fetching teachers:", error);
            }
        };

        fetchTeachers();
    }, []);

    const [error, setError] = useState("");

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload

        const { courseCode, semester, year, teacherId } = formData;

        // Validate fields
        if (!courseCode || !semester || !year || !teacherId) {
            setError("Vui lòng điền đầy đủ thông tin.");
            return;
        }
        console.log(subjectID);

        try {
            const response = await axios.post(
                `http://localhost:8080/v1/api/course/create-new-course/${subjectID}`,
                {
                    courseCode,
                    semester: parseInt(semester, 10),
                    year,
                    teacherId: parseInt(teacherId, 10),
                }
            );
            const coursesResponse = await axios.get("http://localhost:8080/v1/api/course/get-all-courses");
            const courses = coursesResponse.data.metadata;

            // Find the course with the given courseCode
            const course = courses.find((c) => c.courseCode === courseCode);

            if (!course) {
                setError("Không tìm thấy mã lớp học.");
                return;
            }

            // Enroll the teacher to the course
            const enrollResponse = await axios.post(
                `http://localhost:8080/v1/api/enrollment/enroll-teacher/${course.id}`,
                { teacherID: parseInt(teacherId, 10) }
            );

            alert("Tạo lớp thành công!");
            console.log("Response:", response.data);
            onClose(); // Close the modal after successful submission
            window.location.reload();
        } catch (err) {
            console.error("Error creating course:", err);
            setError("Không thể tạo lớp học. Vui lòng thử lại.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="flex flex-col w-[50vw] h-auto bg-gray-200 p-6 rounded">
                <h2 className="text-3xl font-bold text-center mb-4">Thêm lớp học mới</h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                    {/* Course Code */}
                    <div>
                        <label className="block text-gray-700">Mã lớp học:</label>
                        <input
                            type="text"
                            name="courseCode"
                            value={formData.courseCode}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded"
                            placeholder="Nhập mã lớp học"
                        />
                    </div>

                    {/* Teacher ID */}
                    <div>
                        <label className="block text-gray-700">Giáo viên:</label>
                        <select
                            name="teacherId"
                            value={formData.teacherId}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded"
                        >
                            <option value="">Chọn giáo viên</option>
                            {teachers.map((teacher) => (
                                <option key={teacher.id} value={teacher.id}>
                                    {teacher.id} - {teacher.fullName}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Semester */}
                    <div>
                        <label className="block text-gray-700">Học kỳ:</label>
                        <select
                            name="semester"
                            value={formData.semester}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded bg-white"
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </select>
                    </div>

                    {/* Year */}
                    <div>
                        <label className="block text-gray-700">Năm học:</label>
                        <input
                            type="text"
                            name="year"
                            value={formData.year}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded"
                            placeholder="Nhập năm học (vd: 2023-2024)"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 bg-white text-[#1DA599] font-bold rounded hover:bg-[#1DA599] hover:text-white border-2 border-[#1DA599]"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-[#1DA599] text-white font-bold rounded hover:bg-green-400"
                        >
                            Xác nhận
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddClassroom;
