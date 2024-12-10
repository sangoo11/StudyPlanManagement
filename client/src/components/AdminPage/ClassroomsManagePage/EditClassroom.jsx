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
        console.log("Course ID:", course.id);
        console.log("Form Data:", formData);
        try {
            const response = await axios.put(
                `http://localhost:8080/v1/api/edit-course/${course.id}`,
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
            <div className="flex flex-col w-[50vw] h-[70vh] bg-gray-200 p-6 rounded">
                <h2 className="text-xl font-bold mb-4">Edit Course</h2>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <div>
                        <label className="block text-gray-700">Class Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Semester:</label>
                        <input
                            type="number"
                            name="semester"
                            value={formData.semester}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Year:</label>
                        <input
                            type="text"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-gray-700">Teacher ID:</label>
                        <input
                            type="text"
                            name="teacherId"
                            value={formData.teacherId}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="active"
                                checked={formData.active}
                                onChange={handleChange}
                            />
                            <span>Active</span>
                        </label>
                    </div>

                    <div className="flex space-x-4 justify-end">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-[#1DA599] text-white font-bold rounded hover:bg-green-400"
                        >
                            Xác nhận
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 bg-gray-400 text-white font-bold rounded hover:bg-gray-500"
                        >
                            Hủy
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditClassroom;
