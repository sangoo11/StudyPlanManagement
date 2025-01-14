import React from 'react';
import ShowMore from '../../assets/images/showmore.png';
import ShowLess from '../../assets/images/showless.png';
import minusButton from '../../assets/images/minusButton.png';
import axios from 'axios'

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
            title: 'Mã tiêu chuẩn 1: ',
            demand: 'Nội dung tiêu chuẩn 1 : Thông hiểu kiến thức và có thể áp dụng trên thực tế',
            courses: [
                {
                    code: 'DSA',
                    name: 'Cấu trúc dữ liệu và giải thuật',
                    weight: '0.6',
                },
                {
                    code: 'SE100',
                    name: 'Nhập môn phần mềm',
                    weight: '0.5',
                },
            ],
        },
        {
            id: 'semester2',
            title: 'Mã tiêu chuẩn 1: ',
            demand: 'Thông hiểu kiến thức và có thể áp dụng trên thực tế',
            courses: [
                {
                    code: 'Math101',
                    name: 'Toán cao cấp',
                    weight: '0.7',
                },
            ],
        },
    ];

    const [selectedSemester, setSelectedSemester] = React.useState('');

    const [selectedYear, setSelectedYear] = React.useState('');
    const [yearArray, setYearArray] = React.useState([]);
    React.useEffect(() => {
        const getAllCoursesYear = async () => {
            try {
                const response = await axios.get('http://localhost:8080/v1/api/course/get-all-course-year');
                setYearArray(response.data.metadata)
            } catch (error) {
                console.error(error.response.data.message);
            }
        }
        getAllCoursesYear();
    }, []);

    const [selectedSubject, setSelectedSubject] = React.useState('')
    const [subjectArray, setSubjectArray] = React.useState([])
    React.useEffect(() => {
        const getAllSubjectCode = async () => {
            try {
                const response = await axios.get('http://localhost:8080/v1/api/subject/get-all-subject-code');
                setSubjectArray(response.data.metadata)
            } catch (error) {
                console.error(error.response.data.message);
            }
        }
        getAllSubjectCode()
    })

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
                        className="px-4 py-2 border rounded-md bg-white ml-[1vw]"
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                    >
                        <option value="">Chọn môn học</option>
                        {subjectArray.map((subject, index) => (
                            <option key={index} value={subject.subjectCode}>
                                {subject.subjectCode}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Year Dropdown */}
                <div className="flex mb-4 items-center ml-6">
                    <label className="text-gray-700 font-medium mr-4">Năm học:</label>
                    <select
                        className="px-4 py-2 border rounded-md bg-white ml-[2.6vw]"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                    >
                        <option value="">Chọn năm</option>
                        {yearArray.map((year, index) => (
                            <option key={index} value={year.year}>
                                {year.year}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Semester Dropdown */}
                <div className="flex mb-4 items-center ml-6">
                    <label className="text-gray-700 font-medium mr-4">Học kỳ:</label>
                    <select
                        className="px-4 py-2 border rounded-md bg-white ml-[3.6vw]"
                        value={selectedSemester}
                        onChange={(e) => setSelectedSemester(Number(e.target.value))}
                    >
                        <option value="">Chọn học kỳ</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                    </select>
                </div>
            </div>

            <div className='border-t border-[1px] border-gray-200'>
                {/* HK1 2024-2025 */}
                <div className="flex flex-col mt-4 space-y-4">
                    {semesters.map((semester) => (
                        <div key={semester.id} className="flex flex-col bg-white shadow-lg rounded-lg border border-gray-300 overflow-hidden">
                            {/* Semester Header */}
                            <div className="flex justify-between items-center p-4 bg-[#f9f9f9] border-b border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-800">{semester.title} {semester.id}</h2>
                                <button
                                    className="flex justify-center items-center w-8 h-8 rounded-full hover:bg-gray-200 transition mr-[60vw]"
                                    onClick={() => toggleSemesterVisibility(semester.id)}
                                >
                                    <img
                                        src={visibleSemesters[semester.id] ? ShowLess : ShowMore}
                                        alt={visibleSemesters[semester.id] ? 'Show Less' : 'Show More'}
                                    />
                                </button>
                                <div className="flex items-center space-x-2">
                                    {/* Delete button */}
                                    <button
                                        className="flex justify-center items-center w-11 h-full rounded-full hover:border-4 hover:border-yellow-400  transition border-4 border-white"
                                        onClick={() => setDeleteCriteriaVisible(true)}
                                    >
                                        <img src={minusButton} alt="Delete Subject" />
                                    </button>
                                </div>
                            </div>
                            {/* Semester Table */}
                            {visibleSemesters[semester.id] && (
                                <div className="flex flex-col p-[1vh] mb-[2vh]">
                                    <h3 className="text-xl mb-[1vw]">{semester.demand}</h3>
                                    <div className="flex h-[6vh] w-full bg-green-200 items-center justify-between space-x-4 font-bold border-2 border-black">
                                        <h2 className="flex w-1/3 h-full justify-center border-r-2 border-black pt-2">Mã môn học</h2>
                                        <h2 className="flex w-1/3 h-full justify-center border-r-2 border-black pt-2">Tên môn học</h2>
                                        <h2 className="flex w-1/3 h-full justify-center border-black pt-2">Hệ số</h2>
                                    </div>
                                    {semester.courses.map((course, index) => (
                                        <div
                                            key={index}
                                            className="flex h-auto w-full bg-green-200 items-center justify-between space-x-4 font-bold border-r-2 border-b-2 border-l-2 border-black"
                                        >
                                            <h2 className="flex w-1/3 h-full justify-center border-r-2 border-black pt-2">{course.code}</h2>
                                            <h2 className="flex w-1/3 h-full justify-center border-r-2 border-black pt-2">{course.name}</h2>
                                            <h2 className="flex w-1/3 h-full justify-center border-black pt-2">{course.weight}</h2>
                                        </div>
                                    ))}
                                    <button
                                        className="w-[14vw] px-4 py-2 text-white bg-[#1DA599] border-4 border-white rounded-md hover:border-4 hover:border-yellow-400 transition mt-[2vh]"
                                        onClick={() => setEditCriteriaVisible(true)}
                                    >
                                        Chỉnh sửa tiêu chuẩn
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TeacherPage;