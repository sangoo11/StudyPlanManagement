import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddButton from '../../../assets/images/addButton.png';
import minusButton from '../../../assets/images/minusButton.png';

function StudentManagement() {
    const [students, setStudents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        axios
            .get('http://localhost:8080/v1/api/admin/get-all-student')
            .then((response) => {
                console.log('API Response:', response.data);
                setStudents(response.data.metadata || []);
            })
            .catch((error) => {
                console.error('Error fetching students:', error);
            });
    }, []);

    const filteredStudents = students.filter(student =>
        student.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) || 
        student.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Function to handle student deletion
    const handleDelete = (studentId) => {
        axios
            .delete(`http://localhost:8080/v1/api/admin/delete-student/${studentId}`)
            .then(() => {
                setStudents(students.filter(student => student.id !== studentId));
            })
            .catch((error) => {
                console.error('Error deleting student:', error);
            });
    };

    // Function to handle student edit (This could open a modal or redirect to an edit page)
    const handleEdit = (studentId) => {
        console.log(`Edit student with ID: ${studentId}`);
        // You can implement navigation to an edit page or open a modal here
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Page Title */}
            <div className='flex items-center justify-center mt-[8vh]'>
                <h1 className="text-3xl font-bold text-[#1DA599] mb-6 text-center">
                    Quản lý sinh viên
                </h1>
            </div>

            {/* Filters Section */}
            <div className="flex flex-col mb-8">
                <div className="flex flex-col space-x-6">
                    <div className='flex mb-4 items-center'>
                        <label className="flex text-gray-700 font-medium mr-4">Thời điểm:</label>
                        <select className="flex px-4 py-2 border rounded-md bg-white">
                            <option>HK1 2024-2025</option>
                            <option>HK2 2024-2025</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="mb-8">
                <input
                    type="text"
                    placeholder="Search by name or email"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md"
                />
            </div>

            {/* Student Cards */}
            <div className="space-y-4">
                {filteredStudents.map((student) => (
                    <div
                        key={student.id}
                        className="flex items-center justify-between p-4 border rounded-lg bg-white"
                    >
                        <div className="flex items-center space-x-4">
                            {/* Avatar */}
                            <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded-full">
                                <span className="text-gray-500">👤</span>
                            </div>
                            {/* Student Info */}
                            <div>
                                <p className="text-sm font-medium text-gray-700">Mã số sinh viên: {student.id}</p>
                                <p className="text-sm text-gray-700">Họ và tên: {student.fullName || 'N/A'}</p>
                                <p className="text-sm text-gray-700">Tình trạng: {student.isActive ? 'Active' : 'Inactive'}</p>
                            </div>
                        </div>
                        {/* Action Buttons */}
                        <div className="flex space-x-4">
                            {/* Edit Button */}
                            <button 
                                onClick={() => handleEdit(student.id)}
                                className="w-8 h-8 flex items-center justify-center bg-[#1DA599] text-white rounded-full"
                            >
                                <span className="text-white">✏️</span>
                            </button>
                            {/* Delete Button */}
                            <button 
                                onClick={() => handleDelete(student.id)}
                                className="w-8 h-8 flex items-center justify-center bg-[#FF6347] text-white rounded-full"
                            >
                                <img src={minusButton} alt="Minus" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 flex justify-end space-x-4">
                <button className="px-4 py-2 bg-[#1DA599] text-white rounded-md">
                    Chỉnh sửa
                </button>
                <button className="w-10 h-10 bg-[#1DA599] text-white rounded-full flex items-center justify-center">
                    <img src={AddButton} alt="Add" />
                </button>
            </div>
        </div>
    );
}

export default StudentManagement;
