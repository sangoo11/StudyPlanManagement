import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddButton from '../../../assets/images/addButton.png';
import minusButton from '../../../assets/images/minusButton.png';
import AddStudent from './AddStudent';
import EditStudent from '../SubjectsManagePage/components/EditStudent';
import DeleteStudent from '../SubjectsManagePage/components/DeleteStudent';

function StudentManagement() {
    const [students, setStudents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    const [isAddStudentVisible, setAddStudentVisible] = useState('');

    const [isEditStudentVisible, setEditStudentVisible] = useState('');

    const [isDeleteStudentVisible, setDeleteStudentVisible] = useState('');

    const fetchStudents = () => {
        axios
            .get('http://localhost:8080/v1/api/student/get-all-student')
            .then((response) => {
                console.log('API Response:', response.data);
                setStudents(response.data.metadata || []);
            })
            .catch((error) => {
                console.error('Error fetching students:', error);
            });
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const uniqueYears = [...new Set(students.map(student => student.year))];

    const filteredStudents = students.filter(student =>
        (student.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) || 
        student.id === parseInt(searchQuery)) &&
        (selectedYear === '' || student.year === selectedYear)
    );

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
                        <select
                            className="flex px-4 py-2 border rounded-md bg-white"
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                        >
                            {/* <option value="">Chọn thời điểm</option> */}
                            {uniqueYears.map((year, index) => (
                                <option key={index} value={year}>
                                    {year}
                                </option>
                            ))}
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
                {filteredStudents.map((student) => {
                    // Determine the status color
                    const statusColors = {
                        active: "bg-green-500 text-white",
                        terminated: "bg-red-500 text-white",
                        onleave: "bg-yellow-500 text-white",
                        suspended: "bg-orange-500 text-white",
                    };
                    const statusClass = statusColors[student.status] || "bg-gray-300 text-black";
                
                    return (
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
                                    <div className="flex items-center space-x-2">
                                        <p className="text-sm text-gray-700">Tình trạng:</p>
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-semibold ${statusClass}`}
                                        >
                                            {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {/* Action Buttons */}
                            <div className="flex space-x-4">
                                {/* Edit Button */}
                                <button
                                    onClick={() => setEditStudentVisible(student)} 
                                    className="w-auto h-8 flex items-center p-2 justify-center bg-[#1DA599] text-white rounded-full"
                                >
                                    <span className="text-white">Chỉnh sửa</span>
                                </button>
                                {/* Delete Button */}
                                <button
                                    onClick={() => setDeleteStudentVisible(student)}
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
                    className="w-10 h-10 bg-[#1DA599] text-white rounded-full flex items-center justify-center"
                    onClick={() => setAddStudentVisible(true) }
                >
                    <img src={AddButton} alt="Add" />
                </button>
            </div>
            
            {/* Modals */}
            {isAddStudentVisible && (
                <AddStudent onClose={() => setAddStudentVisible(false)} onStudentAdded={fetchStudents} />
            )}
            {isEditStudentVisible && (
                <EditStudent
                    onClose={() => setEditStudentVisible(false)}
                    studentData={isEditStudentVisible}
                    onStudentEdited={fetchStudents}
                />
            )}
            {isDeleteStudentVisible && (
                <DeleteStudent
                    onClose={() => setDeleteStudentVisible(false)}
                    studentData={isDeleteStudentVisible}
                    onStudentDeleted={fetchStudents}
                />
            )}
        </div>
    );
}

export default StudentManagement;
