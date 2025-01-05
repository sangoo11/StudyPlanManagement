import React, { useEffect, useState } from 'react';
import axios from 'axios';
import addButton from '../../../assets/images/addButton.png';
import minusButton from '../../../assets/images/minusButton.png';
import AddClassroom from './AddClassroom';
import DeleteClassroom from './DeleteClassroom';
import EditClassroom from './EditClassroom';

function ClassroomManagement() {
    const [courses, setCourses] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState(1); // Default semester
    const [selectedClass, setSelectedClass] = useState(''); // Default class code
    const [selectedYear, setSelectedYear] = useState('2023-2024'); // Default academic year

    const [isAddClassroomVisible, setAddClassroomVisible] = useState(false);

    const [isDeleteClassroomVisible, setDeleteClassroomVisible] = useState(false);
    const [classroomToDelete, setClassroomToDelete] = useState(null);

    const [isEditClassroomVisible, setEditClassroomVisible] = useState(false);
    const [courseToEdit, setCourseToEdit] = useState(null);

    useEffect(() => {
        axios
            .get('http://localhost:8080/v1/api/admin/get-all-teacher')
            .then((response) => {
                console.log('API Response:', response.data);

                // Extract course list and normalize data
                const courseList = response.data?.metadata || [];

                const normalizedCourses = courseList.map(course => ({
                    ...course,
                    year: String(course.year),
                }));
                setCourses(normalizedCourses);
            } catch (error) {
                console.error('Error fetching courses:', error);
                setCourses([]);
            }

        };

        fetchCourses();
    }, []);

    // Filter courses based on selected year and semester
    const filteredCourses = courses.filter(course => {
        return course.year === selectedYear && course.semester === selectedSemester;
    });


const handleDeleteSuccess = (deletedId) => {
    setCourses(courses.filter(course => course.id !== deletedId));
};

// Edit Success Handler
const handleEditSuccess = (updatedCourse) => {
    setCourses(courses.map(course =>
        course.id === updatedCourse.id ? updatedCourse : course
    ));
    setEditClassroomVisible(false);
};

const handleCloseEdit = () => {
    setEditClassroomVisible(false);
};

console.log('course:', courses);

return (
    <div className="min-h-screen bg-gray-50 p-6">
        <div className="flex items-center justify-center mt-[8vh]">
            <h1 className="text-3xl font-bold text-[#1DA599] mb-6 text-center">
                Quản lý lớp học
            </h1>
        </div>

        <div className="flex flex-col mb-8">
            {/* Year Dropdown */}
            <div className="flex mb-4 items-center ml-6">
                <label className="text-gray-700 font-medium mr-4">Năm học:</label>
                <select
                    className="px-4 py-2 border rounded-md bg-white"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
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
                    className="px-4 py-2 border rounded-md bg-white"
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(Number(e.target.value))}
                >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                </select>
            </div>

            {/* Class Code Dropdown */}
            <div className="flex items-center ml-6">
                <label className="text-gray-700 font-medium mr-10">Mã lớp:</label>
                <select
                    className="px-4 py-2 border rounded-md bg-white"
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                >
                    {filteredCourses.length > 0 ? (
                        filteredCourses.map((course) => (
                            <option key={course.id} value={course.name}>
                                {course.name}
                            </option>
                        ))
                    ) : (
                        <option value="">No classes available</option>
                    )}
                </select>
            </div>
        </div>

        {/* Course List */}
        <div className="space-y-4">
            {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                    // Clicking on the button to edit 
                    <div
                        key={course.id}
                        className="group flex items-center justify-between border rounded-lg bg-white w-full"
                    >
                        <div className="flex justify-between items-center w-full h-full px-4 py-4">
                            <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded-full">
                                    <span className="text-gray-500">👤</span>
                                </div>
                                <div className="flex flex-col items-start">
                                    <p className="text-sm font-medium text-gray-700">Mã lớp: {course.name}</p>
                                    <p className="text-sm text-gray-700">Học kỳ: {course.semester}</p>
                                    <p className="text-sm text-gray-700">Năm học: {course.year}</p>
                                    <p className="text-sm text-gray-700">
                                        Trạng thái: {course.active ? 'Active' : 'Inactive'}
                                    </p>
                                </div>
                            </div>
                        </div>
                
                        {/* Edit button */}
                        <div className="flex w-8 h-full items-center justify-end mr-[4vw] rounded-full">
                            <button
                                onClick={() => {
                                    setEditClassroomVisible(true);
                                    setCourseToEdit(course);
                                }}
                                className="w-8 h-8 text-white rounded-full hover:border-4 hover:border-blue-400"
                            >
                                ✏️
                            </button>
                        </div>
                            
                        {/* Delete button */}
                        <div className="flex w-8 h-full items-center justify-end mr-[4vw] rounded-full">
                            <button
                                onClick={() => {
                                    setDeleteClassroomVisible(true);
                                    setClassroomToDelete(course.id);
                                }}
                                className="w-8 h-8 text-white rounded-full hover:border-4 hover:border-yellow-400"
                            >
                                <img src={minusButton} alt="Delete Classroom" />
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p>No courses found for the selected semester.</p>
            )}

    {/* EditClassroom Modal */}
    {isEditClassroomVisible && (
        <EditClassroom
            course={courseToEdit}
            onClose={() => setEditClassroomVisible(false)}
            onEditSuccess={handleEditSuccess}
        />
    )}

    {/* DeleteClassroom Modal */}
    {isDeleteClassroomVisible && (
        <DeleteClassroom
            courseId={classroomToDelete}
            onClose={() => setDeleteClassroomVisible(false)}
            onDeleteSuccess={handleDeleteSuccess}
        />
    )}
</div>


        {/* Add Button */}
        <div className="mt-6 flex justify-end space-x-4 mr-[4vw]">
            <button
                onClick={() => setAddClassroomVisible(true)} // Show AddClassroom
                className="w-10 h-10 bg-[#1DA599] text-white rounded-full hover:border-4 hover:border-yellow-400 hover:text-gray-700 flex items-center justify-center"
            >
                <img src={addButton} alt="Add" />
            </button>
        </div>

        {/* AddClassroom Modal */}
        {isAddClassroomVisible && (
            <AddClassroom onClose={() => setAddClassroomVisible(false)} />
        )}

    </div>
);
}

export default ClassroomManagement;
