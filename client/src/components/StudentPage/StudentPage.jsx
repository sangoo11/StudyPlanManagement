import React, { useState, useEffect } from 'react';
import axios from 'axios';

import stage_1 from '../../assets/images/stage_1.jpg';
import Image1 from '../../assets/images/1.jpg';
import Image1_1 from '../../assets/images/1.1.jpg';
import Image1_2 from '../../assets/images/1.2.jpg';
import Image1_3 from '../../assets/images/1.3.jpg';
import Image2 from '../../assets/images/2.jpg';
import Image2_1 from '../../assets/images/2.1.jpg';
import Image2_2 from '../../assets/images/2.2.jpg';
import Image2_3 from '../../assets/images/2.3.jpg';


function StudentPage(props) {

    const titleLeftHandSide = 'CÂY HỌC PHẦN';
    const titleRightHandSide = 'THÔNG TIN CHI TIẾT';
    const credits = 10;
    const content = 'Số tín chỉ đăng ký: ' + credits;

    const totalResult1 = 8.0;
    const content1 = 'Tiêu chí 1 : ' + totalResult1;

    // State to store the credits learned and treeImage
    const [creditLearned, setCreditLearned] = useState(0);
    const [awardCount, setAwardCount] = useState(0);
    const [treeImage, setTreeImage] = useState(null); // state for tree image
    const [error, setError] = useState(null);


    // Use useEffect to set the tree image based on creditLearned
    useEffect(() => {
        const getAwardCount = async () => {
            const accountID = localStorage.getItem('accountID');
            try {
                const { data } = await axios.get(`http://localhost:8080/v1/api/award/get-number-award/${accountID}`);
                setAwardCount(data.metadata.awardCount);
            } catch (error) {
                console.error(error.response?.data?.message || 'Error fetching award count');
            }
        };
        getAwardCount();

        const getCreditLearned = async () => {
            const accountID = localStorage.getItem('accountID');
            try {
                const { data } = await axios.get(`http://localhost:8080/v1/api/account/get-user-data/${accountID}`);
                setCreditLearned(data.metadata.credit);
            } catch (error) {
                console.error(error.response?.data?.message || 'Error fetching credit learned');
            }
        };
        getCreditLearned();

        if (creditLearned !== null) {
            if (creditLearned < 10) {
                setTreeImage(<img src={stage_1} alt="stage_1" />);
            } else if (creditLearned < 70) {
                switch (awardCount) {
                    case 1:
                        setTreeImage(<img src={Image1_1} alt="Image1_1" />);
                        break;
                    case 3:
                        setTreeImage(<img src={Image1_2} alt="Image1_2" />);
                        break;
                    case 5:
                        setTreeImage(<img src={Image1_3} alt="Image1_3" />);
                        break;
                    default:
                        setTreeImage(<img src={Image1} alt="Image1" />);
                        break;
                }
            } else {
                switch (awardCount) {
                    case 1:
                        setTreeImage(<img src={Image2_1} alt="Image2_1" />);
                        break;
                    case 3:
                        setTreeImage(<img src={Image2_2} alt="Image2_2" />);
                        break;
                    case 5:
                        setTreeImage(<img src={Image2_3} alt="Image2_3" />);
                        break;
                    default:
                        setTreeImage(<img src={Image2} alt="Image2" />);
                        break;
                }
            }
        }
    }, [creditLearned, awardCount]); // re-run when creditLearned changes

    // State to manage visibility for multiple sections
    const [visibleSections, setVisibleSections] = React.useState({});


    return (
        <div className="flex-1 pt-[10vh] flex min-h-screen">
            {/* Left Side */}
            <div className="flex flex-col w-1/2 text-black items-center justify-center">
                <div className="flex flex-col pb-[6vh]">
                    <h2 className="text-3xl font-bold">{titleLeftHandSide}</h2>
                    <h2 className="text-2xl font-bold ml-4">Year : 1 | Term : 1</h2>
                </div>
                <div className='flex justify-center py-[4vw] w-1/2 border-2 border-[#1DA599]'>
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
                        <div>
                            <h2 className="text-2xl pb-[2vh]">
                                Số tín chỉ đăng ký: {creditLearned !== null ? creditLearned : 'Loading...'}
                            </h2>
                            <h2 className="text-2xl pb-[2vh]">
                                Số giải thưởng đạt được: {awardCount !== null ? awardCount : 'Loading...'}
                            </h2>
                        </div>
                    )}

                    {/* <Bar /> */}



                </div>
            </div>
        </div>
    );
}

export default StudentPage;
