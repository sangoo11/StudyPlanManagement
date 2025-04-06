import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

function AddDN({ onClose, onAddedDN }) {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [minCredit, setMinCredit] = useState('');
    const [active, setActive] = useState(true);
    const [feedback, setFeedback] = useState({ message: "", type: "" });
    const [existingNames, setExistingNames] = useState([]);

    // Get existing domain names for validation
    useEffect(() => {
        const fetchExisting = async () => {
            try {
                const res = await axios.get("http://localhost:8080/v1/api/knowledge-domain");
                const names = res.data.metadata.map((item) => item.name.toLowerCase().trim());
                setExistingNames(names);
            } catch (err) {
                console.error("Error fetching existing names:", err);
            }
        };
        fetchExisting();
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation: check duplicate name
        if (existingNames.includes(name.toLowerCase().trim())) {
            setFeedback({ message: "Tên khối kiến thức đã tồn tại.", type: "error" });
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/v1/api/knowledge-domain", {
                name,
                description,
                minCredit: Number(minCredit),
                active,
            });

            if (response.data.status === 201) {
                toast.success("Thêm khối kiến thức thành công!");
                onAddedDN(); 
                onClose();   
            }
        } catch (error) {
            console.error("Failed to add:", error);
            setFeedback({ message: "Thêm không thành công. Vui lòng thử lại.", type: "error" });
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="flex flex-col w-[50vw] h-auto bg-gray-200 p-6 rounded">
                <h2 className="flex w-full justify-center text-3xl font-bold mb-4">Thêm khối kiến thức mới</h2>

                {feedback.message && (
                    <p
                        className={`text-center mb-4 ${
                            feedback.type === "success" ? "text-green-500" : "text-red-500"
                        }`}
                    >
                        {feedback.message}
                    </p>
                )}

                <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="p-2 rounded"
                        placeholder="Tên khối kiến thức"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <textarea
                        className="p-2 rounded"
                        placeholder="Mô tả"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        className="p-2 rounded"
                        placeholder="Số tín chỉ tối thiểu"
                        value={minCredit}
                        onChange={(e) => setMinCredit(e.target.value)}
                        required
                        min={0}
                    />
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={active}
                            onChange={(e) => setActive(e.target.checked)}
                        />
                        <span>Đang hoạt động</span>
                    </label>

                    <div className="flex justify-end space-x-4">
                        <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
                            Huỷ
                        </button>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                            Thêm
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddDN;
