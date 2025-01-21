import React, { useState } from "react";
import axios from "axios";

function AddAward({ onClose }) {
    const [formData, setFormData] = useState({
        awardName: "",
        awardType: "",
        description: "",
        criteria: "",
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
        const { awardName, awardType, description, criteria } = formData;

        // Validate fields
        if (!awardName || !awardType || !description || !criteria) {
            setError("Please fill out all fields.");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8080/v1/api/award/create-award",
                {
                    awardName,
                    awardType,
                    description,
                    criteria,
                }
            );

            if (response.status === 201) {
                alert("Thêm giải thưởng thành công!");
                onClose(); // Close the modal
            } else {
                setError("Đã xảy ra lỗi. Vui lòng thử lại.");
            }
        } catch (err) {
            console.error("Error creating award:", err);
            setError("Không thể thêm phần thưởng.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="flex flex-col w-[50vw] bg-gray-200 p-6 rounded">
                <h2 className="text-3xl font-bold text-center mb-4 text-[#1DA599]">Thêm giải thưởng mới</h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="awardName"><strong className="text-[#1DA599]">Tên giải thưởng</strong></label>
                        <input
                            type="text"
                            id="awardName"
                            name="awardName"
                            value={formData.awardName}
                            onChange={handleChange}
                            className="p-2 border rounded ml-4 w-[20vw] "
                            placeholder="Tên giải thưởng"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="awardType"><strong className="text-[#1DA599]">Loại giải thưởng</strong></label>
                        <select
                            id="awardType"
                            name="awardType"
                            value={formData.awardType}
                            onChange={handleChange}
                            className="p-2 border rounded ml-3 w-[20vw]"
                            required
                        >
                            <option value="">Chọn loại giải thưởng</option>
                            <option value="university">University</option>
                            <option value="city">City</option>
                            <option value="country">Country</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="year"><strong className="text-[#1DA599]">Năm</strong></label>
                        <input
                            type="number"
                            id="year"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            className="p-2 border rounded ml-[6.8vw] w-[20vw]"
                            placeholder="Năm"
                            required
                        />
                    </div>
                    <div className="flex form-group items-center">
                        <label htmlFor="description"><strong className="text-[#1DA599]">Mô tả</strong></label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="p-2 border rounded ml-[6.1vw] w-[20vw]"
                            placeholder="Mô tả"
                            required
                        ></textarea>
                    </div>
                    <div className="flex form-group items-center">
                        <label htmlFor="criteria"><strong className="text-[#1DA599]">Tiêu chuẩn</strong></label>
                        <textarea
                            id="criteria"
                            name="criteria"
                            value={formData.criteria}
                            onChange={handleChange}
                            className="p-2 border rounded ml-[3.8vw] w-[20vw]"
                            placeholder="Tiêu chuẩn"
                            required
                        ></textarea>
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
                            className="px-6 py-2 bg-[#1DA599] text-white font-bold rounded hover:bg-green-400"
                        >
                            Confirm
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddAward;
