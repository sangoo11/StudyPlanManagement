import React, { useState } from "react";
import axios from "axios";

function AddSubject({ onClose, onAddedSubject }) {
    const [formData, setFormData] = useState({
        subjectCode: "",
        subjectName: "",
        type: "core", // Default value
        credit: "",
        majorID: "",
    });

    const [error, setError] = useState("");

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

        const { subjectCode, subjectName, type, credit, majorID} = formData;

        // Validate fields
        if (!subjectCode || !subjectName || !type || !credit) {
            setError("Vui lòng điền đầy đủ thông tin.");
            return;
        }
        try {
            const response = await axios.post(
                `http://localhost:8080/v1/api/subject/create-new-subject/${majorID}`,
                {
                    subjectCode,
                    subjectName,
                    type,
                    credit,
                }
            );

            if (response.status === 201) {
                alert("Môn học mới đã được thêm thành công!");
                if (onAddedSubject) {
                    onAddedSubject();
                }
                onClose(); // Close the modal
            } else {
                setError("Có lỗi xảy ra. Vui lòng thử lại.");
            }
        } catch (err) {
            console.error("Error creating subject:", err);
            setError("Không thể thêm môn học. Vui lòng kiểm tra kết nối.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="flex flex-col w-[50vw] bg-gray-200 p-6 rounded">
                <h2 className="text-3xl font-bold text-center mb-4">Thêm môn học mới</h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                    {/* Subject Code */}
                    <div>
                        <label className="block text-gray-700">Mã môn học:</label>
                        <input
                            type="text"
                            name="subjectCode"
                            value={formData.subjectCode}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded"
                            placeholder="Nhập mã môn học"
                        />
                    </div>

                    {/* Subject Name */}
                    <div>
                        <label className="block text-gray-700">Tên môn học:</label>
                        <input
                            type="text"
                            name="subjectName"
                            value={formData.subjectName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded"
                            placeholder="Nhập tên môn học"
                        />
                    </div>

                    {/* Credit */}
                    <div>
                        <label className="block text-gray-700">Số tín chỉ:</label>
                        <input
                            type="number"
                            name="credit"
                            value={formData.credit}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded"
                            placeholder="Nhập số tín chỉ"
                        />
                    </div>

                    {/* Type */}
                    <div>
                        <label className="block text-gray-700">Loại môn học:</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded bg-white"
                        >
                            <option value="major">Chuyên ngành</option>
                            <option value="core">Cơ sở ngành</option>
                        </select>
                    </div>

                    {/* Major ID */}
                    <div>
                        <label className="block text-gray-700">Mã chuyên ngành:</label>
                        <input
                            type="number"
                            name="majorID"
                            value={formData.majorID}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded"
                            placeholder="Nhập mã chuyên ngành"
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

export default AddSubject;
