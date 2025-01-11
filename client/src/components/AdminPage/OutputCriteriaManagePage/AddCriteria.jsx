import React, { useState } from "react";
import axios from "axios";
import TrashIcon from "../../../assets/images/trashIcon.jpg";

function AddCriteria({ onClose }) {

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
            { maMon: "", tenMon: "", heSo: "" }
        ]);
    };

    // Handle input change for table rows
    const handleRowChange = (index, e) => {
        const { name, value } = e.target;
        const updatedRows = [...rows];
        updatedRows[index][name] = value;
        setRows(updatedRows);
    };

    // Handle deleting a row
    const handleDeleteRow = (index) => {
        const updatedRows = rows.filter((_, i) => i !== index);
        setRows(updatedRows);
    };

    // Handle form submission
    // const handleSubmit = async (e) => {
    //     e.preventDefault(); // Prevent page reload
    //     try {
    //         const response = await axios.post(
    //             "http://localhost:8080/v1/api/course/create-new-course",
    //             {
    //                 name: formData.name,
    //                 semester: parseInt(formData.semester, 10),
    //                 year: formData.year,
    //                 teacherId: parseInt(formData.teacherId, 10),
    //             }
    //         );
    //         alert("Tạo lớp thành công!");
    //         console.log("Response:", response.data);
    //         onClose(); // Close the modal after successful submission
    //         window.location.reload();
    //     } catch (error) {
    //         console.error("Error creating course:", error);
    //         alert("Failed to create the course. Please try again.");
    //     }
    // };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="flex flex-col w-[50vw] h-auto bg-gray-200 p-6 rounded">
                <h2 className="flex w-full justify-center text-3xl font-bold mb-4">Thêm tiêu chuẩn đầu ra mới</h2>
                <form className="flex flex-col space-y-4">
                    <div>
                        <label className="block text-gray-700">Mã tiêu chuẩn:</label>
                        <input
                            type="text"
                            name="classid"
                            //value={formData.name}
                            //onChange={handleChange}
                            className="w-full px-4 py-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Nội dung tiêu chuẩn:</label>
                        <input
                            type="number"
                            name="teacherid"
                            //value={formData.semester}
                            //onChange={handleChange}
                            className="w-full px-4 py-2 border rounded"
                        />
                    </div>

                    <div className="overflow-y-scroll h-80">
                        <h3 className="text-lg font-bold mb-2">Danh sách môn học:</h3>
                        <table className="min-w-full bg-white border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b">Mã môn</th>
                                    <th className="py-2 px-4 border-b">Tên môn</th>
                                    <th className="py-2 px-4 border-b">Hệ số</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row, index) => (
                                    <tr key={index}>
                                        <td className="py-2 px-4 border-b">
                                            <input
                                                type="text"
                                                name="maMon"
                                                value={row.maMon}
                                                onChange={(e) => handleRowChange(index, e)}
                                                className="border border-gray-300 rounded w-full"
                                                placeholder="Mã môn"
                                            />
                                        </td>
                                        <td className="py-2 px-4 border-b">
                                            <input
                                                type="text"
                                                name="tenMon"
                                                value={row.tenMon}
                                                onChange={(e) => handleRowChange(index, e)}
                                                className="border border-gray-300 rounded w-full"
                                                placeholder="Tên môn"
                                            />
                                        </td>
                                        <td className="py-2 px-4 border-b">
                                            <input
                                                type="number"
                                                name="heSo"
                                                value={row.heSo}
                                                onChange={(e) => handleRowChange(index, e)}
                                                className="border border-gray-300 rounded w-full"
                                                placeholder="Hệ số"
                                            />
                                        </td>
                                        <td className="border-t border-gray-300 px-4 py-2">
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteRow(index)}
                                                className="text-red-500 hover:bg-red-200 flex w-5 h-5"
                                            >
                                                <img src={TrashIcon} alt="" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button
                            type="button"
                            onClick={handleAddRow}
                            className="mt-2 bg-[#1DA599] text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Thêm môn
                        </button>
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

export default AddCriteria;
