import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddButton from '../../../assets/images/addButton.png';
import AddAward from './AddAward';

function Award() {
    const [awards, setAwards] = useState([]);
    const [error, setError] = useState(null);
    const [student, setStudentData] = useState({});
    const [awardTypes, setAwardTypes] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [imageModal, setImageModal] = useState({ open: false, src: "" });

    // Fetch student data and awards
    useEffect(() => {
        const fetchData = async () => {
            const accountID = localStorage.getItem('accountID');
            if (!accountID) {
                setError('Account ID not found. Please log in.');
                return;
            }
            try {
                // Student info
                const response = await axios.get(
                    `http://localhost:8080/v1/api/account/get-user-data/${accountID}`
                );
                const studentData = response.data.metadata;
                setStudentData(studentData);

                // Awards
                const studentID = response.data.metadata.id;
                const awardResponse = await axios.get('http://localhost:8080/v1/api/award/', {
                  params: { studentID }
                });
                setAwards(awardResponse.data.metadata);

                // Award types
                const typesRes = await axios.get('http://localhost:8080/v1/api/award-type/');
                setAwardTypes(typesRes.data.metadata);
            } catch (err) {
                const errorMessage = err.response?.data?.message || 'Error fetching data';
                setError(errorMessage);
                console.error(errorMessage);
            }
        };
        fetchData();
    }, []);

    const getAwardTypeTitle = (id) => {
        const found = awardTypes.find(t => String(t.id) === String(id));
        return found ? found.title : '';
    };

    const handleImageClick = (src) => {
        setImageModal({ open: true, src });
    };

    const closeImageModal = () => {
        setImageModal({ open: false, src: "" });
    };

    const reloadAwards = async () => {
        if (!student?.id) return;
        const awardsResponse = await axios.get(
            'http://localhost:8080/v1/api/award/',
            { params: { studentID: student.id } }
        );
        setAwards(awardsResponse.data.metadata);
    };



    return (
        <div className="min-h-screen bg-gray-50 p-6 mb-[8vh]">
            {/* Page Title */}
            <div className="flex items-center justify-center mt-[8vh]">
                <h1 className="text-2xl font-bold text-[#1DA599]">Giải thưởng</h1>
            </div>

            {/* Add Award Button */}
            <div className="flex justify-end mr-8 mt-4">
                <button
                    onClick={() => setShowAddModal(true)}
                    className="w-10 h-10 bg-[#1DA599] text-white rounded-full hover:border-4 hover:border-yellow-400 hover:text-gray-700 flex items-center justify-center"
                >
                    <img src={AddButton} alt="Add" />
                </button>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mt-4 text-center text-red-500">
                    {error}
                </div>
            )}

            {/* Awards Table */}
            <div className="mt-10 max-w-8xl mx-auto bg-white shadow-md rounded-lg p-6">
                {awards.length === 0 ? (
                    <p className="text-center text-gray-500">Không có giải thưởng nào.</p>
                ) : (
                    <table className="min-w-full table-auto border border-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3 border">Mã giải thưởng</th>
                                <th className="p-3 border">Loại</th>
                                <th className="p-3 border">Mô tả</th>
                                <th className="p-3 border">Ngày nhận</th>
                                <th className="p-3 border">Trạng thái</th>
                                <th className="p-3 border">Lý do không hợp lệ</th>
                                <th className="p-3 border">Hình ảnh</th>
                            </tr>
                        </thead>
                        <tbody>
                            {awards.map((award) => (
                                <tr key={award.id} className="border-t hover:bg-gray-50">
                                    <td className="p-3 border">{award.awardNumber}</td>
                                    <td className="p-3 border">{getAwardTypeTitle(award.awardTypeID) || 'Không rõ'}</td>
                                    <td className="p-3 border">{award.description}</td>
                                    <td className="p-3 border">{award.receivedAt ? new Date(award.receivedAt).toLocaleDateString() : ''}</td>
                                    <td className="p-3 border">
                                        <span
                                            className={
                                                award.status === 'pending'
                                                    ? 'font-bold text-yellow-600'
                                                    : award.status === 'valid'
                                                        ? 'font-bold text-green-600'
                                                        : 'font-bold text-red-600'
                                            }
                                        >
                                            {award.status?.charAt(0).toUpperCase() + award.status?.slice(1)}
                                        </span>
                                    </td>
                                    <td className="p-3 border">{award.invalidReason || ''}</td>
                                    <td className="p-3 border">
                                        {award.image ? (
                                            <img
                                                crossOrigin="anonymous"
                                                src={
                                                    award.image.startsWith('http')
                                                        ? award.image
                                                        : `http://localhost:8080/${award.image}`
                                                }
                                                alt="Award"
                                                className="w-20 h-12 object-cover rounded cursor-pointer hover:scale-110 transition-transform"
                                                onClick={() =>
                                                    handleImageClick(
                                                        award.image.startsWith('http')
                                                            ? award.image
                                                            : `http://localhost:8080/${award.image}`
                                                    )
                                                }
                                            />
                                        ) : (
                                            <span className="text-gray-400">Không có</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Add Award Modal */}
            {showAddModal && (
                <AddAward
                    onClose={() => setShowAddModal(false)}
                    onAdded={reloadAwards}
                    awardTypes={awardTypes}
                    studentID={student?.id}
                />
            )}

            {/* Image Modal */}
            {imageModal.open && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
                    onClick={closeImageModal}
                >
                    <div
                        className="bg-white rounded-lg p-4 shadow-lg relative max-w-[90vw] max-h-[90vh] flex flex-col items-center"
                        onClick={e => e.stopPropagation()}
                    >
                        <button
                            className="absolute text-red-600 text-4xl top-2 right-2 text-gray-600 hover:text-red-500 text-2xl font-bold"
                            onClick={closeImageModal}
                            aria-label="Đóng"
                        >
                            x
                        </button>
                        <img
                            crossOrigin="anonymous"
                            src={imageModal.src}
                            alt="award"
                            className="max-w-[80vw] max-h-[70vh] rounded object-contain"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Award;