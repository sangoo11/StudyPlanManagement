import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DetailPoint from './DetailPoint';
import LearningOutcomeSubjectsModal from './DetailLO';


const StudentLearningResults = () => {
    const [student, setStudentData] = useState({});
    const [learningOutcomes, setLearningOutcomes] = useState([]);
    const [scoreTable, setScoreTable] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedSubjectCourses, setSelectedSubjectCourses] = useState([]);
    const [loModalOpen, setLoModalOpen] = useState(false);
    const [loSubjects, setLoSubjects] = useState([]);
    const [loModalTitle, setLoModalTitle] = useState('');

    useEffect(() => {
        const getStudentData = async () => {
            const accountID = localStorage.getItem('accountID');
            try {
                const { data } = await axios.get(
                    `http://localhost:8080/v1/api/account/get-user-data/${accountID}`
                );
                const studentData = data.metadata;
                setStudentData(studentData);

                // Fetch learning outcomes
                const outcomesResponse = await axios.get(
                    `http://localhost:8080/v1/api/student/get-student-learning-outcome-score/?studentID=${studentData.id}`
                );
                setLearningOutcomes(outcomesResponse.data.metadata);

                // Fetch score table
                const scoreResponse = await axios.get(
                    `http://localhost:8080/v1/api/score/${studentData.id}`
                );
                const scores = scoreResponse.data.metadata || [];
                setScoreTable(scores);
            } catch (error) {
                console.error(error.response?.data?.message || 'Error fetching data');
            }
        };
        getStudentData();
    }, []);

    const getScoreByType = (scores, type) => {
        const scoreObj = scores.find((s) => s.scoreType === type);
        return scoreObj ? scoreObj.score : 'N/A';
    };
    const getUniqueCourses = (courses) => {
        const map = new Map();
        courses.forEach((item) => {
            const subjectId = item.Course?.Subject?.id;
            if (!subjectId) return;
            const prev = map.get(subjectId);
            // Parse finalGrade as float, treat null as -Infinity
            const grade = parseFloat(item.finalGrade) || -Infinity;
            const prevGrade = prev ? (parseFloat(prev.finalGrade) || -Infinity) : -Infinity;
            if (!prev || grade > prevGrade) {
                map.set(subjectId, item);
            }
        });
        return Array.from(map.values());
    };

    // Handler to open modal with all courses of a subject
    const handleRowClick = (subjectId) => {
        const courses = scoreTable.filter(
            (item) => item.Course?.Subject?.id === subjectId
        );
        setSelectedSubjectCourses(courses);
        setModalOpen(true);
    };

    const handleLearningOutcomeClick = async (learningOutcome) => {
        try {
            // Get the correct learningOutcomeID to compare
            const loId = learningOutcome.LearningOutcome?.id || learningOutcome.LearningOutcomeID || learningOutcome.id;
            const subjectIds = [
                ...new Set(scoreTable.map(item => item.Course?.Subject?.id).filter(Boolean))
            ];
            let matchedSubjects = [];
            for (const subjectID of subjectIds) {
                const { data } = await axios.get(
                    `http://localhost:8080/v1/api/learning-outcome/get-all-learning-outcome/${subjectID}`
                );
                const los = data.metadata || [];
                // Compare as numbers to avoid type mismatch
                if (los.some(lo => Number(lo.learningOutcomeID) === Number(loId))) {
                    const courses = scoreTable.filter(item => item.Course?.Subject?.id === subjectID);
                    matchedSubjects.push({
                        subject: courses[0]?.Course?.Subject,
                        courses
                    });
                }
            }
            setLoSubjects(matchedSubjects);
            setLoModalTitle(learningOutcome.LearningOutcome?.learningOutcomeCode || learningOutcome.learningOutcomeCode || '');
            setLoModalOpen(true);
        } catch (err) {
            setLoSubjects([]);
            setLoModalTitle('');
            setLoModalOpen(true);
        }
    };

    return (
        <div className='min-h-screen flex flex-col items-center bg-gray-100 pt-[10vh] pb-[4vh]'>
            <div className='w-full max-w-5xl bg-white rounded-lg shadow-md p-6'>

                <h1 className='text-4xl font-semibold text-center text-[#1DA599] pb-8'>KẾT QUẢ HỌC TẬP</h1>

                {/* Score Table */}
                <div className='overflow-x-auto mb-12'>
                    {scoreTable.length > 0 ? (
                        <table className='table-auto w-full border border-gray-200'>
                            <thead className='bg-[#1DA599] text-white'>
                                <tr>
                                    <th className='px-4 py-3 text-left'>Môn học</th>
                                    <th className='px-4 py-3 text-left'>Mã môn học</th>
                                    <th className='px-4 py-3 text-left'>Mã lớp</th>
                                    <th className='px-4 py-3 text-left'>Quá trình</th>
                                    <th className='px-4 py-3 text-left'>Giữa kỳ</th>
                                    <th className='px-4 py-3 text-left'>Cuối kỳ</th>
                                    <th className='px-4 py-3 text-left'>Tổng kết</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getUniqueCourses(scoreTable).map((item) => (
                                    <tr
                                        key={item.id}
                                        className='hover:bg-gray-50 cursor-pointer'
                                        onClick={() => handleRowClick(item.Course?.Subject?.id)}
                                    >
                                        <td className='px-4 py-3 border-b'>
                                            {item.Course?.Subject?.subjectName || 'N/A'}
                                        </td>
                                        <td className='px-4 py-3 border-b'>
                                            {item.Course?.Subject?.subjectCode || 'N/A'}
                                        </td>
                                        <td className='px-4 py-3 border-b'>
                                            {item.Course?.courseCode || 'N/A'}
                                        </td>
                                        <td className='px-4 py-3 border-b'>
                                            {getScoreByType(item.scores, 'progress')}
                                        </td>
                                        <td className='px-4 py-3 border-b'>
                                            {getScoreByType(item.scores, 'midterm')}
                                        </td>
                                        <td className='px-4 py-3 border-b'>
                                            {getScoreByType(item.scores, 'final')}
                                        </td>
                                        <td className='px-4 py-3 border-b'>
                                            {item.finalGrade || 'N/A'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className='text-center text-gray-500 mt-4'>No score data available.</p>
                    )}
                </div>

                <h1 className='text-4xl font-semibold text-center text-[#1DA599] pb-8'>TIÊU CHUẨN ĐẦU RA</h1>

                {/* Learning Outcomes Table */}
                <div className='overflow-x-auto'>
                    {learningOutcomes.length > 0 ? (
                        <table className='table-auto w-full border border-gray-200'>
                            <thead className='bg-[#1DA599] text-white'>
                                <tr>
                                    <th className='px-6 py-4 text-left'>Mã tiêu chuẩn</th>
                                    <th className='px-6 py-4 text-left'>Mức độ cao nhất</th>
                                </tr>
                            </thead>
                            <tbody>
                                {learningOutcomes.map((outcome) => (
                                    <tr
                                        key={outcome.id}
                                        className='hover:bg-gray-50 cursor-pointer'
                                        onClick={() => handleLearningOutcomeClick(outcome)}
                                    >
                                        <td className='px-6 py-4 border-b'>
                                            {outcome.LearningOutcome?.learningOutcomeCode || 'N/A'}
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

                {/* Modal for course details */}
                {modalOpen && (
                    <DetailPoint
                        courses={selectedSubjectCourses}
                        onClose={() => setModalOpen(false)}
                    />
                )}
                {loModalOpen && (
                    <LearningOutcomeSubjectsModal
                        title={loModalTitle}
                        subjects={loSubjects}
                        onClose={() => setLoModalOpen(false)}
                    />
                )}

            </div>
        </div>
    );
};

export default StudentLearningResults;
