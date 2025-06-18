import React, { useState } from 'react'
import { StickyNote } from 'lucide-react';
import axios from '../../../configs/axios'
import { convertToCSV } from '../../../utils/helper';
import { CSVLink } from "react-csv";

const ExportButton = () => {
    const [csvData, setCsvData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const exportHandler = async () => {
        try {
            setIsLoading(true)
            const { data } = await axios.get(`/student/get-student-learning-outcome-score`);
            setCsvData(convertToCSV(data.metadata))
        } catch (error) {
            console.error('Error fetching data for export:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='flex gap-2 bg-[#FEB333] rounded px-6 py-2 border-2 border-[#E2A12E]'>
            <StickyNote className='text-stone-600' />
            {csvData.length > 0 ? (
                <CSVLink
                    className='text-base text-stone-600 hover:underline'
                    data={csvData}
                    filename="student-learning-outcomes.csv"
                >
                    Download CSV
                </CSVLink>
            ) : (
                <button
                    onClick={exportHandler}
                    disabled={isLoading}
                    className='text-base text-stone-600 bg-transparent border-none cursor-pointer hover:underline disabled:opacity-50'
                >
                    {isLoading ? 'Loading...' : 'Export to CSV'}
                </button>
            )}
        </div>
    )
}

export default ExportButton