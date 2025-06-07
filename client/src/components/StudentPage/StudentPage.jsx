import React, {useState, useEffect} from 'react';
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
import DynamicTree from "./Tree/DynamicTree.js.jsx";


function StudentPage(props) {
    // State to store the credits learned and treeImage
    const [creditLearned, setCreditLearned] = useState(0);
    const [awardCount, setAwardCount] = useState(0);
    const [score, setScore] = useState(0);
    const [error, setError] = useState(null);


    // Use useEffect to set the tree image based on creditLearned
    useEffect(() => {
        const getAwardCount = async () => {
            const accountID = localStorage.getItem('accountID');
            try {
                const {data} = await axios.get(`http://localhost:8080/v1/api/award/get-number-award/${accountID}`);
                setAwardCount(data.metadata.awardCount);
            } catch (error) {
                console.error(error.response?.data?.message || 'Error fetching award count');
            }
        };
        getAwardCount();

        const getCreditLearned = async () => {
            const accountID = localStorage.getItem('accountID');
            try {
                const {data} = await axios.get(`http://localhost:8080/v1/api/account/get-user-data/${accountID}`);
                setCreditLearned(data.metadata.credit);
            } catch (error) {
                console.error(error.response?.data?.message || 'Error fetching credit learned');
            }
        };
        getCreditLearned();

        setScore(creditLearned + awardCount * 3);
    }, [creditLearned, awardCount]); // re-run when creditLearned changes

    return (
        <div className="flex-1 pt-[10vh] flex min-h-screen">
            {/* Left Side */}
            <div className="pl-16 flex flex-col w-1/2 text-black items-center justify-center">
                <div className="flex flex-col pb-[6vh]">
                    <h2 className="text-3xl font-bold">Cây học phần</h2>
                </div>
                <div className='flex justify-center flex-col'>
                    {/*{treeImage}*/}
                    <DynamicTree userScore={score}/>
                    <p className={'text-center text-stone-800 mt-4'}>You can preview the tree by select the process
                    </p>
                </div>
            </div>

            {/* Right Side */}
            <div className="flex flex-col text-black w-1/2 h-auto items-center justify-center">
                {/*<h1 className="text-3xl font-bold pb-[2vh]">{titleRightHandSide}</h1>*/}
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
                            <h2 className="text-2xl pb-[2vh]">
                                Số điểm hiện tại của bạn: {score !== null ? score : 'Loading...'}
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
