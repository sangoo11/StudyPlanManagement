import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SetActive({ onClose, onActive}) {
    const [inactiveTeachers, setInactiveTeachers] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    // Fetch inactive teachers on component mount
    useEffect(() => {
        const fetchInactiveTeachers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/v1/api/teacher/get-all-inactive-teacher');
                setInactiveTeachers(response.data.metadata);
                setIsLoading(false);
            } catch (err) {
                setError('Failed to fetch inactive teachers.');
                setIsLoading(false);
            }
        };

        fetchInactiveTeachers();
    }, []);

    // Handle activating a teacher
    const activateTeacher = async () => {
        if (!selectedTeacher) {
            alert('Please select a teacher to activate.');
            return;
        }

        const accountID = selectedTeacher.split(' - ')[0]; // Extract accountID from the dropdown value
        try {
            await axios.put(`http://localhost:8080/v1/api/account/activate-account/${accountID}`);
            setSuccessMessage('Teacher account activated successfully!');
            setInactiveTeachers((prev) => prev.filter((teacher) => teacher.accountID !== parseInt(accountID)));
            setSelectedTeacher('');
            if (onActive) {
                onActive();
            }
            onClose();
        } catch (err) {
            alert('Failed to activate the teacher account. Please try again.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="flex flex-col w-[50vw] h-auto bg-gray-200 p-6 rounded">
                {/* Title */}
                <div className="flex items-center justify-center mt-[2vh]">
                    <h1 className="text-3xl font-bold text-[#1DA599] mb-6 text-center">
                        Kích hoạt giáo viên
                    </h1>
                </div>

                {/* Error or Success Messages */}
                {error && <p className="text-center text-red-500">{error}</p>}
                {successMessage && <p className="text-center text-green-500">{successMessage}</p>}

                {/* Dropdown */}
                <div className="mt-4">
                    {isLoading ? (
                        <p className="text-center text-gray-500">Loading inactive teachers...</p>
                    ) : inactiveTeachers.length > 0 ? (
                        <div className="flex flex-col items-center">
                            <label htmlFor="teacher-select" className="text-gray-700 mb-2">
                                Chọn giáo viên để kích hoạt:
                            </label>
                            <select
                                id="teacher-select"
                                value={selectedTeacher}
                                onChange={(e) => setSelectedTeacher(e.target.value)}
                                className="w-full max-w-md p-2 border border-gray-300 rounded"
                            >
                                <option value="">-- Select Teacher --</option>
                                {inactiveTeachers.map((teacher) => (
                                    <option
                                        key={teacher.accountID}
                                        value={`${teacher.accountID} - ${teacher.fullName}`}
                                    >
                                        {`${teacher.accountID} - ${teacher.fullName}`}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">No inactive teachers found.</p>
                    )}
                </div>

                {/* Activate Button */}
                <div className="flex justify-center mt-6 space-x-12">
                    <button
                        onClick={activateTeacher}
                        className="w-[10vw] h-[8vh] border-4 border-grey-200 hover:border-yellow-400 items-center p-4 font-bold bg-[#1DA599] text-white rounded-lg"
                    >
                        <p className="flex h-full w-full ml-4 mb-[1vh]">Kích hoạt</p>
                    </button>
                    <button
                        onClick={onClose} // Close the modal
                        className="w-[10vw] h-[8vh] border-4 border-grey-200 hover:border-yellow-400 items-center p-4 font-bold bg-red-500 text-white rounded-lg"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SetActive;
