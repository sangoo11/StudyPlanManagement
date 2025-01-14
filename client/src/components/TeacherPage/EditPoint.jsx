import React, { useState } from "react";
import axios from "axios";
import TrashIcon from "../../assets/images/trashIcon.jpg";

function EditCriteria({ onClose }) {

    // State to manage form inputs
    const [formData, setFormData] = useState({
        name: "",
        semester: "1",
        year: "",
        teacherId: ""
    });

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const [rows, setRows] = useState([]);

    // Handle adding a new row
    const handleAddRow = () => {
        setRows((prevRows) => [
            ...prevRows,
            { quaTrinh: "", giuaKi: "", cuoiKi: "" }
        ]);
    };

    // Handle input change for table rows
    const handleRowChange = (index, e) => {
        const { name, value } = e.target;
        const updatedRows = [...rows];
        updatedRows[index][name] = value;
        setRows(updatedRows);
    };


    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="flex flex-col w-[50vw] h-auto bg-gray-200 p-6 rounded">
                <h2 className="flex w-full justify-center text-3xl font-bold mb-4">Thông tin sinh viên</h2>
                <div className="flex">
                    <form className="flex flex-col space-y-4 w-1/2">
                        <div>
                            <label className="block text-gray-700">Họ và tên:</label>
                            <div className="flex w-full px-4 py-2 border rounded bg-white h-[5vh]"></div>
                        </div>

                        <div>
                            <label className="block text-gray-700">Mã số sinh viên:</label>
                            <div className="flex w-full px-4 py-2 border rounded bg-white h-[5vh]"></div>
                        </div>

                        <div>
                            <label className="block text-gray-700">Chuyên ngành:</label>
                            <div className="flex w-full px-4 py-2 border rounded bg-white h-[5vh]"></div>
                        </div>

                        <div>
                            <label className="block text-gray-700">Mã môn học:</label>
                            <div className="flex w-full px-4 py-2 border rounded bg-white h-[5vh]"></div>
                        </div>
                    </form>
                    <div className="flex w-1/2 h-full justify-end mt-[16vh]">
                        <div className="w-16 h-24 bg-white flex items-center  rounded-md justify-center">
                            <span className="text-gray-500">👤</span>
                        </div>
                    </div>
                    
                </div>
                

                <div className="h-auto mb-[4vh] mt-[4vh]">
                        <table className="min-w-full bg-white border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b">Quá trình</th>
                                    <th className="py-2 px-4 border-b">Giữa kì</th>
                                    <th className="py-2 px-4 border-b">Cuối kì</th>
                                </tr>
                            </thead>
                            <tbody className="items-center">
                                <tr>
                                    <td className="py-2 px-4 border-b">
                                        <input
                                            type="text"
                                            name="quaTrinh"
                                            //value={row.maMon}
                                            //onChange={(e) => handleRowChange(index, e)}
                                            className="border border-gray-300 rounded w-full"
                                            placeholder="Quá trình"
                                        />
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <input
                                            type="text"
                                            name="giuaKi"
                                            //value={row.tenMon}
                                            //onChange={(e) => handleRowChange(index, e)}
                                            className="border border-gray-300 rounded w-full"
                                            placeholder="Giữa kì"
                                        />
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <input
                                            type="text"
                                            name="cuoiKi"
                                            //value={row.heSo}
                                            //onChange={(e) => handleRowChange(index, e)}
                                            className="border border-gray-300 rounded w-full"
                                            placeholder="Cuối kì"
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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

            </div>
        </div>
    );
}

export default EditCriteria;
