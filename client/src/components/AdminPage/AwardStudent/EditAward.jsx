import React, { useState, useEffect } from "react";
import axios from "axios";

const TYPE_OPTIONS = [
    "Academic",
    "Leadership",
    "Science",
    "Attendance",
    "Arts",
    "Sports",
    "Environment",
    "Community",
];

const LEVEL_OPTIONS = [
    "Country",
    "City",
    "School",
];

function EditAward({ onClose, awardId }) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        type: "",
        level: "",
        date_awarded: "",
    });
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAwardDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/v1/api/award-type/${awardId}`);
                setFormData(response.data.metadata);
            } catch (err) {
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
        try {
            await axios.patch(
                `http://localhost:8080/v1/api/award-type/${awardId}`,
                formData
            );
            alert("Chỉnh sửa giải thưởng thành công!");
            onClose();
        } catch (err) {
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
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="flex p-2 border rounded w-[40vw]"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-bold">Loại</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="p-2 border rounded w-[40vw]"
                            required
                        >
                            <option value="">Chọn loại giải thưởng</option>
                            {TYPE_OPTIONS.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-bold">Cấp</label>
                        <select
                            name="level"
                            value={formData.level}
                            onChange={handleChange}
                            className="p-2 border rounded w-[40vw]"
                            required
                        >
                            <option value="">Chọn cấp giải thưởng</option>
                            {LEVEL_OPTIONS.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-bold">Ngày trao</label>
                        <input
                            type="date"
                            name="date_awarded"
                            value={formData.date_awarded ? formData.date_awarded.split('T')[0] : ''}
                            onChange={handleChange}
                            className="p-2 border rounded w-[40vw]"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-bold">Mô tả</label>
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="p-2 border rounded w-[40vw]"
                        />
                    </div>
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