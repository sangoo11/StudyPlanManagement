import React, { useEffect, useState } from "react";
import axios from "axios";

function EditSubject({ onClose, subjectID }) {
    console.log(subjectID);
    const [subject, setSubject] = useState(null);
    const [formData, setFormData] = useState({
        subjectCode: "",
        subjectName: "",
        type: "",
        credit: "",
        description: "",
    });
    const [error, setError] = useState("");

    // Fetch subject data on mount
    useEffect(() => {
        const fetchSubject = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/v1/api/subject/get-subject/${subjectID}`);
                const fetchedSubject = response.data.metadata;
                if (fetchedSubject) {
                    setSubject(fetchedSubject);
                    setFormData({
                        subjectCode: fetchedSubject.subjectCode || "",
                        subjectName: fetchedSubject.subjectName || "",
                        type: fetchedSubject.type || "",
                        credit: fetchedSubject.credit || "",
                        description: fetchedSubject.description || "",
                    });
                }
            } catch (error) {
                console.error("Error fetching subject:", error);
                setError("Không thể lấy thông tin. Vui lòng kiểm tra lại");
            }
        };

        if (subjectID) {
            fetchSubject();
        }
    }, [subjectID]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { subjectCode, subjectName, type, credit, description } = formData;
    
        // Validate fields
        if (!subjectCode || !subjectName || !type || !credit || !description) {
            setError("Please fill out all fields.");
            return;
        }
    
        // Convert credit to a number
        const numericCredit = Number(credit);
        if (isNaN(numericCredit) || numericCredit < 1 || numericCredit > 4) {
            setError("Số tín chỉ phải nằm trong khoảng từ 1 đến 4.");
            return;
        }
    
        try {
            const response = await axios.put(
                `http://localhost:8080/v1/api/subject/edit-subject/${subjectID}`,
                { subjectCode, subjectName, type, credit: numericCredit, description }
            );
    
            // Check for successful response
            if (response.status === 200 || response.status === 201) {
                alert("Thay đổi thông tin thành công!");
                onClose();
            } else {
                setError("Thay đổi thông tin không thành công. Vui lòng thử lại");
            }
        } catch (error) {
            console.error("Error editing subject:", error);
            setError("Thay đổi thông tin không thành công. Vui lòng thử lại");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="flex flex-col w-[50vw] h-auto bg-gray-200 p-6 rounded">
                <h2 className="flex w-full justify-center text-3xl font-bold mb-4">
                    Chỉnh sửa thông tin môn học
                </h2>

                {error && <div className="text-red-500 text-center mb-4">{error}</div>}

                <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-700">Mã môn:</label>
                        <div className="w-full px-4 py-2 border rounded bg-white"> {formData.subjectCode} </div>
                    </div>

                    <div>
                        <label className="block text-gray-700">Tên môn:</label>
                        <input
                            type="text"
                            name="subjectName"
                            value={formData.subjectName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded"
                            disabled={!subject} // Disable until subject is loaded
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Loại môn học:</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded bg-white"
                            disabled={!subject} // Disable until subject is loaded
                        >
                            <option value="major">Chuyên ngành</option>
                            <option value="core">Cơ sở ngành</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700">Số tín chỉ</label>
                        <input
                            type="number"
                            name="credit"
                            value={formData.credit}
                            onChange={handleChange}
                            min="1"
                            max="4"
                            className="w-full px-4 py-2 border rounded"
                            disabled={!subject} // Disable until subject is loaded
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Mô tả:</label>
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded"
                            disabled={!subject} // Disable until subject is loaded
                        />
                    </div>

                    <div className="flex space-x-4 justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 bg-white text-[#1DA599] font-bold rounded hover:bg-[#1DA599] hover:text-white border-2 border-[#1DA599]"
                        >
                            Hủy bỏ
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-[#1DA599] text-white font-bold rounded hover:bg-green-400"
                            disabled={!subject} // Disable until subject is loaded
                        >
                            Xác nhận
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditSubject;
