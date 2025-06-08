import React, { useState, useEffect } from "react";
import axios from "axios";

function AddStudent({ onClose, courseId }) {
    const [formData, setFormData] = useState({ studentID: "" });
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Fetch all students on mount
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get("http://localhost:8080/v1/api/student/get-all-student");
                setStudents(response.data.metadata || []);
            } catch (err) {
                console.error("Error fetching students:", err);
                setError("Failed to load student list.");
            }
        };
        fetchStudents();
    }, []);

    // Handle dropdown change
    const handleChange = (e) => {
        const selectedId = e.target.value;
        setFormData({ studentID: selectedId });

        const student = students.find(s => s.id.toString() === selectedId);
        setSelectedStudent(student || null);
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.studentID) {
            setError("Please select a student.");
            return;
        }

        setLoading(true);
        setError(null);

        const enrollmentPayload = {
            studentLists: [{ studentID: Number(formData.studentID) }],
        };

        try {
            await axios.post(
                `http://localhost:8080/v1/api/enrollment/enroll-student/${courseId}`,
                enrollmentPayload
            );
            alert("Student successfully added to the course.");
            onClose();
            window.location.reload();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to enroll student.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="flex flex-col w-[50vw] h-[70vh] bg-gray-200 p-6 rounded">
                <h2 className="flex w-full justify-center text-3xl font-bold mb-4">Add New Student</h2>
                <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-700">Select Student:</label>
                        <select
                            name="studentID"
                            value={formData.studentID}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded"
                        >
                            <option value="">-- Select a student --</option>
                            {students.map((student) => (
                                <option key={student.id} value={student.id}>
                                    {student.fullName} (ID: {student.id})
                                </option>
                            ))}
                        </select>
                    </div>

                    {selectedStudent && (
                        <div className="mt-4 p-4 bg-gray-100 border rounded">
                            <h3 className="font-bold mb-1">Student Details:</h3>
                            <p><strong>ID:</strong> {selectedStudent.id}</p>
                            <p><strong>Full Name:</strong> {selectedStudent.fullName}</p>
                            <p><strong>Year:</strong> {selectedStudent.year}</p>
                            <p><strong>Status:</strong> {selectedStudent.status}</p>
                        </div>
                    )}

                    {error && <p className="text-red-500">{error}</p>}

                    <div className="flex space-x-4 justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 bg-white text-[#1DA599] font-bold rounded hover:bg-[#1DA599] hover:text-white border-2 border-[#1DA599]"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-[#1DA599] text-white font-bold rounded hover:bg-green-400 disabled:opacity-50"
                        >
                            {loading ? "Submitting..." : "Confirm"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddStudent;
