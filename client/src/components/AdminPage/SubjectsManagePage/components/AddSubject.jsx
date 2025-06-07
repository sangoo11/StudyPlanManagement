import React, {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";

function AddSubject({onClose, onAddedSubject}) {
    const [formData, setFormData] = useState({
        subjectCode: "",
        subjectName: "",
        credit: "",
        majorID: "",
        description: "",
        knowledgeFieldID: "",
        image: null,
    });

    const [fieldOptions, setFieldOptions] = useState([]);
    const [domainOptions, setDomainOptions] = useState([]);
    const [selectedDomain, setSelectedDomain] = useState("");
    const [majorOptions, setMajorOptions] = useState([]);

    useEffect(() => {
        const fetchMajorOptions = async () => {
            const {data} = await axios.get(`http://localhost:8080/v1/api/major?fields=majorName`);
            setMajorOptions(data.metadata);
        }
        const fetchDomainOptions = async () => {
            const {data} = await axios.get(`http://localhost:8080/v1/api/knowledge-domain?fields=name`);
            setDomainOptions(data.metadata);
        }


        fetchMajorOptions();
        fetchDomainOptions();

        if (selectedDomain) {
            const fetchFieldOptions = async () => {
                const {data} = await axios.get(`http://localhost:8080/v1/api/knowledge-field?fields=name&knowledgeDomainID=${selectedDomain}`);
                setFieldOptions(data.metadata);
            }
            fetchFieldOptions();
        }
    }, [selectedDomain]);

    const [error, setError] = useState("");
    const [preview, setPreview] = useState(null); // Optional: image preview

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (/\s/.test(file.name)) {
                setError("Tên file ảnh không được chứa khoảng trắng. Vui lòng đổi tên, ví dụ: SyllabusProfile.png");
                return;
            }
            setFormData((prevData) => ({
                ...prevData,
                image: file,
            }));
            setPreview(URL.createObjectURL(file));
            setError(""); // Clear error if everything is good
        }
    };

    const isFormValid = () => {
        const {subjectCode, subjectName, credit, majorID, description, knowledgeFieldID, image} = formData;

        if (!subjectCode || !subjectName || !credit || !majorID || !description || !knowledgeFieldID || !image) {
            setError("Vui lòng điền đầy đủ thông tin và chọn hình ảnh.");
            return false;
        }

        if (/\s/.test(image.name)) {
            setError("Tên file ảnh không được chứa khoảng trắng. Vui lòng đổi tên.");
            return false;
        }

        return true;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        if (!isFormValid()) return;

        const {subjectCode, subjectName, credit, majorID, description, knowledgeFieldID, image} = formData;

        if (!subjectCode || !subjectName || !credit || !majorID || !description || !knowledgeFieldID || !image) {
            setError("Vui lòng điền đầy đủ thông tin và chọn hình ảnh.");
            return;
        }

        try {
            const form = new FormData();
            Object.entries(formData).forEach(([key, value]) => form.append(key, value));

            console.log([...form.entries()]); // Debug

            const response = await axios.post(
                `http://localhost:8080/v1/api/subject/create-new-subject/`,
                form,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.status === 201) {
                toast.success("Môn học mới đã được thêm thành công!");
                onAddedSubject?.();
                onClose();
            } else {
                toast.error("Có lỗi xảy ra. Vui lòng thử lại.");
                setError("Có lỗi xảy ra. Vui lòng thử lại.");
            }
        } catch (err) {
            toast.error("Có lỗi xảy ra. Vui lòng thử lại.");
            console.error("Error creating subject:", err);
            setError("Không thể thêm môn học. Vui lòng kiểm tra kết nối.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="flex flex-col w-[50vw] bg-gray-200 p-6 rounded max-h-[90vh] overflow-y-auto">
                <h2 className="text-3xl font-bold text-center mb-4">Thêm môn học mới</h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form className="flex flex-col h-auto space-y-4" onSubmit={handleSubmit}>
                    {/* Subject Code */}
                    <div>
                        <label className="block text-gray-700">Mã môn học:</label>
                        <input
                            type="text"
                            name="subjectCode"
                            value={formData.subjectCode}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded"
                            placeholder="Nhập mã môn học"
                        />
                    </div>

                    {/* Subject Name */}
                    <div>
                        <label className="block text-gray-700">Tên môn học:</label>
                        <input
                            type="text"
                            name="subjectName"
                            value={formData.subjectName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded"
                            placeholder="Nhập tên môn học"
                        />
                    </div>

                    {/* Credit */}
                    <div>
                        <label className="block text-gray-700">Số tín chỉ:</label>
                        <input
                            type="number"
                            name="credit"
                            value={formData.credit}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded"
                            placeholder="Nhập số tín chỉ"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-gray-700">Mô tả:</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded"
                            placeholder="Nhập mô tả môn học"
                        />
                    </div>

                    {/* Knowledge Domain ID */}
                    <div>
                        <label className="block text-gray-700" htmlFor={'knowledgeDomainID'}>Khối kiến thức:</label>
                        <select className={'w-full px-4 py-2 border rounded'} name={'knowledgeDomainID'}
                                id={'knowledgeDomainID'}
                                onChange={(e) => setSelectedDomain(e.target.value)}>
                            {domainOptions.length > 0 && domainOptions.map((item) => (
                                <option key={item.id}
                                        value={item.id}>{item.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Knowledge Field ID */}
                    {selectedDomain && (<div>
                            <label className="block text-gray-700" htmlFor={'knowledgeFieldID'}>Chuyên ngành:</label>
                            <select className={'w-full px-4 py-2 border rounded'} name={'knowledgeFieldID'}
                                    id={'knowledgeFieldID'}
                                    value={formData.knowledgeFieldID}
                                    onChange={handleChange}>
                                {fieldOptions.length > 0 && fieldOptions.map((item) => (
                                    <option key={item.id}
                                            value={item.id}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Major ID */}
                    <div>
                        <label className="block text-gray-700" htmlFor={'majorID'}>Chuyên ngành:</label>
                        <select className={'w-full px-4 py-2 border rounded'} name={'majorID'} id={'majorID'}
                                value={formData.majorID}
                                onChange={handleChange}>
                            {majorOptions.length > 0 && majorOptions.map((major) => (
                                <option key={major.id}
                                        value={major.id}>{major.majorName}</option>
                            ))}
                        </select>
                    </div>

                    {/* Image upload */}
                    <div>
                        <label className="block text-gray-700">Hình ảnh:</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full px-4 py-2 border rounded bg-white"
                        />
                        <p className="text-sm text-red-600 mt-1">
                            ⚠️ <strong>Lưu ý:</strong> Tên file ảnh <span className="font-semibold">không nên chứa khoảng trắng</span>.
                            Ví dụ: <code>SyllabusProfile.png</code>
                        </p>
                        {preview && (
                            <img
                                src={preview}
                                alt="Preview"
                                className="mt-2 w-32 h-32 object-cover rounded border"
                            />
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end space-x-4">
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
