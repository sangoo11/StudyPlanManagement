import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddButton from '../../../assets/images/addButton.png';
import minusButton from '../../../assets/images/minusButton.png';
import AddAward from './AddAward'; 
import DeleteAward from './DeleteAward'; 
import EditAward from './EditAward'; 
import ShowLess from '../../../assets/images/showless.png';
import ShowMore from '../../../assets/images/showmore.png';

function AwardStudent() {
    const [awards, setAwards] = useState([]);
    const [error, setError] = useState(null);

    const [modals, setModals] = useState({
        addAward: { visible: false },
        deleteAward: { visible: false, awardId: null },
        editAward: { visible: false, awardId: null },
    });

    useEffect(() => {
        const fetchAwards = async () => {
            try {
                const response = await axios.get('http://localhost:8080/v1/api/award/get-all-award');
                setAwards(response.data.metadata || []); 
            } catch (err) {
                console.error('Error fetching awards:', err);
                setError('Failed to fetch awards. Please try again later.');
            }
        };

        fetchAwards(); 
    }, []);

    

    

    const openModal = (modalType, awardId = null) => {
        setModals((prev) => ({
            ...prev,
            [modalType]: { visible: true, awardId },
        }));
    };

    const closeModal = (modalType) => {
        setModals((prev) => ({ ...prev, [modalType]: { visible: false } }));
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 mb-[8vh]">
            {/* Page Title */}
            <div className="flex items-center justify-center mt-[8vh]">
                <h1 className="text-2xl font-bold text-[#1DA599]">Danh sách giải thưởng</h1>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mt-4 text-center text-red-500">
                    {error}
                </div>
            )}

            {/* Awards List */}
            <div className="mt-6">
                {awards.length > 0 ? (
                    <div>
                        <ul className="space-y-4">
                            {awards.map((award) => (
                                <li
                                    key={award.id}
                                    className="p-4 bg-white shadow rounded-md border-l-4 border-blue-500"
                                >
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        {award.awardName}
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        <strong>Loại:</strong> {award.awardType}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        <strong>Năm:</strong> {award.year}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        <strong>Mô tả:</strong> {award.description}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        <strong>Tiêu chuẩn:</strong> {award.criteria}
                                    </p>
                                    <p className={`text-sm mt-2 ${award.active ? 'text-green-600' : 'text-red-600'}`}>
                                        <strong>Tình trạng:</strong> {award.active ? 'Active' : 'Inactive'}
                                    </p>
                                    <div className="flex w-full right-0 bottom-0 space-x-4 mt-4 justify-between">
                                        {/* Edit Button */}
                                        <button
                                            onClick={() => openModal('editAward', award.id)}
                                            className="w-auto h-8 flex items-center p-2 justify-center bg-[#1DA599] text-white rounded-lg p-4 border-4 border-white hover:border-4 hover:border-yellow-400"
                                        >
                                            <span className="text-white">Chỉnh sửa</span>
                                        </button>
                                        {/* Delete Button */}
                                        <button
                                            onClick={() => openModal('deleteAward', award.id)}
                                            className="w-10 h-10 flex items-center justify-center text-white rounded-full border-4 border-white hover:border-4 hover:border-yellow-400"
                                        >
                                            <img src={minusButton} alt="Minus" />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>           
                ) : (
                    <p className="text-center text-gray-500">Không có giải thưởng nào!</p>
                )}
            </div>

            {/* Add Button */}
            <div className="flex justify-end mt-6">
                <button
                    onClick={() => openModal('addAward')}
                    className="w-10 h-10 flex items-center justify-center text-white rounded-full border-4 border-white hover:border-4 hover:border-yellow-400 mr-[2vw]"
                >
                    <img src={AddButton} alt="Add" />
                </button>
            </div>

            {/* Modal Components */}
            {modals.addAward.visible && <AddAward  onClose={() => closeModal('addAward')} />}
            {modals.editAward.visible && <EditAward awardId={modals.editAward.awardId}  onClose={() => closeModal('editAward')} />}
            {modals.deleteAward.visible && <DeleteAward awardId={modals.deleteAward.awardId} onClose={() => closeModal('deleteAward')} />}
        </div>
    );
}

export default AwardStudent;
