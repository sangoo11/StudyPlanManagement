import React, { useState } from 'react';
import Chart from '../../../assets/images/statistics.jpg';

function StatisticsPage() {
  // State to manage active criteria
  const [activeCriteria, setActiveCriteria] = useState('tiêu chí 1');

  // Function to handle tab change
  const handleCriteriaChange = (criteria) => {
    setActiveCriteria(criteria);
  };

  return (
    <div className="min-h-screen p-6 mt-[8vh]">
      {/* Page Title */}
      <div className="flex text-center mb-6 justify-center">
        <h1 className="text-4xl font-bold text-teal-500">THỐNG KÊ</h1>
      </div>

      {/* Criteria Tabs */}
      <div className="flex justify-center mb-6 items-center justify-center">
        {['tiêu chí 1', 'tiêu chí 2', 'tiêu chí 3', 'tiêu chí 4'].map((criteria) => (
          <button
            key={criteria}
            className={`px-4 py-2 mx-2 text-white rounded-md ${activeCriteria === criteria ? 'bg-teal-500' : 'bg-teal-300'}`}
            onClick={() => handleCriteriaChange(criteria)}
          >
            {criteria}
          </button>
        ))}
      </div>

      {/* Display Cards for Statistics */}
      <div className="flex justify-center space-x-6 ">
        <div className="rounded-lg shadow-lg w-[60vw] h-[60vh] flex items-center justify-center">
          <img src={Chart} alt="Statistics 1" className="w-full h-full" />
        </div>
        <div className="rounded-lg shadow-lg w-[60vw] h-[60vh] flex items-center justify-center">
          <img src={Chart} alt="Statistics 2" className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}

export default StatisticsPage;
