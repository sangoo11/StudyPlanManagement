import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import addButton from '../../../../assets/images/addButton.png';
import minusButton from '../../../../assets/images/minusButton.png';
import ReturnIcon from '../../../../assets/images/returnIcon.png';
import SearchIcon from '../../../../assets/images/searchIcon.png';
import EditClassroom from './EditClassroom';
import AddStudent from './AddStudent';

function DetailClassroom() {
    const { courseID } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [courseDetails, setCourseDetails] = useState(null);
    const [students, setStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [modals, setModals] = useState({
        editClassroom: { visible: false, courseId: null },
        addStudent: { visible: false, courseId: null},
    });

    const toggleClassesVisibility = useCallback((courseId) => {
        setModals((prev) => ({
            ...prev,
            [courseId]: !prev[courseId],
        }));
    }, []);

    // Use async function inside useEffect
    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/v1/api/course/get-course/${courseID}`);
                const courseData = response.data.metadata;
                setCourseDetails(courseData);

                if (courseData.teacherID) {
                    fetchTeachers(courseData.teacherID);
                }

                fetchStudents(courseID);
            } catch (err) {
                console.error('Error fetching course details:', err);
                setError('Failed to fetch course details.');
            }
        };

        const fetchTeachers = async (teacherID) => {
            try {
                const response = await axios.get(`http://localhost:8080/v1/api/teacher/get-teacher/${teacherID}`);
                setTeachers(response.data.metadata);
            } catch (err) {
                console.error('Error fetching teacher details:', err);
            }
        };

        const fetchStudents = async (courseId) => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:8080/v1/api/course/get-student-course/${courseId}`);
                setStudents(response.data.metadata || []);
            } catch (err) {
                console.error('Error fetching students:', err);
                setError('Failed to fetch students for the course.');
            } finally {
                setLoading(false);
            }
        };

        fetchCourseDetails();
    }, [courseID]);

    

    return (
        <div className="min-h-screen bg-gray-50 p-6 mt-[6vh]">
            <div className='flex flex-col'>
                <div className='flex w-full text-3xl font-bold text-[#1DA599] mb-6 space-x-[30vw]'>
                    <button className='flex left-0 ml-[4vw] pt-[1vh]' onClick={() => navigate(-1)}>
                        <img src={ReturnIcon} alt="Quay lại" className='flex w-4 h-4' />
                    </button>
                    <h1>Chi tiết lớp học {courseDetails?.courseCode || 'Loading...'}</h1>
                </div>

                <div className="flex flex-col mb-2 mt-[2vh]">
                    <div className="flex mb-[1vh] items-center ml-[2vw]">
                        <label className="text-gray-700 font-medium mr-4">Năm học:</label>
                        <div className='flex w-auto border-[1px] border-4 bg-white border-bray-400 p-2 rounded-md ml-[2vw]'>
                            <h2>{courseDetails?.year || 'Loading...'}</h2>
                        </div>
                    </div>
                    <div className="flex mb-[1vh] items-center ml-[2vw]">
                        <label className="text-gray-700 font-medium mr-4">Học kì:</label>
                        <div className='flex w-auto border-[1px] border-4 bg-white border-bray-400 p-2 rounded-md ml-[3.2vw]'>
                            <h2>{courseDetails?.semester || 'Loading...'}</h2>
                        </div>
                    </div>
                    <div className="flex mb-[1vh] items-center ml-[2vw]">
                        <label className="text-gray-700 font-medium mr-4">Mã lớp:</label>
                        <div className='flex w-auto border-[1px] border-4 bg-white border-bray-400 p-2 rounded-md ml-[3vw]'>
                            <h2>{courseDetails?.courseCode || 'Loading...'}</h2>
                        </div>
                    </div>
                    <div className="flex mb-[1vh] items-center ml-[2vw]">
                        <label className="text-gray-700 font-medium mr-4">Mã giáo viên:</label>
                        <div className='flex w-auto border-[1px] border-4 bg-white border-bray-400 p-2 rounded-md'>
                            <h2>{courseDetails?.teacherID || 'Loading...'}</h2>
                        </div>
                    </div>
                    <div className="flex mb-[1vh] items-center ml-[2vw]">
                        <label className="text-gray-700 font-medium mr-4">Tên giáo viên:</label>
                        <div className='flex w-auto border-[1px] border-4 bg-white border-bray-400 p-2 rounded-md'>
                            <h2>{teachers?.fullName || 'Loading...'}</h2>
                        </div>
                        <div className='flex ml-[2vw]'>
                            <button 
                                onClick={() => 
                                    setModals((prev) => ({
                                        ...prev,
                                        editClassroom: { visible: true, courseId: courseDetails?.id },
                                    }))
                                }
                            >
                                <h1 className='text-0.5xl text-[#1DA599] font-bold'>Chỉnh sửa thông tin lớp học</h1>
                            </button>
                        </div>
                    </div>
                </div>

                <div className='border-t border-[1px] border-gray-200'></div>

                <div className='flex justify-center mt-[2vh] mb-[2vh]'>
                    <div className='relative w-[30vw]'>
                        <input 
                            type="text" 
                            placeholder='Search'
                            className='border border-gray-300 rounded-md p-2 pr-10 pr-4 w-full' 
                        />
                        <button className='absolute right-2 top-1/2 transform -translate-y-1/2'>
                            <img src={SearchIcon} alt="Search" className='w-5 h-5' />
                        </button>
                    </div>
                </div>
                
                {/* Students Section */}
                <div className="mt-4">
                    <h2 className="text-xl font-bold mb-2">Danh sách sinh viên:</h2>
                    {loading ? (
                        <p>Loading students...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : students.length === 0 ? (
                        <p>Không có sinh viên nào trong lớp này.</p>
                    ) : (
                        <ul className="space-y-2">
                            {students.map((student) => (
                                <li
                                    key={student.id}
                                    className="p-4 bg-gray-100 border rounded flex justify-between items-center"
                                >
                                    <div>
                                        <p><strong>Mã số:</strong> {student.id}</p>
                                        <p><strong>Họ tên:</strong> {student.fullName}</p>
                                        <p><strong>Ngành:</strong> {student.major}</p>
                                        <p><strong>Trạng thái:</strong> {student.status}</p>
                                    </div>
                                            
                                    {/* Delete button */}
                                    <div className="flex w-8 h-full items-center justify-end mr-[4vw] rounded-full">
                                        <button
                                            className="w-8 h-full text-white rounded-full hover:border-4 hover:border-yellow-400"
                                            //onClick={() => setDeleteStudentVisible(true)}
                                        >
                                            <img src={minusButton} alt="Delete Student" />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>


                <div className='flex h-[4vh] w-full items-center justify-end mt-[4vh]'>
                    <button
                        className="w-8 h-full text-white rounded-full hover:border-4 hover:border-yellow-400 mr-[5vw]"
                        onClick={() => 
                            setModals((prev) => ({
                                ...prev,
                                addStudent: { visible: true, courseId: courseDetails?.id },
                            }))
                        }
                    >
                        <img src={addButton} alt="Add Student" />
                    </button>
                </div>

                {/* Modals */}
                {courseDetails && modals.editClassroom.visible && (
                    <EditClassroom
                        courseId={courseDetails.id}
                        onClose={() => setModals(prev => ({ ...prev, editClassroom: { visible: false, courseId: null } }))}
                    />
                )}

                {courseDetails && modals.addStudent.visible && (
                    <AddStudent
                        courseId={courseDetails.id}
                        onClose={() => setModals(prev => ({ ...prev, addStudent: { visible: false, courseId: null } }))}
                    />
                )}
            </div>
        </div>
    );
}

export default DetailClassroom;
