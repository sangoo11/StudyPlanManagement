import React, { useEffect, useState } from 'react';

const getScoreByType = (scores, type) => {
    const scoreObj = scores?.find((s) => s.scoreType === type);
    return scoreObj ? scoreObj.score : 'N/A';
};

const getStatusLabel = (status) => {
    switch (status) {
        case 'pass':
            return <span className="text-green-600 font-bold">Đã hoàn thành</span>;
        case 'fail':
            return <span className="text-red-600 font-bold">Trượt</span>;
        case 'enrolled':
            return <span className="text-yellow-600 font-bold">Đang học</span>;
        default:
            return <span className="text-gray-600">{status || 'N/A'}</span>;
    }
};

const DetailCourse = ({ courses, onClose }) => {
    const [learningOutcomes, setLearningOutcomes] = useState([]);

    const subject = courses[0]?.Course?.Subject;

    useEffect(() => {
        if (subject?.id) {
            fetch(`http://localhost:8080/v1/api/learning-outcome/get-all-learning-outcome/${subject.id}`)
                .then(res => res.json())
                .then(data => {
                    if (data?.metadata) setLearningOutcomes(data.metadata);
                })
                .catch(() => setLearningOutcomes([]));
        }
    }, [subject?.id]);

    // Determine if the student passed this subject
    const isPassed = courses.some((item) => item.status === 'pass');

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-lg p-8 min-w-[600px] max-w-3xl shadow-lg relative">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
                    onClick={onClose}
                    title="Đóng"
                >
                    &times;
                </button>
                <h2 className="text-2xl font-bold mb-2 text-[#1DA599]">
                    {subject?.subjectName || 'Môn học'}
                </h2>
                <p className="mb-4 text-gray-600">
                    Mã môn học: <span className="font-semibold">{subject?.subjectCode || 'N/A'}</span>
                </p>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border border-gray-200 mb-2">
                        <thead className="bg-[#1DA599] text-white">
                            <tr>
                                <th className="px-3 py-2 text-left">Mã lớp</th>
                                <th className="px-3 py-2 text-left">Năm học</th>
                                <th className="px-3 py-2 text-left">Quá trình</th>
                                <th className="px-3 py-2 text-left">Giữa kỳ</th>
                                <th className="px-3 py-2 text-left">Cuối kỳ</th>
                                <th className="px-3 py-2 text-left">Tổng kết</th>
                                <th className="px-3 py-2 text-left">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-3 py-2 border-b">{item.Course?.courseCode || 'N/A'}</td>
                                    <td className="px-3 py-2 border-b">{item.Course?.year || 'N/A'}</td>
                                    <td className="px-3 py-2 border-b">{getScoreByType(item.scores, 'progress')}</td>
                                    <td className="px-3 py-2 border-b">{getScoreByType(item.scores, 'midterm')}</td>
                                    <td className="px-3 py-2 border-b">{getScoreByType(item.scores, 'final')}</td>
                                    <td className="px-3 py-2 border-b">{item.finalGrade || 'N/A'}</td>
                                    <td className="px-3 py-2 border-b">{getStatusLabel(item.status)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* New Table for Learning Outcomes */}
                <div className="overflow-x-auto mt-6">
                    <h3 className="text-lg font-semibold mb-2 text-[#1DA599]">Chuẩn đầu ra môn học</h3>
                    <table className="table-auto w-full border border-gray-200">
                        <thead className="bg-[#1DA599] text-white">
                            <tr>
                                <th className="px-3 py-2 text-left">Mã tiêu chuẩn</th>
                                <th className="px-3 py-2 text-left">Mức độ</th>
                                <th className="px-3 py-2 text-left">Mức độ đạt được</th>
                            </tr>
                        </thead>
                        <tbody>
                            {learningOutcomes.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="px-3 py-2 text-center text-gray-500">Không có dữ liệu</td>
                                </tr>
                            ) : (
                                learningOutcomes.map((outcome, idx) => (
                                    <tr key={outcome.learningOutcomeID || idx} className="hover:bg-gray-50">
                                        <td className="px-3 py-2 border-b">{outcome.learningOutcomeID || 'N/A'}</td>
                                        <td className="px-3 py-2 border-b">{outcome.level || 'N/A'}</td>
                                        <td className="px-3 py-2 border-b">
                                            {isPassed ? (outcome.level || 'N/A') : 'N/A'}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <button
                    className="mt-4 px-4 py-2 bg-[#1DA599] text-white rounded hover:bg-[#17897d] w-full"
                    onClick={onClose}
                >
                    Đóng
                </button>
            </div>
        </div>
    );
};

export default DetailCourse;