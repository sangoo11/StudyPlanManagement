import React, { useState, useEffect } from 'react';
import axios from 'axios';
import First from '../../assets/images/stage_1.jpg';
import Second from '../../assets/images/stage_2.jpg';
import Third from '../../assets/images/stage_3.jpg';
import Fourth from '../../assets/images/stage_4.jpg';
import Fifth from '../../assets/images/stage_5.jpg';
import Sixth from '../../assets/images/stage_6.jpg';
import ShowMore from '../../assets/images/showmore.png';
import ShowLess from '../../assets/images/showless.png';

function StudentPage(props) {

    const titleLeftHandSide = 'CÂY HỌC PHẦN';
    const titleRightHandSide = 'THÔNG TIN CHI TIẾT';
    const credits = 10;
    const content = 'Số tín chỉ đăng ký: ' + credits;

    const totalResult1 = 8.0;
    const content1 = 'Tiêu chí 1 : ' + totalResult1;

    // State to store the credits learned and treeImage
    const [creditLearned, setCreditLearned] = useState(null);
    const [treeImage, setTreeImage] = useState(null); // state for tree image
    const [error, setError] = useState(null);

    const [studentData, setStudentData] = useState({});

    // Fetch student credits using Axios
    useEffect(() => {
        const getStudentData = async () => {
            const accountID = localStorage.getItem('accountID');
            try {
                const { data } = await axios.get(`http://localhost:8080/v1/api/account/get-user-data/${accountID}`);
                setStudentData(data.metadata);
                setCreditLearned(data.metadata.credit);
            } catch (error) {
                console.error(error.response?.data?.message || 'Error fetching student data');
            }
        };
        getStudentData();
    }, []);

    // Use useEffect to set the tree image based on creditLearned
    useEffect(() => {
        if (creditLearned !== null) {
            if (creditLearned < 0) {
                setError('Error fetching credits');
                setTreeImage(null);
            } else if (creditLearned < 26) {
                setTreeImage(<img src={First} alt="Stage 1" />);
            } else if (creditLearned < 51) {
                setTreeImage(<img src={Second} alt="Stage 2" />);
            } else if (creditLearned < 76) {
                setTreeImage(<img src={Third} alt="Stage 3" />);
            } else if (creditLearned < 101) {
                setTreeImage(<img src={Fourth} alt="Stage 4" />);
            } else if (creditLearned < 126) {
                setTreeImage(<img src={Fifth} alt="Stage 5" />);
            } else {
                setTreeImage(<img src={Sixth} alt="Stage 6" />);
            }
        }
    }, [creditLearned]); // re-run when creditLearned changes

    // State to manage visibility for multiple sections
    const [visibleSections, setVisibleSections] = React.useState({});

    // Toggle visibility for a specific section
    const toggleVisibility = (sectionId) => {
        setVisibleSections((prev) => ({
            ...prev,
            [sectionId]: !prev[sectionId], // Toggle the specific section
        }));
    };

    const sections = [
        {
            id: 'section1',
            title: 'Tiêu chí 1',
            content: [
                { subject: 'DSA', weight: '8.0', score: '8.0' },
                { subject: 'SE100', weight: '8.0', score: '8.0' },
            ],
        },
        {
            id: 'section2',
            title: 'Tiêu chí 2',
            content: [
                { subject: 'Math', weight: '9.0', score: '9.0' },
                { subject: 'Physics', weight: '7.5', score: '7.5' },
            ],
        },
    ];

    return (
        <div className="flex-1 pt-[10vh] flex min-h-screen">
            {/* Left Side */}
            <div className="flex flex-col w-1/2 text-black items-center justify-center">
                <div className="flex flex-col pb-[6vh]">
                    <h2 className="text-3xl font-bold">{titleLeftHandSide}</h2>
                    <h2 className="text-2xl font-bold ml-4">Year : 1 | Term : 1</h2>
                </div>
                <div className='flex w-3/4 h-3/4 pt-[4vh] pb-[4vh] pl-[4vh] border-2 border-[#1DA599]'>
                    {treeImage}
                </div>
            </div>

            {/* Right Side */}
            <div className="flex flex-col text-black w-1/2 h-auto items-center justify-center">
                <h1 className="text-3xl font-bold pb-[2vh]">{titleRightHandSide}</h1>
                <div className='flex flex-col left-0 top-0 w-[40vw] h-auto pb-[4vh]'>
                    {error ? (
                        <h2 className="text-2xl text-red-500">Error: {error}</h2>
                    ) : (
                        <h2 className="text-2xl pb-[2vh]">
                            Số tín chỉ đăng ký: {creditLearned !== null ? creditLearned : 'Loading...'}
                        </h2>
                    )}

                    {/* Tieu chi 1 */}
                    {sections.map((section) => (
                        <div key={section.id} className='flex flex-col pb-[2vh]'>
                            {/* Section Header */}
                            <div className='flex'>
                                <h2 className='flex text-xl pb-[1vh]'>{section.title}</h2>
                                <button
                                    className='flex w-[2vw] h-[2vh] ml-[1vw] mt-[1vh]'
                                    onClick={() => toggleVisibility(section.id)}
                                >
                                    <img
                                        src={visibleSections[section.id] ? ShowLess : ShowMore}
                                        alt={visibleSections[section.id] ? 'Show Less' : 'Show More'}
                                    />
                                </button>
                            </div>

                            {/* Section Content */}
                            {visibleSections[section.id] && (
                                <div className='flex flex-col'>
                                    <div className='flex h-[6vh] w-full bg-green-200 items-center justify-between space-x-4 font-bold border-2 border-black'>
                                        <h2 className='flex w-1/3 h-full justify-center border-r-2 border-black pt-2'>Môn học</h2>
                                        <h2 className='flex w-1/3 h-full justify-center border-r-2 border-black pt-2'>Hệ số</h2>
                                        <h2 className='flex w-1/3 h-full justify-center border-black pt-2'>Điểm</h2>
                                    </div>
                                    {section.content.map((item, index) => (
                                        <div
                                            key={index}
                                            className='flex h-[6vh] w-full bg-green-200 items-center justify-between space-x-4 font-bold border-r-2 border-b-2 border-l-2 border-black'
                                        >
                                            <h2 className='flex w-1/3 h-full justify-center border-r-2 border-black pt-2'>{item.subject}</h2>
                                            <h2 className='flex w-1/3 h-full justify-center border-r-2 border-black pt-2'>{item.weight}</h2>
                                            <h2 className='flex w-1/3 h-full justify-center border-black pt-2'>{item.score}</h2>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default StudentPage;
