import React from 'react';
import ShowMore from '../../assets/images/showmore.png';
import ShowLess from '../../assets/images/showless.png';

function TeacherPage(props) {

    // State to track visibility for semesters
    const [visibleSemesters, setVisibleSemesters] = React.useState({});

    // Toggle visibility for a specific semester
    const toggleSemesterVisibility = (semesterId) => {
        setVisibleSemesters((prev) => ({
            ...prev,
            [semesterId]: !prev[semesterId],
        }));
    };

    // Table data
    const semesters = [
        {
            id: 'semester1',
            title: 'Học kỳ 1 2024-2025',
            courses: [
                {
                    code: 'DSA',
                    name: 'Cấu trúc dữ liệu và giải thuật',
                    qt: '9.0',
                    gk: '8.0',
                    ck: '8.0',
                    avg: '8.5',
                    weight: '0.6',
                },
                {
                    code: 'SE100',
                    name: 'Nhập môn phần mềm',
                    qt: '8.5',
                    gk: '7.5',
                    ck: '8.0',
                    avg: '8.0',
                    weight: '0.5',
                },
            ],
        },
        {
            id: 'semester2',
            title: 'Học kỳ 2 2024-2025',
            courses: [
                {
                    code: 'Math101',
                    name: 'Toán cao cấp',
                    qt: '8.0',
                    gk: '7.5',
                    ck: '8.5',
                    avg: '8.0',
                    weight: '0.7',
                },
            ],
        },
    ];

    return (
        <div className='min-h-screen bg-gray-50 p-6'>
            <div className="flex items-center justify-center mt-[8vh]">
                <h1 className="text-3xl font-bold text-[#1DA599] mb-6 text-center">
                    Quản lý kết quả học tập
                </h1>
            </div>

            <div className="flex flex-col mb-8">
                {/* Major Dropdown */}
                <div className="flex mb-4 items-center ml-6">
                    <label className="text-gray-700 font-medium mr-4">Mã môn học:</label>
                    <select
                        className="px-4 py-2 border rounded-md bg-white"
                        //value={selectedMajor}
                        //onChange={(e) => setSelectedMajor(e.target.value)}
                    >
                        <option value="2023-2024">SE100</option>
                        <option value="2024-2025">SE200</option>
                        <option value="2025-2026">SE300</option>
                    </select>
                </div>
                {/* Year Dropdown */}
                <div className="flex mb-4 items-center ml-6">
                    <label className="text-gray-700 font-medium mr-4">Năm học:</label>
                    <select
                        className="px-4 py-2 border rounded-md bg-white ml-[2.6vw]"
                        //value={selectedYear}
                        //onChange={(e) => setSelectedYear(e.target.value)}
                    >
                        <option value="2023-2024">2023-2024</option>
                        <option value="2024-2025">2024-2025</option>
                        <option value="2025-2026">2025-2026</option>
                    </select>
                </div>
                {/* Semester Dropdown */}
                <div className="flex mb-4 items-center ml-6">
                    <label className="text-gray-700 font-medium mr-4">Học kỳ:</label>
                    <select
                        className="px-4 py-2 border rounded-md bg-white ml-[3.6vw]"
                        //value={selectedSemester}
                        //onChange={(e) => setSelectedSemester(Number(e.target.value))}
                    >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                    </select>
                </div>
            </div>

            <div className='border-t border-[1px] border-gray-200'></div>
                


        </div>    
    );
}

export default TeacherPage;