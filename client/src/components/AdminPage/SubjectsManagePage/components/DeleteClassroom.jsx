import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";

function DeleteClassroom({ courseID, onClose }) {
    const [course, setCourse] = useState(null);
    const [formData, setFormData] = useState({
        courseCode: "",
    });
    const [error, setError] = useState("");

    // Fetch course data on mount
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/v1/api/course/get-course/${courseID}`);
                const fetchedCourse = response.data.metadata;
                if (fetchedCourse) {
                    setCourse(fetchedCourse);
                    setFormData({
                        courseCode: fetchedCourse.courseCode || ""
                    });
                }
            } catch (error) {
                console.error("Error fetching course:", error);
                setError("Không thể lấy thông tin. Vui lòng kiểm tra lại");
            }
        };

        if (courseID) {
            fetchCourse();
        }
    }, [courseID]);

    const handleDelete = async (e) => {
        e.preventDefault();
        console.log("Deleting course with ID:", courseID);    
        try {
            await axios.put(`http://localhost:8080/v1/api/course/delete-course/${courseID}`);
            alert("Xóa lớp học thành công!");
            onClose();
        } catch (error) {
            console.error("Error deleting classroom:", error);
            setError("Không thể xóa lớp học. Vui lòng thử lại");
        }
    };
    

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="flex flex-col w-[50vw] h-auto bg-gray-200 p-6 rounded">
                <h2 className="flex w-full justify-center text-3xl font-bold mb-4">Xóa lớp học</h2>
                <h2 className="flex w-full justify-center text-xl mb-4 text-red-500">
                    Bạn có chắc muốn xóa lớp học <strong className="ml-1 text-green-500">{formData.courseCode}</strong> ?
                </h2>
                {error && <div className="text-red-500 text-center mb-4">{error}</div>}
                <form className="flex flex-col space-y-4" onSubmit={handleDelete}>
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

export default DeleteClassroom;
