import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";
import { Bar } from 'react-chartjs-2';

// Register the necessary Chart.js components
ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
);

function Statistics() {
    const [barData, setBarData] = useState(null);
    const [studentID, setStudentID] = useState(1);
    const [studentList, setStudentList] = useState({})


    useEffect(() => {
        const getStudentList = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8080/v1/api/student/get-all-student`)
                setStudentList(data.metadata)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        getStudentList()
    })

    useEffect(() => {
        const getBarChart = async () => {
            try {
                // Fetch data from API
                const { data } = await axios.get(`http://localhost:8080/v1/api/student/get-student-learning-outcome-score/${studentID}`);
                // Process and set the chart data
                setBarData({
                    labels: data.metadata.map((item) => item.LearningOutcome.learningOutcomeCode),
                    datasets: [{
                        label: 'Learning Outcome Score',
                        data: data.metadata.map((item) => item.score),  // assuming 'score' is the field holding the score value
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

        // Fetch chart data when the component is mounted
        getBarChart();
    }, [studentID]);

    // Render the Bar chart if barData is available
    if (!barData) {
        return <div>Loading...</div>;
    }

    return (
        <div className='mt-[8vh] grid grid-cols-2 col-span-4'>
            <div>
                <select
                    className="px-4 py-2 border rounded-md bg-white ml-[2.6vw]"
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
                    options={{
                        responsive: true,
                        plugins: {
                            title: {
                                display: true,
                                text: 'Learning Outcome Score'
                            }
                        }
                    }}
                />
            </div>
            <div>Chart 2</div>
        </div>
    );
}

export default Statistics;
