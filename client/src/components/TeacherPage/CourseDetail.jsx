import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import addButton from '../../assets/images/addButton.png';
import minusButton from '../../assets/images/minusButton.png';
import ReturnIcon from '../../assets/images/returnIcon.png';
import SearchIcon from '../../assets/images/searchIcon.png';
import EditClassroom from '../AdminPage/SubjectsManagePage/components/EditClassroom';
import EditPoint from './EditPoint';

function CourseDetail() {
    const { courseID } = useParams();

    const [courseData, setCourseData] = React.useState({});

    const navigate = useNavigate();

    const [modals, setModals] = useState({
        editClassroom: { visible: false, courseId: null },
        editPoint: { visible: false, studentId: null },
    });

    const toggleClassesVisibility = useCallback((courseId) => {
        setModals((prev) => ({
            ...prev,
            [courseId]: !prev[courseId],
        }));
    }, []);

    React.useEffect(() => {
        const getCourseById = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/v1/api/course/get-course/${courseID}`);
                setCourseData(response.data.metadata);
            } catch (error) {
                console.error(error.response.data.message);
            }
        }
        getCourseById();
    }, [courseID]);

    const [studentArray, setStudentArray] = useState([]);
    React.useEffect(() => {
        const getStudentByCourse = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/v1/api/course/get-student-course/${courseID}`);
                setStudentArray(response.data.metadata);
            } catch (error) {
                console.error(error.response.data.message);
            }
        }
        getStudentByCourse();
    }, [courseID]);
    return (
        <div className="min-h-screen bg-gray-50 p-6 mt-[6vh]">
            <div className='flex flex-col'>
                <div className='flex w-full text-3xl font-bold text-[#1DA599] mb-6 space-x-[30vw]'>
                    <button className='flex left-0 ml-[4vw] pt-[1vh]' onClick={() => navigate(-1)}>
                        <img src={ReturnIcon} alt="Quay lại" className='flex w-4 h-4' />
                    </button>
                    <h1>Chi tiết lớp học {courseData.courseCode}</h1>
                </div>

                <div className="flex flex-col mb-2 mt-[2vh]">
                    <div className="flex mb-[1vh] items-center ml-[2vw]">
                        <label className="text-gray-700 font-medium">Năm học:</label>
                        <div className='flex w-auto border-none bg-transparent p-2 rounded-md ml-[3vw]'>
                            <div className='flex border-2 border-[#1DA599] p-1 bg-white w-[8vw] rounded'>
                                <p className='ml-2'> {courseData.year} </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex mb-[1vh] items-center ml-[2vw]">
                        <label className="text-gray-700 font-medium mr-4">Học kì:</label>
                        <div className='flex w-auto border-none bg-transparent p-2 rounded-md ml-[3vw]'>
                        <div className='flex border-2 border-[#1DA599] p-1 bg-white w-[8vw] rounded ml-1'>
                                <p className='ml-2'> {courseData.semester} </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex mb-[1vh] items-center ml-[2vw]">
                        <label className="text-gray-700 font-medium mr-4">Mã lớp:</label>
                        <div className='flex w-auto border-none bg-transparent p-2 rounded-md ml-[3vw]'>
                            <div className='flex border-2 border-[#1DA599] p-1 bg-white w-[8vw] rounded'>
                                <p className='ml-2'> {courseData.courseCode} </p>
                            </div>
                        </div>
                        {/* <div className='flex ml-[2vw]'>
                            <button 
                                onClick={() => 
                                    setModals((prev) => ({
                                        ...prev,
                                        editClassroom: { visible: true, courseId: courseData?.id },
                                    }))
                                }
                            >
                                <h1 className='text-0.5xl text-[#1DA599] font-bold hover:text-yellow-400'>Chỉnh sửa thông tin lớp học</h1>
                            </button>
                        </div> */}
                    </div>
                </div>

                <div className='border-t border-[1px] border-gray-200'></div>

                <div className='flex justify-center mt-[2vh]  mb-[2vh]'>
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

                <div className="flex flex-col gap-5 w-full h-full px-4 py-4 bg-white rounded-md">
                    {studentArray.map((student) => (
                        <div key={student.id} className="flex justify-between">
                            <div className='flex items-center gap-4'>
                                <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded-full">
                                    <span className="text-gray-500">👤</span>
                                </div>
                                <div className="flex flex-col items-start">
                                    <p className="text-sm font-medium text-gray-700">Mã số sinh viên: {student.id}</p>
                                    <p className="text-sm text-gray-700">Họ tên: {student.fullName}</p>
                                    <p className="text-sm text-gray-700">Tình trạng: {student.status}</p>
                                </div>
                            </div>

                            <div className='flex gap-4'>
                                {/* Edit button */}
                                <div className="flex items-center h-full rounded-md">
                                    <button
                                        className="flex w-auto h-auto p-2 font-bold text-white bg-transparent bg-green-600 border-4 border-white hover:border-4 hover:border-yellow-400"
                                        onClick={() => 
                                            setModals((prev) => ({
                                                ...prev,
                                                editPoint: { visible: true, studentId: student.id },
                                            }))
                                        }
                                    >
                                        Thêm điểm
                                    </button>
                                </div>

                            </div>
                        </div>

                    ))}
                </div>

            </div>

                {courseData && modals.editClassroom.visible && (
                    <EditClassroom
                        courseId={courseData.id}
                        onClose={() => setModals(prev => ({ ...prev, editClassroom: { visible: false, courseId: null } }))}
                    />
                )}
                {modals.editPoint.visible && (
                    <EditPoint
                        studentId={modals.editPoint.studentId}
                        onClose={() => setModals(prev => ({...prev, editPoint: { visible: false, studentId: null } }))}
                    />
                )}
        </div>


    );
}

export default CourseDetail;
