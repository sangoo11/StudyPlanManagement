import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function EditDomainField({ id ,onClose, onEditedDF }) {
    const [form, setForm] = useState({
        name: "",
        description: "",
        minCredit: "",
        active: true,
        knowledgeDomainID: null,
    });

    // Fetch current data
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(id);
                const res = await axios.get(`http://localhost:8080/v1/api/knowledge-field/${id}`);
                const found = res.data.metadata;
                if (found) {
                    setForm({
                        name: found.name,
                        description: found.description,
                        minCredit: found.minCredit,
                        active: found.active,
                        knowledgeDomainID: found.knowledgeDomainID
                    });
                }
                
            } catch (err) {
                toast.error("Không thể tải dữ liệu.");
            }
        };
        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                name: form.name,
                description: form.description,
                minCredit: parseInt(form.minCredit), // Ensure minCredit is an integer
                active: form.active,
            };

            console.log("Sending payload:", payload); // Log the payload being sent

            const res = await axios.put(`http://localhost:8080/v1/api/knowledge-field/${id}`, payload);

            // Check if the response status is 200 or 201
            if (res.status === 200 || res.status === 201) {
                toast.success("Cập nhật khối kiến thức thành công!");
                onEditedDF();  // Call the callback to update the list
                onClose();     // Close the modal
            } else {
                toast.error("Có lỗi xảy ra khi cập nhật dữ liệu.");
            }
        } catch (err) {
            console.error("Error during update:", err);
            toast.error("Tên đã tồn tại hoặc có lỗi xảy ra.");
        }
    };


    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="flex flex-col w-[50vw] h-auto bg-gray-200 p-6 rounded">
                <h2 className="flex w-full justify-center text-3xl font-bold mb-4">Chỉnh sửa khối kiến thức</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Tên khối kiến thức"
                        required
                        className="p-2 rounded w-full"
                    />
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Mô tả"
                        required
                        className="p-2 rounded w-full"
                    />
                    <input
                        type="number"
                        name="minCredit"
                        value={form.minCredit}
                        onChange={handleChange}
                        placeholder="Số tín chỉ tối thiểu"
                        required
                        className="p-2 rounded w-full"
                    />
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="active"
                            checked={form.active}
                            onChange={handleChange}
                        />
                        <span>Đang hoạt động</span>
                    </label>

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

export default EditDomainField;
