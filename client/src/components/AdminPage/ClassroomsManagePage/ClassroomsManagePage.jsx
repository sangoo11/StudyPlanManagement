import React, { useEffect, useState } from 'react';
import axios from 'axios';  // Import axios
import AddButton from '../../../assets/images/addButton.png';
import minusButton from '../../../assets/images/minusButton.png';

function ClassroomManagement() {
    // State to store the fetched courses
    const [courses, setCourses] = useState([]);

    // State to track the selected filters
    const [selectedSemester, setSelectedSemester] = useState('HK1 2024-2025');
    const [selectedClass, setSelectedClass] = useState('A');

    // Fetch the courses from the API using axios
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:8080/v1/api/admin/get-all-course');
                console.log('API Response:', response.data); // Log the response to check its structure
                
                // Ensure that the data is an array
                const courseData = Array.isArray(response.data) ? response.data : [];
                setCourses(courseData); // Set the course data only if it's an array
            } catch (error) {
                console.error('Error fetching courses:', error);
                setCourses([]); // Set courses to an empty array on error
            }
        };

        fetchCourses();
    }, []); // Empty dependency array ensures the effect runs only once after the first render

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Page Title */}
            <div className='flex items-center justify-center mt-[8vh]'>
                <h1 className="text-3xl font-bold text-[#1DA599] mb-6 text-center">
                    Quản lý lớp học
                </h1>
            </div>

            {/* Filters Section */}
            <div className="flex flex-col mb-8">
                <div className="flex flex-col space-x-6">
                    {/* Time Period Dropdown */}
                    <div className='flex mb-4 items-center ml-6'>
                        <label className="flex text-gray-700 font-medium mr-4">Thời điểm:</label>
                        <select
                            className="flex px-4 py-2 border rounded-md bg-white"
                            value={selectedSemester}
                            onChange={(e) => setSelectedSemester(e.target.value)}
                        >
                            <option>HK1 2024-2025</option>
                            <option>HK2 2024-2025</option>
                        </select>
                    </div>

                    {/* Class Dropdown */}
                    <div className='flex items-center'>
                        <label className="flex text-gray-700 font-medium mr-10">Mã lớp:</label>
                        <select
                            className="flex px-4 py-2 border rounded-md bg-white"
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                        >
                            <option>A</option>
                            <option>B</option>
                            <option>C</option>
                        </select>
                    </div>

                    {/* Teacher Info */}
                    <div className='flex pt-4'>
                        <label className="flex text-gray-700 font-medium mb-1">Mã giáo viên:</label>
                        <span className="flex items-center space-x-6 mb-1">
                            <span className="ml-4 text-gray-800">123456</span>
                            <button className="ml-4 text-[#1DA599] underline">Chỉnh sửa</button>
                        </span>
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="mb-8">
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full px-4 py-2 border rounded-md"
                />
            </div>

            {/* Course List */}
            <div className="space-y-4">
                {Array.isArray(courses) && courses.length > 0 ? (
                    courses
                        .filter(course => course.semester === selectedSemester) // Check the filter condition
                        .map((course, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-4 border rounded-lg bg-white"
                            >
                                <div className="flex items-center space-x-4">
                                    {/* Avatar */}
                                    <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded-full">
                                        <span className="text-gray-500">👤</span>
                                    </div>
                                    {/* Course Info */}
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">Mã lớp: {course.name}</p>
                                        <p className="text-sm text-gray-700">Học kỳ: {course.semester}</p>
                                        <p className="text-sm text-gray-700">Năm học: {course.year}</p>
                                        <p className="text-sm text-gray-700">Trạng thái: {course.active ? 'Active' : 'Inactive'}</p>
                                    </div>
                                </div>
                                {/* Action Button */}
                                <button className="w-8 h-8 flex items-center justify-center bg-[#1DA599] text-white rounded-full">
                                    <img src={AddButton} alt="" />
                                </button>
                            </div>
                        ))
                ) : (
                    <p>No courses found for the selected semester.</p>
                )}
            </div>

            {/* Add and Edit Buttons */}
            <div className="mt-6 flex justify-end space-x-4">
                <button className="px-4 py-2 bg-[#1DA599] text-white rounded-md">
                    Chỉnh sửa
                </button>
                <button className="w-10 h-10 bg-[#1DA599] text-white rounded-full flex items-center justify-center">
                    <img src={minusButton} alt="" />
                </button>
            </div>
        </div>
    );
}

export default ClassroomManagement;
