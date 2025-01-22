import React, { useState } from "react";
import axios from "axios";

function EditCriteria({ onClose, id, onEditedCriteria}) {
    const [learningOutcomeName, setLearningOutcomeName] = useState("");
    const [description, setDescription] = useState("");
    const [active, setActive] = useState(true);

    console.log(id);
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const data = {
            learningOutcomeName,
            description,
            active,
        };

        try {
            const response = await axios.put(
                `http://localhost:8080/v1/api/learning-outcome/edit-learning-outcome/${id}`,
                data
            );
            console.log("Success:", response.data);
            if (onEditedCriteria) {
                onEditedCriteria();
            }
            onClose(); // Close modal after successful update
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="flex flex-col w-[50vw] h-auto bg-gray-200 p-6 rounded">
                <h2 className="flex w-full justify-center text-3xl font-bold mb-4">Chỉnh sửa tiêu chuẩn đầu ra</h2>
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-lg font-medium">Tên tiêu chuẩn đầu ra</label>
                        <input
                            type="text"
                            value={learningOutcomeName}
                            onChange={(e) => setLearningOutcomeName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-lg font-medium">Mô tả</label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
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

export default EditCriteria;
