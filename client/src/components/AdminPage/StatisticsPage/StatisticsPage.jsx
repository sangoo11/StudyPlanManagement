import React from 'react';

function StatisticsPage(props) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
            {/* Header */}
            <h1 className="text-2xl font-bold text-teal-600 mb-6">THỐNG KÊ</h1>

            {/* Criteria Section */}
            <div className="flex items-center space-x-4 mb-8">
                <span className="text-lg font-semibold">Tiêu chí:</span>
                {['tiêu chí 1', 'tiêu chí 2', 'tiêu chí 3', 'tiêu chí 4'].map((criteria, index) => (
                    <button
                        key={index}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 focus:outline-none"
                    >
                        {criteria}
                    </button>
                ))}
            </div>

            {/* Images Section */}
            <div className="grid grid-cols-2 gap-20">
                <div className="w-[40vw] h-[60vh] bg-teal-300 flex items-center justify-center rounded">
                    <img
                        src="https://via.placeholder.com/100"
                        alt="placeholder"
                        className="w-16 h-16"
                    />
                </div>
                <div className="w-[40vw] h-[60vh] bg-teal-300 flex items-center justify-center rounded">
                    <img
                        src="https://via.placeholder.com/100"
                        alt="placeholder"
                        className="w-16 h-16"
                    />
                </div>
            </div>
        </div>
    );
}

export default StatisticsPage;
