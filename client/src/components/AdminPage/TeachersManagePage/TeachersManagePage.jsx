import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddButton from '../../../assets/images/addButton.png';
import minusButton from '../../../assets/images/minusButton.png';
import AddTeacher from './AddTeacher';
import DeleteTeacher from './DeleteTeacher';
import EditTeacher from './EditTeacher';

function TeacherManagement() {
    const [teachers, setTeachers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const [isAddTeacherVisible, setAddTeacherVisible] = useState('');
    
    const [isEditTeacherVisible, setEditTeacherVisible] = useState('');
    
    const [isDeleteTeacherVisible, setDeleteTeacherVisible] = useState('');

    useEffect(() => {
        axios
            .get('http://localhost:8080/v1/api/teacher/get-all-teacher')
            .then((response) => {
                console.log('API Response:', response.data);
                // Access the 'metadata' array in the response
                setTeachers(response.data.metadata || []);
            })
            .catch((error) => {
                console.error('Error fetching teachers:', error);
            });
    }, []);

    const filteredTeachers = teachers.filter(teacher =>
        teacher.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.id === parseInt(searchQuery)
    );

    console.log('Filtered Teachers:', filteredTeachers.length);
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Page Title */}
            <div className='flex items-center justify-center mt-[8vh]'>
                <h1 className="text-3xl font-bold text-[#1DA599] mb-6 text-center">
                    Quản lý giáo viên
                </h1>
            </div>

            {/* Search Bar */}
            <div className="mb-8">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md"
                />
            </div>

            <div className="space-y-4">
                {filteredTeachers.map((teacher) => {
                    // Determine the status color
                    const statusColors = {
                        Active: "bg-green-500 text-white",
                        Terminated: "bg-red-500 text-white",
                        "On leave": "bg-yellow-500 text-white",
                        Suspended: "bg-orange-500 text-white",
                    };
                    const statusClass = statusColors[teacher.status] || "bg-gray-300 text-black";
                
                    return (
                        <div
                            key={teacher.id}
                            className="flex items-center justify-between p-4 border rounded-lg bg-white"
                        >
                            <div className="flex items-center space-x-4">
                                {/* Avatar */}
                                <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded-full">
                                    <span className="text-gray-500">👤</span>
                                </div>
                                {/* Teacher Info */}
                                <div>
                                    <p className="text-sm font-medium text-gray-700">Mã giáo viên: {teacher.id}</p>
                                    <p className="text-sm text-gray-700">Họ và tên: {teacher.fullName || 'N/A'}</p>
                                    <div className="flex items-center space-x-2">
                                        <p className="text-sm text-gray-700">Tình trạng:</p>
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-semibold ${statusClass}`}
                                        >
                                            {teacher.status.charAt(0).toUpperCase() + teacher.status.slice(1)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {/* Action Buttons */}
                            <div className="flex space-x-4">
                                {/* Edit Button */}
                                <button
                                    onClick={() => setEditTeacherVisible(teacher)} 
                                    className="w-auto h-8 flex items-center p-2 justify-center bg-[#1DA599] text-white rounded-full"
                                >
                                    <span className="text-white">Chỉnh sửa</span>
                                </button>
                                {/* Delete Button */}
                                <button
                                    onClick={() => setDeleteTeacherVisible(teacher)}
                                    className="w-8 h-8 flex items-center justify-center text-white rounded-full"
                                >
                                    <img src={minusButton} alt="Minus" />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-6 flex justify-end space-x-4">
                <button 
                    onClick={() => setAddTeacherVisible(true)}
                    className="w-10 h-10 bg-[#1DA599] text-white rounded-full flex items-center justify-center"
                >
                    <img src={AddButton} alt="Add Teacher" />
                </button>
            </div>

            {/* Modals */}
            {isAddTeacherVisible && <AddTeacher onClose={() => setAddTeacherVisible(false)} />}
            {isEditTeacherVisible && <EditTeacher teacherData={isEditTeacherVisible} onClose={() => setEditTeacherVisible(false)} />}
            {isDeleteTeacherVisible && <DeleteTeacher teacherData={isDeleteTeacherVisible} onClose={() => setDeleteTeacherVisible(false)} />}
        </div>
    );
}

export default TeacherManagement;
