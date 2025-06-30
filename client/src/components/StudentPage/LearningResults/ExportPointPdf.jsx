import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const ExportPoint = ({ scores }) => {
    const exportPDF = () => {
        const doc = new jsPDF();

        const headers = [
            [
                "ID", "Final Grade", "Status", "Enrolled Date", "Student ID", "Course ID",
                "Course Code", "Semester", "Year", "Student Count",
                "Subject Code", "Subject Name", "Credit",
                "Final", "Midterm", "Progress"
            ]
        ];

        const rows = scores.map(entry => {
            const scoreMap = Object.fromEntries(entry.scores.map(s => [s.scoreType, s.score]));
            return [
                entry.id,
                entry.finalGrade,
                entry.status,
                new Date(entry.enrolledDate).toLocaleDateString('vi-VN'),
                entry.studentID,
                entry.courseID,
                entry.Course.courseCode,
                entry.Course.semester,
                entry.Course.year,
                entry.Course.studentCount,
                entry.Course.Subject.subjectCode,
                entry.Course.Subject.subjectName, // Vietnamese here
                entry.Course.Subject.credit,
                scoreMap.final || '',
                scoreMap.midterm || '',
                scoreMap.progress || ''
            ];
        });

        autoTable(doc, {
            head: headers,
            body: rows,
            styles: {
                font: 'helvetica', // Try 'courier' or 'times' if 'helvetica' fails
                fontSize: 9,
            },
            headStyles: {
                fillColor: [29, 165, 153],
                textColor: 255,
                fontStyle: 'bold'
            },
            startY: 20,
            margin: { top: 20 },
            theme: 'grid'
        });

        doc.save('student_scores.pdf');
    };

    return (
        <div className='text-center mb-8'>
            <button
                onClick={exportPDF}
                className='rounded-sm shadow-sm bg-[#1DA599] text-white px-6 py-2'
            >
                Download PDF
            </button>
        </div>
    );
};

export default ExportPoint;
