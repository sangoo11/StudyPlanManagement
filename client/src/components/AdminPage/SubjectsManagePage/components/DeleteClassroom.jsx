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
            <div className="flex flex-col w-[50vw] h-auto bg-gray-200 p-6 rounded">
                <h2 className="flex w-full justify-center text-3xl font-bold mb-4">Xóa lớp học</h2>
                <h2 className="flex w-full justify-center text-xl mb-4 text-red-500">Bạn có chắc muốn xóa lớp học ? </h2>
                <form className="flex flex-col space-y-4">
                    <div>
                        <label className="block text-gray-700">Mã lớp học:</label>
                        <div className="flex w-full h-[5vh] bg-white rounded-md"></div>
                    </div>

                    <div>
                        <label className="block text-gray-700">Mã giáo viên:</label>
                        <div className="flex w-full h-[5vh] bg-white rounded-md"></div>
                    </div>

                    <div>
                        <label className="block text-gray-700">Tên giáo viên:</label>
                        <div className="flex w-full h-[5vh] bg-white rounded-md"></div>
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

export default DeleteClassroom;
