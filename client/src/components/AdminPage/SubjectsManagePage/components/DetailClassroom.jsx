import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import addButton from '../../../../assets/images/addButton.png';
import minusButton from '../../../../assets/images/minusButton.png';
import ReturnIcon from '../../../../assets/images/returnIcon.png';
import SearchIcon from '../../../../assets/images/searchIcon.png';
import EditClassroom from './EditClassroom';

function DetailClassroom() {
    const { courseID } = useParams();
    const navigate = useNavigate();
    const [courseDetails, setCourseDetails] = useState(null);
    const [teachers, setTeachers] = useState([]);
    const [modals, setModals] = useState({
        editClassroom: { visible: false, courseId: null },
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

                // Fetch teacher details if teacherID is available
                if (courseData.teacherID) {
                    fetchTeachers(courseData.teacherID);
                }
            } catch (error) {
                console.error('Error fetching course details:', error);
            }
        };

        const fetchTeachers = async (teacherID) => {
            try {
                const response = await axios.get(`http://localhost:8080/v1/api/teacher/get-teacher/${teacherID}`);
                setTeachers(response.data.metadata);
            } catch (error) {
                console.error('Error fetching teacher details:', error);
            }
        };

        fetchCourseDetails();

        // Cleanup if component unmounts before data is fetched
        return () => {
            setCourseDetails(null);
            setTeachers([]);
        };
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

                <div className="flex justify-between items-center w-full h-full px-4 py-4 bg-white rounded-md">
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded-full">
                            <span className="text-gray-500">👤</span>
                        </div>
                        <div className="flex flex-col items-start">
                            <p className="text-sm font-medium text-gray-700">Mã số sinh viên: 112004</p>
                            <p className="text-sm text-gray-700">Họ tên: Đóm Chúa</p>
                            <p className="text-sm text-gray-700">Số điện thoại: 0123456789</p>
                            <p className="text-sm text-gray-700">Tình trạng: Hoạt động</p>
                        </div>
                    </div>
                    {/* Edit button */}
                    <div className="flex w-auto h-full items-center justify-end mr-[4vw] rounded-md border-[3px] border-[#1DA599] hover:border-4 hover:border-yellow-400 ml-[60vw]">
                        <button
                            className="w-20 h-8 text-black bg-transparent"
                            //onClick={() => setEditStudentVisible(true)}
                        >
                            Chỉnh sửa 
                        </button>
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
                </div>

                <div className='flex h-[4vh] w-full items-center justify-end mt-[4vh]'>
                    <button
                        className="w-8 h-full text-white rounded-full hover:border-4 hover:border-yellow-400 mr-[5vw]"
                        //onClick={() => setAddStudentVisible(true)}
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
            </div>
        </div>
    );
}

export default DetailClassroom;
