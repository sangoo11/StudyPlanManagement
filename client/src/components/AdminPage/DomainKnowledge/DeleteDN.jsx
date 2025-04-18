import React from "react";
import axios from "axios";

function DeleteDN({ onClose,  }) {
  const handleDelete = async (e) => {
    e.preventDefault(); // Prevent form default submission behavior
    
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="flex flex-col w-[50vw] h-auto bg-gray-200 p-6 rounded">
        <h2 className="flex justify-center text-3xl font-bold mb-4">
          Xóa khối kiến thức
        </h2>
        <p className="flex justify-center text-xl mb-4 text-red-500">
          Bạn có chắc muốn xóa tiêu chuẩn đầu ra{" "}
          <strong className="ml-1 text-green-600 font-bold"></strong>?
        </p>
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

export default DeleteDN;
