import React from 'react';

const ExportPoint = ({ scores }) => {
    const exportPoint = () => {
        const csvRows = [
            "id,finalGrade,status,enrolledDate,studentID,courseID,courseCode,semester,year,studentCount,subjectCode,subjectName,credit,finalScore,midtermScore,progressScore"
        ];

        for (const entry of scores) {
            const scoreMap = Object.fromEntries(entry.scores.map(s => [s.scoreType, s.score]));
            const row = [
                entry.id,
                entry.finalGrade,
                entry.status,
                entry.enrolledDate,
                entry.studentID,
                entry.courseID,
                entry.Course.courseCode,
                entry.Course.semester,
                entry.Course.year,
                entry.Course.studentCount,
                entry.Course.Subject.subjectCode,
                `"${entry.Course.Subject.subjectName}"`, // Vietnamese safe now
                entry.Course.Subject.credit,
                scoreMap.final || '',
                scoreMap.midterm || '',
                scoreMap.progress || ''
            ].join(',');
            csvRows.push(row);
        }

        const csvContent = '\uFEFF' + csvRows.join('\n'); // BOM added at the beginning
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "diem_sinh_vien.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className='text-center mb-8'>
            <button className='rounded-sm shadow-sm bg-[#1DA599] text-white px-6 py-2'
                onClick={exportPoint}>Download CSV</button>
        </div>
    );
};

export default ExportPoint;
