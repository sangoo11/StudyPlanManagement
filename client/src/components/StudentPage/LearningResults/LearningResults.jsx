import React from 'react';
import ShowMore from '../../../assets/images/showmore.png';
import ShowLess from '../../../assets/images/showless.png';

function LearningResults(props) {

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
            title: 'Học kỳ 1 2024-2025',
            courses: [
                {
                    code: 'DSA',
                    name: 'Cấu trúc dữ liệu và giải thuật',
                    qt: '9.0',
                    gk: '8.0',
                    ck: '8.0',
                    avg: '8.5',
                    weight: '0.6',
                },
                {
                    code: 'SE100',
                    name: 'Nhập môn phần mềm',
                    qt: '8.5',
                    gk: '7.5',
                    ck: '8.0',
                    avg: '8.0',
                    weight: '0.5',
                },
            ],
        },
        {
            id: 'semester2',
            title: 'Học kỳ 2 2024-2025',
            courses: [
                {
                    code: 'Math101',
                    name: 'Toán cao cấp',
                    qt: '8.0',
                    gk: '7.5',
                    ck: '8.5',
                    avg: '8.0',
                    weight: '0.7',
                },
            ],
        },
    ];


    return (
        <div className='flex-1 pt-[10vh] flex min-h-screen pb-[4vh]'>
            <div className='flex flex-col w-full h-auto justify-center items-center'>
                <h1 className='text-3xl font-bold pb-[4vh]'>Kết quả học tập</h1>

                {/* HK1 2024-2025 */}
                <div className="flex flex-col">
                    {semesters.map((semester) => (
                        <div key={semester.id} className="flex flex-col left-0 top-0 bg-white w-[80vw] h-[auto] border-2 border-black mb-[2vh]">
                            {/* Semester Header */}
                            <div className="flex items-center justify-between p-[1vh]">
                                <h2 className="text-2xl">{semester.title}</h2>
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
                                <div className="flex flex-col p-[2vh]">
                                    <div className="flex h-[6vh] w-full bg-green-200 items-center justify-between space-x-4 font-bold border-2 border-black">
                                        <h2 className="flex w-1/3 h-full justify-center border-r-2 border-black pt-2">Mã môn học</h2>
                                        <h2 className="flex w-1/3 h-full justify-center border-r-2 border-black pt-2">Tên môn học</h2>
                                        <h2 className="flex w-1/3 h-full justify-center border-r-2 border-black pt-2">QT</h2>
                                        <h2 className="flex w-1/3 h-full justify-center border-r-2 border-black pt-2">GK</h2>
                                        <h2 className="flex w-1/3 h-full justify-center border-r-2 border-black pt-2">CK</h2>
                                        <h2 className="flex w-1/3 h-full justify-center border-r-2 border-black pt-2">TB</h2>
                                        <h2 className="flex w-1/3 h-full justify-center border-black pt-2">Hệ số</h2>
                                    </div>
                                    {semester.courses.map((course, index) => (
                                        <div
                                            key={index}
                                            className="flex h-auto w-full bg-green-200 items-center justify-between space-x-4 font-bold border-r-2 border-b-2 border-l-2 border-black"
                                        >
                                            <h2 className="flex w-1/3 h-full justify-center border-r-2 border-black pt-2">{course.code}</h2>
                                            <h2 className="flex w-1/3 h-full justify-center border-r-2 border-black pt-2">{course.name}</h2>
                                            <h2 className="flex w-1/3 h-full justify-center border-r-2 border-black pt-2">{course.qt}</h2>
                                            <h2 className="flex w-1/3 h-full justify-center border-r-2 border-black pt-2">{course.gk}</h2>
                                            <h2 className="flex w-1/3 h-full justify-center border-r-2 border-black pt-2">{course.ck}</h2>
                                            <h2 className="flex w-1/3 h-full justify-center border-r-2 border-black pt-2">{course.avg}</h2>
                                            <h2 className="flex w-1/3 h-full justify-center border-black pt-2">{course.weight}</h2>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>


                {/* Another term here  */}
                


            </div>    
            
        </div>
    );
}

export default LearningResults;