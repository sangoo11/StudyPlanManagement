import React, { useState } from "react";
import axios from "axios";

function AddStudent({ onClose, courseId }) {
    const [formData, setFormData] = useState({ studentID: "" });
    const [studentData, setStudentData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Fetch student data
    const fetchStudentData = async () => {
        if (!formData.studentID) {
            setError("Student ID is required to fetch data.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(
                `http://localhost:8080/v1/api/student/get-student/${formData.studentID}`
            );
            setStudentData(response.data.metadata); // Adjust as per API response
        } catch (err) {
            setError(
                err.response?.data?.message || "Unable to fetch student data. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.studentID) {
            setError("Student ID is required.");
            return;
        }

        const enrollmentPayload = {
            studentLists: [{ studentID: Number(formData.studentID) }],
        };

        setLoading(true);
        setError(null);

        try {
            await axios.post(
                `http://localhost:8080/v1/api/enrollment/enroll-student/${courseId}`,
                enrollmentPayload
            );
            alert("Student successfully added to the course.");
            onClose();
            window.location.reload();
        } catch (err) {
            setError(
                err.response?.data?.message || "Failed to enroll student. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="flex flex-col w-[50vw] h-[70vh] bg-gray-200 p-6 rounded">
                <h2 className="flex w-full justify-center text-3xl font-bold mb-4">
                    Add New Student
                </h2>
                <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-700">Student ID:</label>
                        <input
                            type="text"
                            name="studentID"
                            value={formData.studentID}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded"
                        />
                        <button
                            type="button"
                            onClick={fetchStudentData}
                            disabled={loading}
                            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                        >
                            {loading ? "Fetching..." : "Fetch Student Data"}
                        </button>
                    </div>

                    {studentData && (
                        <div className="mt-4 p-4 bg-gray-100 border rounded">
                            <h3 className="font-bold">Student Details:</h3>
                            <p>ID: {studentData.id}</p>
                            <p>Full Name: {studentData.fullName}</p>
                            <p>Major: {studentData.major}</p>
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
