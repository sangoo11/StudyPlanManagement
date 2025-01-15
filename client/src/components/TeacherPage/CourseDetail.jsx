import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import addButton from '../../assets/images/addButton.png';
import minusButton from '../../assets/images/minusButton.png';
import ReturnIcon from '../../assets/images/returnIcon.png';
import SearchIcon from '../../assets/images/searchIcon.png';


function CourseDetail() {
    const { courseID } = useParams();

    const [courseData, setCourseData] = React.useState({});

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
                <div className='flex w-full text-3xl font-bold text-[#1DA599] mb-6 space-x-[35vw]'>
                    <button className='flex left-0 ml-[4vw] pt-[1vh]'>
                        <img src={ReturnIcon} alt="Quay lại" className='flex w-4 h-4' />
                    </button>
                    <h1>Chi tiết lớp học {courseID}</h1>
                </div>

                <div className="flex flex-col mb-2 mt-[2vh]">
                    {/* Major Dropdown */}
                    <div className="flex mb-[1vh] items-center ml-[2vw]">
                        <label className="text-gray-700 font-medium">Năm học:</label>
                        <div className='flex w-auto border-none bg-transparent p-2 rounded-md ml-[3vw]'>
                            <h2>{courseData.year}</h2>
                        </div>
                    </div>
                    {/* Major Dropdown */}
                    <div className="flex mb-[1vh] items-center ml-[2vw]">
                        <label className="text-gray-700 font-medium mr-4">Học kì:</label>
                        <div className='flex w-auto border-none bg-transparent p-2 rounded-md ml-[3vw]'>
                            <h2>{courseData.semester}</h2>
                        </div>
                    </div>
                    {/* Major Dropdown */}
                    <div className="flex mb-[1vh] items-center ml-[2vw]">
                        <label className="text-gray-700 font-medium mr-4">Mã lớp:</label>
                        <div className='flex w-auto border-none bg-transparent p-2 rounded-md ml-[3vw]'>
                            <h2>{courseData.courseCode}</h2>
                        </div>
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
                                    <p className="text-sm text-gray-700">Số điện thoại: {student.phoneNumber}</p>
                                    <p className="text-sm text-gray-700">Tình trạng: {student.status}</p>
                                </div>
                            </div>

                            <div className='flex gap-4'>
                                {/* Edit button */}
                                <div className="flex items-center h-full rounded-md">
                                    <button
                                        className="w-20 h-8 text-black bg-transparent"
                                        onClick={() => editStudent(student.id)}
                                    >
                                        Chỉnh sửa
                                    </button>
                                </div>

                                {/* Delete button */}
                                <div className="rounded-full">
                                    <button
                                        className="w-8 h-full text-white rounded-full"
                                        onClick={() => deleteStudent(student.id)}
                                    >
                                        <img src={minusButton} alt="Delete Student" />
                                    </button>
                                </div>
                            </div>
                        </div>

                    ))}
                </div>

            </div>

            <div className='flex h-[4vh] w-full items-center justify-end mt-[4vh]'>
                <button
                    className="w-8 h-full text-white rounded-full hover:border-4 hover:border-yellow-400 mr-[5vw]"
                    onClick={() => setAddStudentVisible(true)}
                >
                    <img src={addButton} alt="Add Student" />
                </button>
            </div>

            {/* AddClassroom Modal */}
            {/* {isAddStudentVisible && (
                <AddStudent onClose={() => setAddStudentVisible(false)} />
            )}
            {isEditStudentVisible && (
                <EditStudent student={studentToEdit} 
                onClose={() => setEditStudentVisible(false)}/>
                //onEditSuccess={handleEditSuccess} />
            )}
            {isDeleteStudentVisible && (
                <DeleteStudent student={studentToDelete} 
                onClose={() => setDeleteStudentVisible(false)}/>
                //onEditSuccess={handleEditSuccess} />
            )}
            {isEditClassroomVisible && (
                <EditClassroom 
                //student={studentToEdit} 
                onClose={() => setEditClassroomVisible(false)}/>
                //onEditSuccess={handleEditSuccess} />
            )} */}
        </div>


    );
}

export default CourseDetail;
