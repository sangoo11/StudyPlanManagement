import React from 'react';
import ShowMore from '../../assets/images/showmore.png';
import ShowLess from '../../assets/images/showless.png';
import minusButton from '../../assets/images/minusButton.png';
import axios from 'axios'
import { useSearchParams } from 'react-router-dom';

function TeacherPage(props) {
    const [seacrhParams, setSearchParams] = useSearchParams({ subjectCode: '', year: '', semester: '' });
    const subjectCode = seacrhParams.get('subjectCode');
    const year = seacrhParams.get('year');
    const semester = seacrhParams.get('semester');


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
            id: 'Năm học 2024-2025',
            title: 'Học kỳ 1: ',
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
    const [selectedSubject, setSelectedSubject] = React.useState('');
    const [subjectArray, setSubjectArray] = React.useState([]);
    const [filteredCourses, setFilteredCourses] = React.useState([]);
    const [courseArray, setCourseArray] = React.useState([]);

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

    // Fetch all courses
    React.useEffect(() => {
        const getAllCourses = async () => {
            try {
                const response = await axios.get('http://localhost:8080/v1/api/course/get-all-courses');
                setCourseArray(response.data.metadata);
            } catch (error) {
                console.error(error.response?.data?.message || 'Error fetching courses');
            }
        };
        getAllCourses();
    }, []);

    // Filter courses based on selected dropdown values
    React.useEffect(() => {
        const filtered = courseArray.filter((course) => {
            return (
                (selectedSubject ? course.subjectID === selectedSubject : true) &&
                (selectedYear ? course.year === selectedYear : true) &&
                (selectedSemester ? course.semester === Number(selectedSemester) : true)
                
            );
        });
        setFilteredCourses(filtered);
    }, [selectedSemester, selectedYear, selectedSubject, courseArray]);

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
                <div className="flex flex-col mt-4 space-y-4">
                    {filteredCourses.length > 0 ? (
                        filteredCourses.map((course) => (
                            <button
                                key={course.id}
                                onClick={() => navigate(`/teacher/coursedetail/${course.courseCode}`)}
                                className="flex flex-col bg-white shadow-lg rounded-lg border border-gray-300 overflow-hidden hover:bg-green-200"
                            >
                                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        {course.courseCode}
                                    </h2>
                                </div>
                            </button>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 mt-4">
                            Không tìm thấy khóa học nào.
                        </p>
                    )}
                </div>
            </div>


        </div>
    );
}

export default TeacherPage;