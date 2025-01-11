import React, { useState } from "react";
import axios from "axios";

function AddSubject({onClose}) {

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="flex flex-col w-[50vw] h-auto bg-gray-200 p-6 rounded">
                <h2 className="flex w-full justify-center text-3xl font-bold mb-4">Thêm môn học mới</h2>
                <form className="flex flex-col space-y-4">
                    <div>
                        <label className="block text-gray-700">Mã môn học:</label>
                        <input
                            type="text"
                            name="name"
                            //value={formData.name}
                            //onChange={handleChange}
                            className="w-full px-4 py-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Tên môn học:</label>
                        <input
                            type="number"
                            name="semester"
                            //value={formData.semester}
                            //onChange={handleChange}
                            className="w-full px-4 py-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Số tín chỉ:</label>
                        <input
                            type="text"
                            name="year"
                            //value={formData.year}
                            //onChange={handleChange}
                            className="w-full px-4 py-2 border rounded"
                        />
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
                            className="px-6 py-2 bg-[#1DA599] text-white font-bold rounded hover:bg-green-400"
                        >
                            Xác nhận
                        </button>
                        
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddSubject;
