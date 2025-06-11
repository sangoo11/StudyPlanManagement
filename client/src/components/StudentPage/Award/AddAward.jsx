import React, { useState } from 'react';
import axios from 'axios';

function AddAward({ onClose, onAdded, awardTypes, studentID }) {
    const [form, setForm] = useState({
        awardNumber: '',
        awardTypeID: '',
        description: '',
        receivedAt: '',
        image: null,
    });
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setForm({ ...form, image: files[0] });
            setPreview(URL.createObjectURL(files[0]));
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = new FormData();
            data.append('awardNumber', form.awardNumber); // Add this line
            data.append('awardTypeID', String(form.awardTypeID));
            data.append('description', form.description);
            data.append('receivedAt', form.receivedAt);
            data.append('studentID', String(studentID));
            if (form.image) data.append('image', form.image);

            for (let pair of data.entries()) {
                console.log(pair[0]+ ': ' + pair[1]);
            }

            await axios.post('http://localhost:8080/v1/api/award/', data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            onAdded();
            onClose();
        } catch (err) {
            alert('Thêm giải thưởng thất bại!');
            console.error(err?.response?.data || err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md relative">
                <button
                    className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-2xl font-bold"
                    onClick={onClose}
                >
                    ×
                </button>
                <h2 className="text-xl font-bold mb-4 text-[#1DA599]">Thêm giải thưởng</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium">Mã giải thưởng</label>
                        <input
                            type="text"
                            name="awardNumber"
                            value={form.awardNumber}
                            onChange={handleChange}
                            required
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Loại giải thưởng</label>
                        <select
                            name="awardTypeID"
                            value={form.awardTypeID}
                            onChange={handleChange}
                            required
                            className="w-full border rounded px-3 py-2"
                        >
                            <option value="">Chọn loại</option>
                            {awardTypes.map(type => (
                                <option key={type.id} value={type.id}>{type.title}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Mô tả</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            required
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Ngày nhận</label>
                        <input
                            type="date"
                            name="receivedAt"
                            value={form.receivedAt}
                            onChange={handleChange}
                            required
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Hình ảnh</label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                            className="w-full"
                        />
                        {preview && (
                            <img src={preview} alt="Preview" className="mt-2 w-32 h-20 object-cover rounded" />
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#1DA599] text-white py-2 rounded hover:bg-[#17897c] font-semibold"
                    >
                        {loading ? 'Đang thêm...' : 'Thêm'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddAward;