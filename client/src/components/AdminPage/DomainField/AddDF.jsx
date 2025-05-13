import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

function AddDomainField({ onClose, onAddedDF }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [minCredit, setMinCredit] = useState('');
    const [status, setStatus] = useState(true);
    const [domainID, setDomainID] = useState('');
    const [domainOptions, setDomainOptions] = useState([]);
    const [existingNames, setExistingNames] = useState([]);
    const [feedback, setFeedback] = useState({ message: "", type: "" });

    // Fetch knowledge domains and existing field names
    useEffect(() => {
        const fetchData = async () => {
            try {
                const domainRes = await axios.get("http://localhost:8080/v1/api/knowledge-domain");
                setDomainOptions(domainRes.data.metadata);

                const fieldRes = await axios.get("http://localhost:8080/v1/api/knowledge-field");
                const names = fieldRes.data.metadata.map(item => item.name.toLowerCase().trim());
                setExistingNames(names);
            } catch (err) {
                console.error("Error loading data:", err);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (existingNames.includes(name.toLowerCase().trim())) {
            setFeedback({ message: "Tên lĩnh vực kiến thức đã tồn tại.", type: "error" });
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/v1/api/knowledge-field", {
                name,
                description,
                status,
                minCredit: Number(minCredit),
                knowledgeDomainID: Number(domainID)
            });

            if (response.data.status === 201) {
                toast.success("Thêm lĩnh vực kiến thức thành công!");
                onAddedDF();
                onClose();
            }
        } catch (error) {
            console.error("Failed to add field:", error);
            setFeedback({ message: "Thêm không thành công. Vui lòng thử lại.", type: "error" });
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="flex flex-col w-[50vw] h-auto bg-gray-200 p-6 rounded">
                <h2 className="flex w-full justify-center text-3xl font-bold mb-4 text-[#1DA599]">Thêm lĩnh vực kiến thức</h2>

                {feedback.message && (
                    <p className={`text-center mb-4 ${feedback.type === "success" ? "text-green-500" : "text-red-500"}`}>
                        {feedback.message}
                    </p>
                )}

                <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="p-2 rounded"
                        placeholder="Tên lĩnh vực"
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
                    <select
                        className="p-2 rounded"
                        value={domainID}
                        onChange={(e) => setDomainID(e.target.value)}
                        required
                    >
                        <option value="">Chọn khối kiến thức</option>
                        {domainOptions.map((domain) => (
                            <option key={domain.id} value={domain.id}>
                                {domain.name}
                            </option>
                        ))}
                    </select>
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={status}
                            onChange={(e) => setStatus(e.target.checked)}
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

export default AddDomainField;
