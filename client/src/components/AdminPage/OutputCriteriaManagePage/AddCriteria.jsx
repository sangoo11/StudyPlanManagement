import React, { useState } from "react";
import axios from "axios";

function AddCriteria({ onClose, onAddedCriteria }) {
    const [formData, setFormData] = useState({
        learningOutcomeCode: "",
        learningOutcomeName: "",
        description: "",
    });
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState({ message: "", type: "" });

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Validate form fields
    const validateForm = () => {
        if (!formData.learningOutcomeCode.trim()) return "Learning Outcome Code is required.";
        if (!formData.learningOutcomeName.trim()) return "Learning Outcome Name is required.";
        if (!formData.description.trim()) return "Description is required.";
        if (formData.learningOutcomeCode.length < 2) return "Code must be at least 2 characters long.";
        return null;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const errorMessage = validateForm();
        if (errorMessage) {
            setFeedback({ message: errorMessage, type: "error" });
            return;
        }

        setLoading(true);
        setFeedback({ message: "", type: "" });

        try {
            const response = await axios.post(
                "http://localhost:8080/v1/api/learning-outcome/create-learning-outcome",
                formData
            );

            if (response.status === 200 || response.status === 201) {
                alert('Thêm tiêu chuẩn thành công!');
                setFormData({
                    learningOutcomeCode: "",
                    learningOutcomeName: "",
                    description: "",
                });
                if (onAddedCriteria) {
                    onAddedCriteria();
                }
                onClose();
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Failed to create learning outcome. Please try again.";
            setFeedback({ message: errorMsg, type: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="flex flex-col w-[50vw] h-auto bg-gray-200 p-6 rounded">
                <h2 className="flex w-full justify-center text-3xl font-bold mb-4">Thêm tiêu chuẩn đầu ra mới</h2>
                {feedback.message && (
                    <p
                        className={`text-center mb-4 ${
                            feedback.type === "success" ? "text-green-500" : "text-red-500"
                        }`}
                    >
                        {feedback.message}
                    </p>
                )}
                <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-700">Mã tiêu chuẩn:</label>
                        <input
                            type="text"
                            name="learningOutcomeCode"
                            value={formData.learningOutcomeCode}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded"
                            aria-label="Learning Outcome Code"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Nội dung tiêu chuẩn:</label>
                        <input
                            type="text"
                            name="learningOutcomeName"
                            value={formData.learningOutcomeName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded"
                            aria-label="Learning Outcome Name"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Mô tả:</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded"
                            aria-label="Description"
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
                            disabled={loading}
                            className={`px-6 py-2 ${loading ? "bg-gray-400" : "bg-[#1DA599]"} text-white font-bold rounded hover:bg-green-400`}
                        >
                            {loading ? "Đang xử lý..." : "Xác nhận"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddCriteria;
