import React from 'react';
import { Chart as ChartJS, ArcElement } from "chart.js";
import { Pie, Doughnut } from 'react-chartjs-2';

// Register the necessary Chart.js components
ChartJS.register(
    ArcElement,
);

function PieChart(props) {
    return (
        <Doughnut />
    );
}

export default PieChart;