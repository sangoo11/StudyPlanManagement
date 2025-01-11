import React, { useState } from "react";
import axios from "axios";

function EditClassroom({ course, onClose, onEditSuccess }) {
    const [formData, setFormData] = useState({
        name: course?.name || "",
        semester: course?.semester || "",
        year: course?.year || "",
        active: course?.active || false,
        teacherId: course?.teacherId || "",
    });

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
            console.log("Sending request for course ID:", course.id);
            const response = await axios.put(
                `http://localhost:8080/v1/api/course/edit-course/${course.id}`,
                formData
            );
            console.log("Course updated:", response.data);
            onEditSuccess(response.data);
            onClose();
        } catch (error) {
            console.error("Error updating course:", error.response || error);
        }
    };
    

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="flex flex-col w-[50vw] h-[80vh] bg-gray-200 p-6 rounded">
                <h2 className="flex w-full justify-center text-3xl font-bold mb-4">Chỉnh sửa lớp học</h2>
                <form className="flex flex-col space-y-4">
                    <div>
                        <label className="block text-gray-700">Năm học:</label>
                        <input
                            type="text"
                            name="name"
                            //value={formData.name}
                            //onChange={handleChange}
                            className="w-full px-4 py-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Học kỳ:</label>
                        <input
                            type="number"
                            name="semester"
                            //value={formData.semester}
                            //onChange={handleChange}
                            className="w-full px-4 py-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Mã lớp học:</label>
                        <input
                            type="text"
                            name="year"
                            //value={formData.year}
                            //onChange={handleChange}
                            className="w-full px-4 py-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Mã giáo viên:</label>
                        <input
                            type="text"
                            name="teacherId"
                            //value={formData.teacherId}
                            //onChange={handleChange}
                            className="w-full px-4 py-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Tên giáo viên:</label>
                        <input
                            type="text"
                            name="teacherId"
                            //value={formData.teacherId}
                            //onChange={handleChange}
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
