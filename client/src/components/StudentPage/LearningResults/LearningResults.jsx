import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentLearningResults = () => {
    const [visibleSemesters, setVisibleSemesters] = useState({});
    const [student, setStudentData] = useState({});
    const [learningOutcomes, setLearningOutcomes] = useState([]);


    // Fetch student data
    useEffect(() => {
        const getStudentData = async () => {
            const accountID = localStorage.getItem('accountID');
            try {
                const { data } = await axios.get(
                    `http://localhost:8080/v1/api/account/get-user-data/${accountID}`
                );
                setStudentData(data.metadata);

                // Fetch learning outcomes for the student
                const studentID = data.metadata.id;
                const outcomesResponse = await axios.get(
                    `http://localhost:8080/v1/api/student/get-student-learning-outcome-score/${studentID}`
                );
                setLearningOutcomes(outcomesResponse.data.metadata);
            } catch (error) {
                console.error(error.response?.data?.message || 'Error fetching data');
            }
        };
        getStudentData();
    }, []);

    return (
        <div className='min-h-screen flex flex-col items-center bg-gray-100 pt-[10vh] pb-[4vh]'>
            <div className='w-full max-w-3xl bg-white rounded-lg shadow-md p-6'>
                <h1 className='text-4xl font-semibold text-center text-[#1DA599] pb-8'>Kết quả học tập</h1>

                {/* Learning outcomes table */}
                <div className='overflow-x-auto'>
                    {learningOutcomes.length > 0 ? (
                        <table className='table-auto w-full border-separate border-spacing-0 border border-gray-200'>
                            <thead className='bg-[#1DA599] text-white'>
                                <tr>
                                    <th className='px-6 py-4 text-left'>Mã tiêu chuẩn</th>
                                    <th className='px-6 py-4 text-left'>Mức độ cao nhất</th>
                                </tr>
                            </thead>
                            <tbody>
                                {learningOutcomes.map((outcome) => (
                                    <tr key={outcome.id} className='hover:bg-gray-50'>
                                        <td className='px-6 py-4 border-b'>
                                            {outcome.LearningOutcome.learningOutcomeCode}
                                        </td>
                                        <td className='px-6 py-4 border-b'>
                                            {outcome.highestLevel || 'N/A'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className='text-center text-gray-500 mt-4'>No learning outcomes available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentLearningResults;
