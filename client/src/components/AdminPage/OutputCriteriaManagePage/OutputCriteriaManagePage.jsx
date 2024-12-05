import React from 'react';
import AddButton from '../../../assets/images/addButton.png';
import minusButton from '../../../assets/images/minusButton.png';
import ShowLess from '../../../assets/images/showLess.png';
import ShowMore from '../../../assets/images/showMore.png';

function OutputCriteriaManagePage(props) {

    // State to track visibility for semesters
    const [visibleSemesters, setVisibleSemesters] = React.useState({});

    // Toggle visibility for a specific semester
    const toggleSemesterVisibility = (semesterId) => {
        setVisibleSemesters((prev) => ({
            ...prev,
            [semesterId]: !prev[semesterId],
        }));
    };

    // Table data
    const semesters = [
        {
            id: 'semester1',
            title: 'Mã tiêu chuẩn 1: ',
            demand: 'Nội dung tiêu chuẩn 1 : Thông hiểu kiến thức và có thể áp dụng trên thực tế',
            courses: [
                {
                    code: 'DSA',
                    name: 'Cấu trúc dữ liệu và giải thuật',
                    weight: '0.6',
                },
                {
                    code: 'SE100',
                    name: 'Nhập môn phần mềm',
                    weight: '0.5',
                },
            ],
        },
        {
            id: 'semester2',
            title: 'Mã tiêu chuẩn 1: ',
            demand: 'Thông hiểu kiến thức và có thể áp dụng trên thực tế',
            courses: [
                {
                    code: 'Math101',
                    name: 'Toán cao cấp',
                    weight: '0.7',
                },
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Page Title */}
            <div className='flex items-center justify-center mt-[8vh]'>
                <h1 className="text-3xl font-bold text-[#1DA599] mb-6 text-center">
                    Quản lý tiêu chuẩn đầu ra
                </h1>
            </div>
            

            {/* Filters Section */}
            <div className="flex flex-col mb-8">
                {/* Dropdown Filters */}
                <div className="flex flex-col space-x-6">
                    {/* Time Period Dropdown */}
                    <div className='flex mb-4 items-center ml-6'>
                        <label className="flex text-gray-700 font-medium mr-4">Chuyên ngành:</label>
                        <select className="flex px-4 py-2 border rounded-md bg-white">
                            <option>Công nghệ phần mềm</option>
                            <option>Khoa học máy tính</option>
                            <option>Hệ thống thông tin</option>
                        </select>
                    </div>
                    <div className='flex mb-4 items-center'>
                        <label className="flex text-gray-700 font-medium mr-4">Năm học:</label>
                        <select className="flex px-4 py-2 border rounded-md bg-white">
                            <option>HK1 2024-2025</option>
                            <option>HK2 2024-2025</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* HK1 2024-2025 */}
            <div className="flex flex-col items-center">
                    {semesters.map((semester) => (
                        <div key={semester.id} className="flex flex-col left-0 top-0 bg-white w-[80vw] h-[auto] border-2 border-black mb-[2vh]">
                            {/* Semester Header */}
                            <div className="flex items-center justify-between p-[1vh]">
                                <h2 className="text-2xl">{semester.title} {semester.id}</h2>  
                                <button
                                    className="flex w-[2vw] h-[2vh] justify-center items-center"
                                    onClick={() => toggleSemesterVisibility(semester.id)}
                                >
                                    <img
                                        src={visibleSemesters[semester.id] ? ShowLess : ShowMore}
                                        alt={visibleSemesters[semester.id] ? 'Show Less' : 'Show More'}
                                    />
                                </button>
                            </div>

                            {/* Semester Table */}
                            {visibleSemesters[semester.id] && (
                                <div className="flex flex-col p-[1vh] mb-[2vh]">
                                    <h3 className="text-2xl mb-[1vw]">{semester.demand}</h3>
                                    <div className="flex h-[6vh] w-full bg-green-200 items-center justify-between space-x-4 font-bold border-2 border-black">
                                        <h2 className="flex w-1/3 h-full justify-center border-r-2 border-black pt-2">Mã môn học</h2>
                                        <h2 className="flex w-1/3 h-full justify-center border-r-2 border-black pt-2">Tên môn học</h2>
                                        <h2 className="flex w-1/3 h-full justify-center border-black pt-2">Hệ số</h2>
                                    </div>
                                    {semester.courses.map((course, index) => (
                                        <div
                                            key={index}
                                            className="flex h-auto w-full bg-green-200 items-center justify-between space-x-4 font-bold border-r-2 border-b-2 border-l-2 border-black"
                                        >
                                            <h2 className="flex w-1/3 h-full justify-center border-r-2 border-black pt-2">{course.code}</h2>
                                            <h2 className="flex w-1/3 h-full justify-center border-r-2 border-black pt-2">{course.name}</h2>
                                            <h2 className="flex w-1/3 h-full justify-center border-black pt-2">{course.weight}</h2>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
        </div>
    );
}

export default OutputCriteriaManagePage;
