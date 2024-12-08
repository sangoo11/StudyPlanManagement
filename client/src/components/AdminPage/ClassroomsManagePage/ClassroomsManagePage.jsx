import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddButton from '../../../assets/images/addButton.png';
import minusButton from '../../../assets/images/minusButton.png';

function ClassroomManagement() {
    const [courses, setCourses] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState(1); // Default semester as number
    const [selectedClass, setSelectedClass] = useState(''); // Default class
    const [selectedYear, setSelectedYear] = useState('2023-2024'); // Default year

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:8080/v1/api/admin/get-all-course');
                console.log('API Response:', response.data);
                
                // Extract metadata from the response
                const courseData = response.data?.metadata || [];
                setCourses(courseData);

                // Normalize the courses' year as string
                const normalizedCourses = response.data?.metadata?.map(course => ({
                    ...course,
                    year: String(course.year),
                })) || [];
                setCourses(normalizedCourses);
            } catch (error) {
                console.error('Error fetching courses:', error);
                setCourses([]);
            }
        };

        fetchCourses();
    }, []);

    // Filter classes based on the selected year and semester
    const filteredCourses = courses.filter(course => 
        course.year === selectedYear && course.semester === selectedSemester
    );

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className='flex items-center justify-center mt-[8vh]'>
                <h1 className="text-3xl font-bold text-[#1DA599] mb-6 text-center">
                    Quản lý lớp học
                </h1>
            </div>

            <div className="flex flex-col mb-8">
                <div className="flex flex-col space-x-6">
                    {/* Year dropdown */}
                    <div className='flex mb-4 items-center ml-6'>
                        <label className="flex text-gray-700 font-medium mr-4">Năm học:</label>
                        <select
                            className="flex px-4 py-2 border rounded-md bg-white"
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)} // Update selected year
                        >
                            <option value="2023-2024">2023-2024</option>
                            <option value="2024-2025">2024-2025</option>
                        </select>
                    </div>

                    {/* Semester Dropdown */}
                    <div className='flex mb-4 items-center ml-6'>
                        <label className="flex text-gray-700 font-medium mr-4">Học kỳ:</label>
                        <select
                            className="flex px-4 py-2 border rounded-md bg-white"
                            value={selectedSemester}
                            onChange={(e) => setSelectedSemester(Number(e.target.value))}
                        >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                        </select>
                    </div>
                    
                    {/* Class Code Dropdown */}
                    <div className='flex items-center'>
                        <label className="flex text-gray-700 font-medium mr-10">Mã lớp:</label>
                        <select
                            className="flex px-4 py-2 border rounded-md bg-white"
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                        >
                            {/* Dynamically populate class options based on filtered courses */}
                            {filteredCourses.length > 0 ? (
                                filteredCourses.map((course) => (
                                    <option key={course.name} value={course.name}>
                                        {course.name}
                                    </option>
                                ))
                            ) : (
                                <option value="">No classes available</option>
                            )}
                        </select>
                    </div>

                    <div className='flex pt-4'>
                        <label className="flex text-gray-700 font-medium mb-1">Mã giáo viên:</label>
                        <span className="flex items-center space-x-6 mb-1">
                            <span className="ml-4 text-gray-800">123456</span>
                            <button className="ml-4 text-[#1DA599] underline">Chỉnh sửa</button>
                        </span>
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full px-4 py-2 border rounded-md"
                />
            </div>

            <div className="space-y-4">
                {filteredCourses.length > 0 ? (
                    filteredCourses
                        .map((course, index) => (
                            <button
                                key={index}
                                className="group flex items-center justify-between border rounded-lg bg-white hover:bg-gray-200 w-full"
                            >
                                <div className="flex justify-between items-center w-full h-full px-4 p-4">
                                    {/* Left Section */}
                                    <div className="flex items-center space-x-4">
                                        <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded-full">
                                            <span className="text-gray-500">👤</span>
                                        </div>
                                        <div className="flex flex-col items-start">
                                            <p className="text-sm font-medium text-gray-700">Mã lớp: {course.name}</p>
                                            <p className="text-sm text-gray-700">Học kỳ: {course.semester}</p>
                                            <p className="text-sm text-gray-700">Năm học: {course.year}</p>
                                            <p className="text-sm text-gray-700">Trạng thái: {course.active ? 'Active' : 'Inactive'}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex w-8 group-hover:bg-white h-full items-center justify-end mr-[4vw] rounded-full">
                                    <button className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full border hover:border-4 hover:border-yellow-400 hover:text-gray-700">
                                        <img src={minusButton} alt="" />
                                    </button>
                                </div>
                            </button>
                        ))
                ) : (
                    <p>No courses found for the selected semester.</p>
                )}
            </div>

            <div className="mt-6 flex justify-end space-x-4 mr-[4vw]">
                <button className="w-10 h-10 bg-[#1DA599] text-white rounded-full flex items-center justify-center">
                    <img src={AddButton} alt="" />
                </button>
            </div>
        </div>
    );
}

export default ClassroomManagement;
