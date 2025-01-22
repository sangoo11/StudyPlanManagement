import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

function DeleteStudent({ onClose, studentData, onStudentDeleted }) {
    const handleDelete = async () => {
        console.log(studentData.id);
        try {
            const response = await axios.put(
                `http://localhost:8080/v1/api/student/delete-student/${studentData.id}`
            );
            toast.success("Student deleted successfully!");
            console.log("Student deleted successfully:", response.data);
            if (onStudentDeleted) {
                onStudentDeleted();
            }
            onClose();
            
        } catch (error) {
            toast.error("Failed to delete student.");
            console.error("Error deleting student:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="flex flex-col w-[50vw] h-auto bg-gray-200 p-6 rounded">
                <h2 className="flex w-full justify-center text-3xl font-bold mb-4">Xóa sinh viên</h2>
                <h2 className="flex w-full justify-center text-xl mb-4 text-red-500">
                    Bạn có chắc muốn xóa sinh viên <strong className="ml-1"> {studentData.id}</strong> ?
                </h2> 

                {/* Display student details */}
                <div className="bg-white p-4 rounded shadow-md mb-6">
                    <p>
                        <strong>Mã số sinh viên:</strong> {studentData.id}
                    </p>
                    <p>
                        <strong>Họ và tên:</strong> {studentData.fullName}
                    </p>
                    <p>
                        <strong>Ngành:</strong> {studentData.major}
                    </p>
                    <p>
                        <strong>Khóa:</strong> {studentData.year}
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

export default DeleteStudent;
