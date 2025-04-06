import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function EditDN({ onClose, id, onEditedDN }) {
    const [form, setForm] = useState({
        name: "",
        description: "",
        minCredit: "",
        active: true,
    });

    // Fetch current data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/v1/api/knowledge-domain`);
                const found = res.data.metadata.find(item => item.id === id);
                if (found) {
                    setForm({
                        name: found.name,
                        description: found.description,
                        minCredit: found.minCredit,
                        active: found.active
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
            const res = await axios.put(`http://localhost:8080/v1/api/knowledge-domain/${id}`, {
                ...form,
                minCredit: parseInt(form.minCredit)
            });
            if (res.status === 201) {
                toast.success("Cập nhật khối kiến thức thành công!");
                onEditedDN(); 
                onClose(); 
            }
        } catch (err) {
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

export default EditDN;
