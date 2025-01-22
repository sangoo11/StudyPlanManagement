import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SetActive from './SetActive';

function ActiveTeacher() {
    const [inactiveTeachers, setInactiveTeachers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    // Fetch inactive teachers on component mount
    useEffect(() => {
        fetchInactiveTeachers();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Page Title */}
            <div className="flex items-center justify-center mt-[8vh]">
                <h1 className="text-3xl font-bold text-[#1DA599] mb-6 text-center">
                    Kích hoạt tài khoản giáo viên
                </h1>
            </div>

            {/* Display loading, error, or teacher data */}
            <div className="mt-6">
                {isLoading ? (
                    <p className="text-center text-gray-500">Loading inactive teachers...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : inactiveTeachers.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200 shadow rounded-lg">
                            <thead className="bg-[#1DA599] text-white">
                                <tr>
                                    <th className="px-4 py-2 text-left">ID</th>
                                    <th className="px-4 py-2 text-left">Full Name</th>
                                    <th className="px-4 py-2 text-left">Major</th>
                                    <th className="px-4 py-2 text-left">Status</th>
                                    <th className="px-4 py-2 text-left">Account ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inactiveTeachers.map((teacher) => (
                                    <tr key={teacher.id} className="border-b">
                                        <td className="px-4 py-2">{teacher.id}</td>
                                        <td className="px-4 py-2">{teacher.fullName}</td>
                                        <td className="px-4 py-2">{teacher.major}</td>
                                        <td className="px-4 py-2">{teacher.status}</td>
                                        <td className="px-4 py-2">{teacher.accountID}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No inactive teachers found.</p>
                )}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex w-[10vw] h-[4vh] border-4 border-white hover:border-4 hover:border-yellow-400 items-center p-4 font-bold bg-[#1DA599] text-white mt-[2vh] rounded-lg"
                >
                    <p className="ml-[1vw]">Kích hoạt</p>
                </button>
            </div>

            {/* SetActive modal */}
            {isModalOpen && (
                <SetActive
                    onClose={() => setIsModalOpen(false)}
                    onActive = {fetchInactiveTeachers}
                />
            )}
        </div>
    );
}

export default ActiveTeacher;
