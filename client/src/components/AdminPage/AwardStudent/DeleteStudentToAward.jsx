import React, { useState, useEffect } from "react";
import axios from "axios";

function DeleteStudentToAward({ onClose, awardId }) {
    const [formData, setFormData] = useState({ studentId: "" });
    const [students, setStudents] = useState([]);
    const [error, setError] = useState("");

    // Fetch students for the specific award on component mount
    useEffect(() => {
        const fetchAwardStudents = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/v1/api/award/get-student/${awardId}`);
                setStudents(response.data.metadata || []); // Use metadata to populate dropdown
            } catch (err) {
                console.error("Error fetching students for award:", err);
                setError("Không thể tải danh sách sinh viên liên kết với giải thưởng này.");
            }
        };

        fetchAwardStudents();
    }, [awardId]);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate fields
        if (!formData.studentId) {
            setError("Vui lòng chọn một sinh viên.");
            return;
        }

        try {
            const response = await axios.delete(
                `http://localhost:8080/v1/api/award/delete-award-for-student/${awardId}`,
                {
                    data: { studentID: formData.studentId }, // Pass the student ID in the request body
                }
            );

            if (response.status === 201) {
                alert("Xóa sinh viên thành công!");
                onClose(); // Close the modal
            } else {
                setError("Đã xảy ra lỗi. Vui lòng thử lại.");
            }
        } catch (err) {
            console.error("Error deleting student from award:", err);
            setError("Không thể xóa sinh viên.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="flex flex-col w-[50vw] bg-gray-200 p-6 rounded">
                <h2 className="text-3xl font-bold text-center mb-4 text-[#1DA599]">
                    Xóa sinh viên khỏi giải thưởng
                </h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit}>
                    {/* Student Dropdown */}
                    <div className="mb-4">
                        <label className="block mb-2 text-gray-700 font-medium">Chọn sinh viên:</label>
                        <select
                            name="studentId"
                            value={formData.studentId}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="" disabled>
                                -- Chọn một sinh viên --
                            </option>
                            {students.map((entry) => (
                                <option key={entry.studentID} value={entry.studentID}>
                                    {entry.Student.id} - {entry.Student.fullName}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 bg-white text-[#1DA599] font-bold rounded hover:bg-[#1DA599] hover:text-white border-2 border-[#1DA599]"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-400"
                        >
                            Confirm
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default DeleteStudentToAward;
