import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Award() {
    const [awards, setAwards] = useState([]);
    const [error, setError] = useState(null);
    const [student, setStudentData] = useState({});

    // Fetch student data
    useEffect(() => {
        const fetchStudentData = async () => {
            const accountID = localStorage.getItem('accountID');
            if (!accountID) {
                setError('Account ID not found. Please log in.');
                return;
            }

            try {
                // Fetch student information
                const response = await axios.get(
                    `http://localhost:8080/v1/api/account/get-user-data/${accountID}`
                );
                const studentData = response.data.metadata.metadata;
                setStudentData(studentData);

                // Fetch awards for the student
                const studentID = response.data.metadata.id;
                const awardsResponse = await axios.get(
                    `http://localhost:8080/v1/api/award/get-award-by-student/${studentID}`
                );
                setAwards(awardsResponse.data.metadata);
            } catch (err) {
                const errorMessage = err.response?.data?.message || 'Error fetching data';
                setError(errorMessage);
                console.error(errorMessage);
            }
        };

        fetchStudentData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-6 mb-[8vh]">
            {/* Page Title */}
            <div className="flex items-center justify-center mt-[8vh]">
                <h1 className="text-2xl font-bold text-[#1DA599]">Giải thưởng</h1>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mt-4 text-center text-red-500">
                    {error}
                </div>
            )}

            {/* Awards List */}
            {awards.length > 0 ? (
                <div className="mt-6 space-y-4">
                    {awards.map((award) => (
                        <div key={award.id} className="p-4 bg-white shadow rounded-md">
                            <h2 className="text-lg font-semibold text-gray-800">
                                {award.awardName}
                            </h2>
                            <p className="text-gray-600">{award.description}</p>
                            <p className="text-gray-500 text-sm">Year: {award.year}</p>
                            <p className="text-gray-500 text-sm">Type: {award.awardType}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="mt-6 text-center text-gray-500">
                    No awards found for the student.
                </div>
            )}
        </div>
    );
}

export default Award;
