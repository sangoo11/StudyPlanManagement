import React, { useState, useEffect } from "react";
import axios from "axios";

function AddSubjectInCriteria({ onClose, id }) {
  const [subjectID, setSubjectID] = useState(""); // Default empty value for subjectID
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [subjects, setSubjects] = useState([]); // To store the subjects from the API

  console.log(id);
  // Fetch the subjects when the component mounts
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/v1/api/subject/get-all-subject"
        );
        if (response.status === 201) {
          setSubjects(response.data.metadata); // Set the fetched subjects
        }
      } catch (err) {
        setError("Failed to fetch subjects");
        console.error("Error fetching subjects:", err);
      }
    };

    fetchSubjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post(
        `http://localhost:8080/v1/api/learning-outcome/create-subject-learning-outcome/${id}`,
        { subjectID }
      );
      if (response.status === 201) {
        setSuccess(true);
        // Optionally, you can call onClose() here to close the modal after success
      }
    } catch (err) {
      // Make sure error is a string, not an object
      setError(err.response ? err.response.data.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="flex flex-col w-[50vw] h-[70vh] bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Thêm môn học mới 
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Dropdown for Subject */}
          <div>
            <label className="text-gray-700 text-lg font-medium mb-2 block">
              Choose Subject:
            </label>
            <select
              value={subjectID}
              onChange={(e) => setSubjectID(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>Select a subject</option>
              {Array.isArray(subjects) &&
                subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.subjectCode} - {subject.subjectName}
                  </option>
                ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full p-3 text-white rounded-md ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} transition duration-200`}
            disabled={loading}
          >
            {loading ? "Loading..." : "Add Subject"}
          </button>

          {/* Error and Success Messages */}
          {error && (
            <p className="text-red-500 mt-2 text-center font-semibold">
              {typeof error === "string" ? error : "An error occurred"}
            </p>
          )}

          {success && (
            <p className="text-green-500 mt-2 text-center font-semibold">
              Subject added successfully!
            </p>
          )}
        </form>

        {/* Close Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddSubjectInCriteria;
