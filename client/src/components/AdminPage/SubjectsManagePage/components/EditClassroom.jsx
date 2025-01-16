import React, { useState, useEffect } from "react";
import axios from "axios";

function EditClassroom({ courseId, onClose}) {

    const [course, setCourse] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/v1/api/course/get-course/${courseId}`);
                setCourse(response.data.metadata || []);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };

        fetchCourses();
    }, []);

    const [formData, setFormData] = useState({
        courseCode: "",
        semester: "",
        year: "",
        active: false,
        teacherID: "",
    });

    useEffect(() => {
        if (course) {
            setFormData({
                courseCode: course.courseCode || "",
                semester: course.semester || "",
                year: course.year || "",
                active: course.active || false,
                teacherID: course.teacherID || "",
            });
        }
    }, [course]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `http://localhost:8080/v1/api/course/edit-course/${courseId}`,
                formData
            );
            console.log("Course updated:", response.data);
            alert("Thay đổi thông tin thành công");
            onClose();
            window.location.reload();
        } catch (error) {
            console.error("Error updating course:", error.response || error);
        }
    };
    

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="flex flex-col w-[50vw] h-[65vh] bg-gray-200 p-6 rounded">
                <h2 className="flex w-full justify-center text-3xl font-bold mb-4">Chỉnh sửa lớp học</h2>
                <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-700">Mã lớp:</label>
                        <div className="w-full px-4 py-2 border rounded bg-white"> {formData.courseCode}</div>
                    </div>

                    <div>
                        <label className="block text-gray-700">Học kỳ:</label>
                        <input
                            type="number"
                            name="semester"
                            value={formData.semester}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Năm:</label>
                        <input
                            type="text"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Mã giáo viên:</label>
                        <input
                            type="text"
                            name="teacherID"
                            value={formData.teacherID}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded"
                        />
                    </div>

                    <div className="flex space-x-4 justify-end">
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

export default EditClassroom;
