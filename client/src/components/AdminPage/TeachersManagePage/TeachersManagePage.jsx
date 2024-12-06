import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddButton from '../../../assets/images/addButton.png';
import minusButton from '../../../assets/images/minusButton.png';

function TeacherManagement() {
    const [teachers, setTeachers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        axios
            .get('http://localhost:8080/v1/api/admin/get-all-teacher')
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
        teacher.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Page Title */}
            <div className='flex items-center justify-center mt-[8vh]'>
                <h1 className="text-3xl font-bold text-[#1DA599] mb-6 text-center">
                    Quản lý giáo viên
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
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md"
                />
            </div>

            {/* Teacher Cards */}
            <div className="space-y-4">
                {filteredTeachers.map((teacher) => (
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
                                <p className="text-sm font-medium text-gray-700">Mã số giáo viên: {teacher.id}</p>
                                <p className="text-sm text-gray-700">Họ và tên: {teacher.fullName || 'N/A'}</p>
                                <p className="text-sm text-gray-700">Tình trạng: {teacher.isActive ? 'Active' : 'Inactive'}</p>
                            </div>
                        </div>
                        {/* Action Button */}
                        <button className="w-8 h-8 flex items-center justify-center bg-[#1DA599] text-white rounded-full">
                            <img src={AddButton} alt="Add" />
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-6 flex justify-end space-x-4">
                <button className="px-4 py-2 bg-[#1DA599] text-white rounded-md">
                    Chỉnh sửa
                </button>
                <button className="w-10 h-10 bg-[#1DA599] text-white rounded-full flex items-center justify-center">
                    <img src={minusButton} alt="Minus" />
                </button>
            </div>
        </div>
    );
}

export default TeacherManagement;
