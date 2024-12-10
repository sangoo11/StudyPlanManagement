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
            <div className="flex flex-col w-[50vw] h-[75vh] bg-gray-200 items-center">
                <div className="flex w-full items-center justify-between px-4">
                    {/* Close Button */}
                    <div className="flex w-[8vw] items-center justify-center bg-red-500 hover:border-4 hover:border-yellow-400 hover:text-gray-700 text-white py-2 rounded transition">
                        <button
                            onClick={onClose}
                            className="text-lg font-bold"
                        >
                            Đóng
                        </button>
                    </div>

                    {/* Centered Title */}
                    <h1 className="text-4xl text-[#1DA599] font-bold flex-1 text-center mt-[4vh] mr-[8vw]">LỚP HỌC MỚI</h1>
                </div>

                <form
                    className="flex flex-col w-full h-[50vw] mt-[2vh] items-center justify-center"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col items-center justify-center space-y-2 mb-[2vh]">
                        <label className="text-xl font-bold">Mã lớp học</label>
                        <input
                            className="border-2 border-black p-2"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col items-center space-y-2 mb-[2vh]">
                        <label className="text-xl font-bold">Học kỳ</label>
                        <select
                            className="border-2 border-black p-2 w-[13vw]"
                            name="semester"
                            value={formData.semester}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </select>
                    </div>
                    <div className="flex flex-col items-center space-y-2 mb-[2vh]">
                        <label className="text-xl font-bold">Năm</label>
                        <input
                            className="border-2 border-black p-2"
                            type="text"
                            name="year"
                            value={formData.year}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col items-center space-y-2 mb-[2vh]">
                        <label className="text-xl font-bold">Mã giáo viên</label>
                        <input
                            className="border-2 border-black p-2"
                            type="number"
                            name="teacherId"
                            value={formData.teacherId}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="flex w-full h-full items-end justify-end mr-[4vw] rounded-full mb-[6vh]">
                        <button
                            type="submit"
                            className="w-[8vw] text-lg font-bold bg-[#1DA599] hover:border-4 hover:border-yellow-400 hover:text-gray-700 text-white py-2 rounded transition mr-[4vw]"
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
