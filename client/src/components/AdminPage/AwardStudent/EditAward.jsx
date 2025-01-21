import React, { useState, useEffect } from "react";
import axios from "axios";

function EditAward({ onClose, awardId }) {
    const [formData, setFormData] = useState({
        awardName: "",
        awardType: "",
        description: "",
        criteria: "",
    });
    console.log(awardId);

    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAwardDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/v1/api/award/get-award/${awardId}`);
                setFormData(response.data.metadata);
            } catch (err) {
                console.error("Error fetching award details:", err);
                setError("Failed to fetch award details.");
            }
        };

        fetchAwardDetails();
    }, [awardId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { awardName, awardType, description, criteria } = formData;

        if (!awardName || !awardType || !description || !criteria) {
            setError("Please fill out all fields.");
            return;
        }

        try {
            const response = await axios.put(
                `http://localhost:8080/v1/api/award/update-award/${awardId}`,
                { awardName, awardType, description, criteria }
            );

            if (response.status === 201) {
                alert("Chỉnh sửa giải thưởng thành công!");
                onClose(); // Close the modal
            } else {
                setError("Đã xảy ra lỗi. Vui lòng kiểm tra lại!");
            }
        } catch (err) {
            console.error("Error updating award:", err);
            setError("Không thể chỉnh sửa giải thưởng. Vui lòng kiểm tra lại!");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="flex flex-col w-[50vw] bg-gray-200 p-6 rounded">
                <h2 className="text-3xl font-bold text-center mb-4">Chỉnh sửa giải thưởng</h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-700 font-bold">Tên giải thưởng</label>
                        <input
                            type="text"
                            name="awardName"
                            placeholder="Award Name"
                            value={formData.awardName}
                            onChange={handleChange}
                            className="flex p-2 border rounded w-[40vw]"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-bold">Loại giải thưởng</label>
                        <select
                            id="awardType"
                            name="awardType"
                            value={formData.awardType}
                            onChange={handleChange}
                            className="p-2 border rounded w-[20vw]"
                            required
                        >
                            <option value="">Chọn loại giải thưởng</option>
                            <option value="university">University</option>
                            <option value="city">City</option>
                            <option value="country">Country</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-bold">Mô tả</label>
                        <input
                            type="text"
                            name="description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleChange}
                            className="p-2 border rounded w-[40vw]"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-bold">Tiêu chuẩn</label>
                        <input
                            type="text"
                            name="criteria"
                            placeholder="Criteria"
                            value={formData.criteria}
                            onChange={handleChange}
                            className="p-2 border rounded w-[40vw]"
                        />
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

export default EditAward;
