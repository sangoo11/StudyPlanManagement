import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddButton from '../../../assets/images/addButton.png';
import minusButton from '../../../assets/images/minusButton.png';
import AddAward from './AddAward';
import DeleteAward from './DeleteAward';
import EditAward from './EditAward';
import ShowLess from '../../../assets/images/showless.png';
import ShowMore from '../../../assets/images/showmore.png';
import AddStudent from './AddStudentToAward';
import DeleteStudent from './DeleteStudentToAward';

function AwardStudent() {
    const [awards, setAwards] = useState([]);
    const [error, setError] = useState(null);
    const [visibleAwards, setVisibleAwards] = useState({});
    const [studentsData, setStudentsData] = useState({});
    const [toggledAwardId, setToggledAwardId] = useState(null);

    const [modals, setModals] = useState({
        addAward: { visible: false },
        deleteAward: { visible: false, awardId: null },
        editAward: { visible: false, awardId: null },
        addStudent: { visible: false, awardId: null },
        deleteStudent: { visible: false, awardId: null },
    });

    const fetchAwards = async () => {
        try {
            const response = await axios.get('http://localhost:8080/v1/api/award/');
            setAwards(response.data.metadata || []);
        } catch (err) {
            console.error('Error fetching awards:', err);
            setError('Failed to fetch awards. Please try again later.');
        }
    };

    useEffect(() => {
        fetchAwards();
    }, []);

    const toggleAwardVisibility = (awardId) => {
        setVisibleAwards((prev) => ({
            ...prev,
            [awardId]: !prev[awardId],
        }));
        setToggledAwardId(awardId); // Track the toggled awardId
    };

    useEffect(() => {
        const fetchStudentsData = async (awardId) => {
            try {
                const response = await axios.get(`http://localhost:8080/v1/api/award/get-student/${awardId}`);
                setStudentsData((prev) => ({
                    ...prev,
                    [awardId]: response.data.metadata,
                }));
            } catch (err) {
                console.error(`Error fetching students for award ${awardId}:`, err);
                setError(`Failed to fetch students for award ID ${awardId}.`);
            }
        };

        if (toggledAwardId && visibleAwards[toggledAwardId]) {
            fetchStudentsData(toggledAwardId);
        }
    }, [toggledAwardId, visibleAwards, studentsData]);

    const openModal = (modalType, awardId = null) => {
        setModals((prev) => ({
            ...prev,
            [modalType]: { visible: true, awardId },
        }));
    };

    const closeModal = (modalType) => {
        setModals((prev) => ({ ...prev, [modalType]: { visible: false, awardId: null } }));
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 mb-[8vh]">
            <div className="flex items-center justify-center mt-[8vh]">
                <h1 className="text-2xl font-bold text-[#1DA599]">Danh sách giải thưởng</h1>
            </div>

            {error && <div className="mt-4 text-center text-red-500">{error}</div>}

            <div className="mt-6">
                {awards.length > 0 ? (
                    <ul className="space-y-4">
                        {awards.map((award) => (
                            <li
                                key={award.id}
                                className="relative p-4 bg-white shadow rounded-md border-l-4 border-blue-500"
                            >
                                <button
                                    className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-gray-200"
                                    onClick={() => toggleAwardVisibility(award.id)}
                                >
                                    <img
                                        src={visibleAwards[award.id] ? ShowLess : ShowMore}
                                        alt={visibleAwards[award.id] ? 'Show Less' : 'Show More'}
                                    />
                                </button>

                                <h2 className="text-lg font-semibold text-gray-800">{award.awardNumber}</h2>
                                <p className="text-sm text-gray-500">
                                    <strong>Loại:</strong> {award.type}
                                </p>
                                <p className="text-sm text-gray-500">
                                    <strong>Năm:</strong> {award.year}
                                </p>
                                <p className="text-sm text-gray-500">
                                    <strong>Mô tả:</strong> {award.description}
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

                                {visibleAwards[award.id] && (
                                    <div className="mt-6">
                                        <div className="flex space-x-4 mb-4">
                                            <button
                                                onClick={() => openModal('addStudent', award.id)}
                                                className="w-auto h-8 flex items-center px-4 bg-green-500 text-white rounded-lg"
                                            >
                                                Thêm sinh viên
                                            </button>
                                            <button
                                                onClick={() => openModal('deleteStudent', award.id)}
                                                className="w-auto h-8 flex items-center px-4 bg-red-500 text-white rounded-lg"
                                            >
                                                Xóa sinh viên
                                            </button>
                                        </div>
                                        {studentsData[award.id] ? (
                                            <div>
                                                <table className="w-full border border-gray-300 bg-white rounded-md shadow-md">
                                                    <thead className="bg-gray-200">
                                                        <tr>
                                                            <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                                                                Mã số sinh viên
                                                            </th>
                                                            <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                                                                Tên sinh viên
                                                            </th>
                                                            <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                                                                Chuyên ngành
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {studentsData[award.id].map((student, index) => (
                                                            <tr
                                                                key={student.Student.id}
                                                                className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                                                    }`}
                                                            >
                                                                <td className="py-3 px-6 text-sm text-gray-600">
                                                                    {student.Student.id}
                                                                </td>
                                                                <td className="py-3 px-6 text-sm text-gray-600">
                                                                    {student.Student.fullName}
                                                                </td>
                                                                <td className="py-3 px-6 text-sm text-gray-600">
                                                                    {student.Student.major}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>

                                            </div>
                                        ) : (
                                            <p className="text-sm text-gray-500">Loading students...</p>
                                        )}
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-500">Không có giải thưởng nào!</p>
                )}
            </div>

            <div className="flex justify-end mt-6">
                <button
                    onClick={() => openModal('addAward')}
                    className="w-10 h-10 flex items-center justify-center text-white rounded-full border-4 border-white hover:border-yellow-400"
                >
                    <img src={AddButton} alt="Add" />
                </button>
            </div>

            {/* Modal Components */}
            {modals.addAward.visible && <AddAward onClose={() => closeModal('addAward')} />}
            {modals.editAward.visible && <EditAward awardId={modals.editAward.awardId} onClose={() => closeModal('editAward')} />}
            {modals.deleteAward.visible && <DeleteAward awardId={modals.deleteAward.awardId} onClose={() => closeModal('deleteAward')} />}
            {modals.addStudent.visible && (
                <AddStudent awardId={modals.addStudent.awardId} onClose={() => closeModal('addStudent')} />
            )}
            {modals.deleteStudent.visible && (
                <DeleteStudent awardId={modals.deleteStudent.awardId} onClose={() => closeModal('deleteStudent')} />
            )}
        </div>
    );
}

export default AwardStudent;
