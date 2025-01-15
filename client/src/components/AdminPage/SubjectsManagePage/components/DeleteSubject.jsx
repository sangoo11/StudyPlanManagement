import React, { useState, useEffect } from "react";
import axios from "axios";

function DeleteSubject({onClose, subjectID}) {
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

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="flex flex-col w-[50vw] h-auto bg-gray-200 p-6 rounded">
                <h2 className="flex w-full justify-center text-3xl font-bold mb-4">Xóa môn học</h2>
                <h2 className="flex w-full justify-center text-xl mb-4 text-red-500">Bạn có chắc muốn xóa môn học ? </h2>
                <form className="flex flex-col space-y-4">
                    <div>
                        <label className="block text-gray-700">Mã môn học:</label>
                        <div className="flex w-full h-[5vh] bg-white rounded-md items-center justify-center">{formData.subjectCode}</div>
                    </div>

                    <div>
                        <label className="block text-gray-700">Tên môn học:</label>
                        <div className="flex w-full h-[5vh] bg-white rounded-md items-center justify-center">{formData.subjectName}</div>
                    </div>

                    <div>
                        <label className="block text-gray-700">Số tín chỉ:</label>
                        <div className="flex w-full h-[5vh] bg-white rounded-md items-center justify-center">{formData.credit}</div>
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
                            className="px-6 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-700"
                        >
                            Xóa
                        </button>
                        
                    </div>
                </form>
            </div>
        </div>
    );
}

export default DeleteSubject;
