import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

function DeleteTeacher({ onClose, teacherData }) {
    const handleDelete = async () => {
        console.log(teacherData.id);
        try {
            const response = await axios.delete(
                `http://localhost:8080/v1/api/teacher/delete-teacher/${teacherData.id}`
            );
            toast.success("teacher deleted successfully!");
            console.log("teacher deleted successfully:", response.data);
            onClose();
        } catch (error) {
            toast.error("Failed to delete teacher.");
            console.error("Error deleting teacher:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="flex flex-col w-[50vw] h-auto bg-gray-200 p-6 rounded">
                <h2 className="flex w-full justify-center text-3xl font-bold mb-4">Xóa giáo viên</h2>
                <h2 className="flex w-full justify-center text-xl mb-4 text-red-500">
                    Bạn có chắc muốn xóa giáo viên <strong className="ml-1"> {teacherData.id}</strong> ?
                </h2> 

                {/* Display teacher details */}
                <div className="bg-white p-4 rounded shadow-md mb-6">
                    <p>
                        <strong>Mã số giáo viên:</strong> {teacherData.id}
                    </p>
                    <p>
                        <strong>Họ và tên:</strong> {teacherData.fullName}
                    </p>
                    <p>
                        <strong>Khoa:</strong> {teacherData.major}
                    </p>
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
                        type="button"
                        onClick={handleDelete}
                        className="px-6 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-700"
                    >
                        Xóa
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteTeacher;
