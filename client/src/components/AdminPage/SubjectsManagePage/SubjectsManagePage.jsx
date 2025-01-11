import React, { useEffect, useState } from 'react';
import axios from 'axios';
import addButton from '../../../assets/images/addButton.png';
import minusButton from '../../../assets/images/minusButton.png';
import AddClassroom from './components/AddClassroom';
import DeleteClassroom from './components/DeleteClassroom';
import EditClassroom from './components/EditClassroom';
import ShowMore from '../../../assets/images/showmore.png';
import ShowLess from '../../../assets/images/showless.png';
import AddSubject from './components/AddSubject';
import DeleteSubject from './components/DeleteSubject';
import EditSubject from './components/EditSubject';
function SujectManagement() {
    const [courses, setCourses] = useState([]);
    const [selectedMajor, setSelectedMajor] = useState('Công nghệ phần mềm');
    const [selectedSemester, setSelectedSemester] = useState(1); // Default semester
    const [selectedClass, setSelectedClass] = useState(''); // Default class code
    const [selectedYear, setSelectedYear] = useState('2023-2024'); // Default academic year

    const [isAddSubjectVisible, setAddSubjectVisible] = useState(false);
    const [isAddClassroomVisible, setAddClassroomVisible] = useState(false);

    const [isDeleteSubjectVisible, setDeleteSubjectVisible] = useState(false);
    const [subjectToDelete, setSubjectToDelete] = useState(null);
    const [isDeleteClassroomVisible, setDeleteClassroomVisible] = useState(false);

    const [isEditSubjectVisible, setEditSubjectVisible] = useState(false);
    const [courseToEdit, setCourseToEdit] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:8080/v1/api/course/get-all-courses');
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
    setEditSubjectVisible(false);
};

const handleCloseEdit = () => {
    setEditSubjectVisible(false);
};




    const [visibleClasses, setVisibleClasses] = React.useState({});

    // Toggle visibility for a specific semester
    const toggleClassesVisibility = (subjectId) => {
        setVisibleClasses((prev) => ({
            ...prev,
            [subjectId]: !prev[subjectId],
        }));
    };

    // Table data
    const subjects = [
        {
            id: 'SE1',
            name: 'Phát triển phần mềm',
            credit: 4,
            classes: [
                {
                    code: 'SE101'
                },
                {
                    code: 'SE102'
                },
                {
                    code: 'SE103'
                },
            ],
        },
        {
            id: 'SE2',
            name: 'Bảo trì phần mềm',
            credit: 4
        },
    ];



return (
    <div className="min-h-screen bg-gray-50 p-6">
        <div className="flex items-center justify-center mt-[8vh]">
            <h1 className="text-3xl font-bold text-[#1DA599] mb-6 text-center">
                Quản lý môn học
            </h1>
        </div>

        <div className="flex flex-col mb-8">
            {/* Major Dropdown */}
            <div className="flex mb-4 items-center ml-6">
                <label className="text-gray-700 font-medium mr-4">Chuyên ngành:</label>
                <select
                    className="px-4 py-2 border rounded-md bg-white"
                    value={selectedMajor}
                    onChange={(e) => setSelectedMajor(e.target.value)}
                >
                    <option value="2023-2024">Công nghệ phần mềm</option>
                    <option value="2024-2025">Khoa học máy tính</option>
                    <option value="2025-2026">Hệ thống thông tin</option>
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
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(Number(e.target.value))}
                >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                </select>
            </div>
        </div>

        <div className='border-t border-[1px] border-gray-200'></div>

        <div className="flex flex-col mt-4 space-y-4">
            {subjects.map((subject) => (
                <div key={subject.id} className="flex flex-col bg-white shadow-lg rounded-lg border border-gray-300 overflow-hidden">
                    {/* Subject Header */}
                    <div className="flex justify-between items-center p-4 bg-[#f9f9f9] border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800">Mã môn học: {subject.id}</h2>
                        <button
                                className="flex justify-center items-center w-8 h-8 rounded-full hover:bg-gray-200 transition mr-[60vw]"
                                onClick={() => toggleClassesVisibility(subject.id)}
                            >
                                <img
                                    src={visibleClasses[subject.id] ? ShowLess : ShowMore}
                                    alt={visibleClasses[subject.id] ? 'Show Less' : 'Show More'}
                                />
                        </button>
                        <div className="flex items-center space-x-2">
                            {/* Edit button */}
                            <button
                                className="px-4 py-2 text-white bg-[#1DA599] border-4 border-white rounded-md hover:border-4 hover:border-yellow-400 transition"
                                onClick={() => setEditSubjectVisible(true)}
                            >
                                Chỉnh sửa môn học
                            </button>
                            {/* Delete button */}
                            <button
                                className="flex justify-center items-center w-11 h-full rounded-full hover:border-4 hover:border-yellow-400  transition border-4 border-white"
                                onClick={() => setDeleteSubjectVisible(true)}
                            >
                                <img src={minusButton} alt="Delete Subject" />
                            </button>
                        </div>
                    </div>
            
                    {/* Subjects Table */}
                    {visibleClasses[subject.id] && (
                        <div className="flex flex-col p-4">
                            <h2 className="text-lg text-gray-700">Tên môn học: {subject.name}</h2>
                            <h2 className="text-lg text-gray-700">Số tín chỉ: {subject.credit}</h2>
                            {subject.classes.map((subject, index) => (
                                <button
                                    key={index}
                                    onClick={() => setEditSubjectVisible(true)}
                                    className="flex h-auto w-full items-center justify-between space-x-4 font-bold border-2 border-grey mb-1 hover:bg-green-300"
                                >
                                    <h2 className='flex p-2'>{subject.code}</h2>
                                    <button
                                        className="flex justify-center items-center w-11 h-full rounded-full hover:border-4 hover:border-yellow-400  transition border-4 border-white"
                                        onClick={(e)=> {
                                            e.stopPropagation();
                                            setDeleteClassroomVisible(true);                                           
                                        }}
                                    >
                                        <img src={minusButton} alt="Delete Subject" />
                                    </button>
                                </button>
                                
                            ))}
                            <button
                                className="flex px-5 py-2 w-[10vw] items-center text-white bg-[#1DA599] border-4 border-white rounded-md hover:border-4 hover:border-yellow-400"
                                onClick={() => setAddClassroomVisible(true)}
                            >
                                Thêm lớp học
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>

        {/* Add Button */}
        <div className="mt-6 flex justify-end space-x-4 mr-[4vw]">
            <button
                onClick={() => setAddSubjectVisible(true)} 
                className="w-10 h-10 bg-[#1DA599] text-white rounded-full hover:border-4 hover:border-yellow-400 hover:text-gray-700 flex items-center justify-center"
            >
                <img src={addButton} alt="Add" />
            </button>
        </div>
        
        {/* Modals */}
        {isAddSubjectVisible && (
            <AddSubject onClose={() => setAddSubjectVisible(false)} />
        )}
        {isEditSubjectVisible && (
            <EditSubject
                //course={courseToEdit}
                onClose={() => setEditSubjectVisible(false)}
                onEditSuccess={handleEditSuccess}
            />
        )}
        {isDeleteSubjectVisible && (
            <DeleteSubject
                //courseId={subjectToDelete}
                onClose={() => setDeleteSubjectVisible(false)}
                onDeleteSuccess={handleDeleteSuccess}
            />
        )}
        {isAddClassroomVisible && (
            <AddClassroom onClose={() => setAddClassroomVisible(false)} />
        )}
        {isDeleteClassroomVisible && (
            <DeleteClassroom
                //courseId={subjectToDelete}
                onClose={() => setDeleteClassroomVisible(false)}
                onDeleteSuccess={handleDeleteSuccess}
            />
        )}

    </div>
);
}

export default SujectManagement;
