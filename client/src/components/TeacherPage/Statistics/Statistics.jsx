import React from 'react';
import BarChart from './BarChart';
import axios from 'axios';
import Dataset from './data.json'

function Statistics() {
    const [barChartData, setBarChartData] = React.useState({
        labels: Dataset.map((data) => data.LearningOutcome.learningOutcomeCode),
        datasets: [{
            label: 'Learning Outcome Score',
            data: Dataset.map((data) => parseFloat(data.score)),
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


    const [studentID, setStudentID] = React.useState(1);
    const [studentList, setStudentList] = React.useState();
    React.useEffect(() => {
        const getStudentList = async () => {
            const response = await axios.get('http://localhost:8080/v1/api/student/get-all-student');
            setStudentList(response.data.metadata);
        }
        getStudentList();
        console.log(Dataset, Dataset.map((data) => data.LearningOutcome.learningOutcomeCode));
    }, []);

    // React.useEffect(() => {
    //     const getBarChartData = async () => {
    //         const response = await axios.get(`http://localhost:8080/v1/api/student/get-student-learning-outcome-score/${studentID}`);
    //         setBarChartData();
    //     }
    //     getBarChartData();
    // }, [studentID]);

    const handleInputChange = (e) => {
        setStudentID(e.target.value);
    };

    return (
        <div className='mt-[8vh] grid grid-cols-2 grid-rows-2 gap-4'>
            <div>
                <select
                    className="px-4 py-2 border rounded-md bg-white ml-[1vw]"
                    value={studentID}
                    onChange={handleInputChange}>
                    <option value=''>Select Student</option>
                    {studentList && studentList.map((student, index) => (
                        <option key={index} value={student.id}>{student.id}: {student.fullName}</option>
                    ))}
                </select>
                <BarChart barChartData={barChartData} />
            </div>
            <div>Chart2</div>
            <div>Chart3</div>
            <div>Chart4</div>
        </div>
    );
}

export default Statistics;