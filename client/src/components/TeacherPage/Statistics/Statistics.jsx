import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { Bar, Pie, Doughnut } from 'react-chartjs-2';
import ExportButton from './ExportButton';

// Register the necessary Chart.js components
ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

function Statistics() {
    const [barData, setBarData] = useState(null);
    const [barOption, setBarOption] = useState(null);
    const [studentID, setStudentID] = useState(1);
    const [studentList, setStudentList] = useState(null)

    const [doughnutData, setDoughnutData] = useState(null);
    const [LOID, setLOID] = useState(2);
    const [LOIDList, setLOIDList] = useState({})


    useEffect(() => {
        const getLOIDList = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8080/v1/api/learning-outcome/get-all-learning-outcome`)
                setLOIDList(data.metadata)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        getLOIDList();

        const getDoughnutData = async () => {

            try {
                // Fetch data from API
                const { data } = await axios.get(`http://localhost:8080/v1/api/subject/get-LO-score/${LOID}`);

                // Process and set the chart data
                setDoughnutData({
                    labels: Object.keys(getHighestScore(data.metadata.map((item) => item.highestLevel))),
                    datasets: [{
                        label: 'Learning Outcome Score',
                        data: (Object.values(getHighestScore(data.metadata.map((item) => item.highestLevel)))),
                        backgroundColor: [
                            'rgb(255, 105, 180)',   // Hot Pink
                            'rgb(255, 165, 0)',     // Orange
                            'rgb(255, 223, 186)',   // Light Peach
                            'rgb(100, 149, 237)',   // Cornflower Blue
                            'rgb(34, 193, 195)',    // Turquoise
                            'rgb(255, 105, 180)',   // Hot Pink
                            'rgb(72, 61, 139)'      // Dark Slate Blue
                        ],
                        borderColor: [
                            "rgb(34, 185, 129)",
                            "rgb(210, 45, 158)",
                            "rgb(55, 112, 200)",
                            "rgb(248, 94, 53)",
                            "rgb(132, 77, 224)",
                            "rgb(12, 195, 178)",
                            "rgb(180, 55, 111)"  // Dark Slate Blue
                        ],
                        borderWidth: 1
                    }]
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        // Fetch chart data when the component is mounted
        getDoughnutData();
    }, [LOID]);

    const extractNumbers = (str) => {
        if (!str) return 0; // Return 0 or another default value if str is null/undefined
        const matches = str.match(/\d+/g);
        return matches ? parseInt(matches[0], 10) : 0; // Return the first matched number or 0 if none found
    };

    const getHighestScore = (arr) => {
        const counts = {};

        arr.forEach(function (x) {
            counts[x] = (counts[x] || 0) + 1;
        });
        return counts;
    }

    useEffect(() => {
        const getStudentList = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8080/v1/api/student/get-all-student`)
                setStudentList(data.metadata)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        getStudentList();

        const getBarChart = async () => {

            try {
                // Fetch data from API
                const { data } = await axios.get(`http://localhost:8080/v1/api/student/get-student-learning-outcome-score/?studentID=${studentID}`);

                // Process and set the chart data
                setBarData({
                    labels: data.metadata.map((item) => item.LearningOutcome.learningOutcomeCode),
                    datasets: [{
                        label: 'Learning Outcome Score',
                        data: data.metadata.map((item) => extractNumbers(item.highestLevel)),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 205, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(201, 203, 207, 0.2)'
                        ],
                        borderColor: [
                            'rgb(255, 99, 132)',
                            'rgb(255, 159, 64)',
                            'rgb(255, 205, 86)',
                            'rgb(75, 192, 192)',
                            'rgb(54, 162, 235)',
                            'rgb(153, 102, 255)',
                            'rgb(201, 203, 207)'
                        ],
                        borderWidth: 1
                    }]
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const getBarOption = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8080/v1/api/subject/get-subject-by-LO/${studentID}`);
                setBarOption({
                    responsive: true,
                    scales: {
                        y: {
                            min: 0,
                            max: 6,
                            ticks: {
                                stepSize: 1,
                            },
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: 'Bar Chart'
                        },
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    const dataIndex = context.dataIndex;

                                    const loData = data.metadata[dataIndex];

                                    if (!Array.isArray(loData)) {
                                        return 'No subjects: ' + loData.level;
                                    }

                                    return loData.map(subject =>
                                        `${subject.subjectCode}: ${subject.level}`
                                    );
                                }
                            }
                        }
                    }
                });
            } catch (error) {
                console.error('Error fetching option:', error);
            }
        }
        // Fetch chart data when the component is mounted
        getBarChart();
        getBarOption();
    }, [studentID]);

    // Render the Bar chart if barData is available
    if (!barData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className='mt-[10vh] font-bold text-4xl text-center flex items-center gap-4 justify-center'>
                <h1>Thống kê</h1>
                <ExportButton />
            </div>
            <div className='mx-[4vw] mt-[8vh] grid grid-cols-2 space-x-40 max-h-screen'>
                <div>
                    {/*<h1 className="text-2xl font-bold text-center">Biểu đồ cột</h1>*/}
                    <select
                        className="p-4 border rounded-md bg-white"
                        value={studentID}
                        onChange={(e) => setStudentID(e.target.value)}
                    >
                        <option value="">Chọn học sinh</option>
                        {studentList && studentList.map((student, index) => (
                            <option key={index} value={student.id}>
                                {student.id}. {student.fullName}
                            </option>
                        ))}
                    </select>
                    <Bar
                        data={barData}
                        options={barOption}
                    />
                </div>
                <div>
                    {/*<h1 className="text-2xl font-bold text-center">Biểu đồ tròn</h1>*/}
                    <select
                        className="p-4 border rounded-md bg-white"
                        value={LOID}
                        onChange={(e) => setLOID(e.target.value)}
                    >
                        <option value="">Chọn tiêu chuẩn đầu ra</option>
                        {LOIDList && LOIDList.map((LO, index) => (
                            <option key={index} value={LO.id}>
                                {LO.id}. {LO.learningOutcomeCode}
                            </option>
                        ))}
                    </select>
                    <Doughnut
                        data={doughnutData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: true,
                            aspectRatio: 2 / 1,
                            plugins: {
                                title: {
                                    display: true,
                                    text: 'Doughnut Chart'
                                },
                            },

                        }}
                    />
                </div>
            </div>
        </>
    );
}

export default Statistics;

