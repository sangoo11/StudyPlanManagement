import React from "react";
import axios from "axios";

function DeleteClassroom({ courseId, onClose, onDeleteSuccess }) {
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/v1/api/course/delete-course/${courseId}`);
            onDeleteSuccess(courseId); // Notify parent component
            onClose(); // Close the modal
        } catch (error) {
            console.error("Error deleting classroom:", error);
            alert("Failed to delete the classroom. Please try again.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="flex flex-col w-[50vw] h-[30vh] bg-gray-200 items-center p-4 rounded">
                <h2 className="text-2xl font-bold text-red-600 mb-4">Xóa Lớp Học</h2>
                <p className="text-center mb-6">
                    Bạn có chắc chắn muốn xóa lớp học này? Hành động này không thể hoàn tác.
                </p>
                <div className="flex space-x-4">
                    <button
                        onClick={handleDelete}
                        className="px-6 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-600"
                    >
                        Xác nhận
                    </button>
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-400 text-white font-bold rounded hover:bg-gray-500"
                    >
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteClassroom;
