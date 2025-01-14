import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function EditTeacher({ onClose, teacherData }) {
    const [formData, setFormData] = useState({
        fullName: teacherData?.fullName || "",
        year: teacherData?.year || "",
        major: teacherData?.major || "",
        status: teacherData?.status || "",  // Default status
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `http://localhost:8080/v1/api/teacher/update-teacher/${teacherData.id}`,
                formData
            );
            toast.success("teacher updated successfully!");
            console.log("teacher updated successfully:", response.data);
            onClose();
        } catch (error) {
            toast.error("Failed to update teacher.");
            console.error("Error updating teacher:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="flex flex-col w-[50vw] h-auto bg-gray-200 p-6 rounded">
                <h2 className="flex w-full justify-center text-3xl font-bold mb-4">Chỉnh sửa giáo viên</h2>
                <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-700">Họ và tên:</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Chuyên ngành:</label>
                        <input
                            type="text"
                            name="major"
                            value={formData.major}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded"
                        />
                    </div>

                    {/* Status Radio Buttons */}
                    <div>
                        <label className="block text-gray-700">Tình trạng:</label>
                        <div className="flex space-x-4">
                            <div>
                                <input
                                    type="radio"
                                    name="status"
                                    value="Active"
                                    checked={formData.status === "Active"}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                <label>Active</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    name="status"
                                    value="Terminated"
                                    checked={formData.status === "Terminated"}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                <label>Terminated</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    name="status"
                                    value="On leave"
                                    checked={formData.status === "On leave"}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                <label>On leave</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    name="status"
                                    value="Suspended"
                                    checked={formData.status === "Suspended"}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                <label>Suspended</label>
                            </div>
                        </div>
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

export default EditTeacher;
