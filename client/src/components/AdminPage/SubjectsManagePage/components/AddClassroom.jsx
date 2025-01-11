import React, { useState } from "react";
import axios from "axios";

function AddClassroom({ onClose }) {

    // State to manage form inputs
    const [formData, setFormData] = useState({
        name: "",
        semester: "1",
        year: "",
        teacherId: ""
    });

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
        try {
            const response = await axios.post(
                "http://localhost:8080/v1/api/course/create-new-course",
                {
                    name: formData.name,
                    semester: parseInt(formData.semester, 10),
                    year: formData.year,
                    teacherId: parseInt(formData.teacherId, 10),
                }
            );
            alert("Tạo lớp thành công!");
            console.log("Response:", response.data);
            onClose(); // Close the modal after successful submission
            window.location.reload();
        } catch (error) {
            console.error("Error creating course:", error);
            alert("Failed to create the course. Please try again.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="flex flex-col w-[50vw] h-auto bg-gray-200 p-6 rounded">
                <h2 className="flex w-full justify-center text-3xl font-bold mb-4">Thêm lớp học mới</h2>
                <form className="flex flex-col space-y-4">
                    <div>
                        <label className="block text-gray-700">Mã lớp học:</label>
                        <input
                            type="text"
                            name="classid"
                            //value={formData.name}
                            //onChange={handleChange}
                            className="w-full px-4 py-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Mã giáo viên:</label>
                        <input
                            type="number"
                            name="teacherid"
                            //value={formData.semester}
                            //onChange={handleChange}
                            className="w-full px-4 py-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Tên giáo viên:</label>
                        <input
                            type="text"
                            name="name"
                            //value={formData.year}
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

export default AddClassroom;
