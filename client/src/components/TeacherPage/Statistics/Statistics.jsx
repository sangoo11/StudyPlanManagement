import React from 'react';
import BarChart from './BarChart';

function Statistics(props) {
    const [chartData, setChartData] = React.useState({
        labels: ['LO1', 'LO2', 'LO3', 'LO4', 'LO5', 'LO6'],
        datasets: [
            {
                label: 'My First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 206, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(153, 102, 255)',
                    'rgb(255, 159, 64)'
                ],
                borderWidth: 1
            }
        ]
    });

    React.useEffect(() => {
        // fetch data from server
        // setChartData(data)
    }, []);

    return (
        <div className='mt-[8vh] grid grid-cols-2 grid-rows-2 gap-4'>
            <div><BarChart chartData={chartData} /></div>
            <div>Chart2</div>
            <div>Chart3</div>
            <div>Chart4</div>
        </div>

    );
}

export default Statistics;