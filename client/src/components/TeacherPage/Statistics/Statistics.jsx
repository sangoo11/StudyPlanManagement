import React from 'react';
import BarChart from './BarChart';

function Statistics(props) {
    const [barChartData, setBarChartData] = React.useState();

    React.useEffect(() => {
        const getBarChartData = async () => {
            const accountID = localStorage.getItem('accountID');
            let teacherID;
            if (!accountID) return;
            try {
                const response = await axios.get(`http://localhost:8080/v1/api/account/get-user-id/${accountID}`);
                teacherID = response.data.metadata.teacherID;
            } catch (error) {
                console.error(error.response?.data?.message || 'Error get teacherID');
            }

            const response = await fetch(`http://localhost:8080/v1/api/student/get-student-learning-outcome-score/${studentID}`);
            const data = await response.json();
            setBarChartData(data);
        }
    }, [studentID]);

    return (
        <div className='mt-[8vh] grid grid-cols-2 grid-rows-2 gap-4'>
            <div>
                <input type='text' placeholder='Search' />
                <BarChart barChartData={barChartData} />
            </div>
            <div>Chart2</div>
            <div>Chart3</div>
            <div>Chart4</div>
        </div>

    );
}

export default Statistics;