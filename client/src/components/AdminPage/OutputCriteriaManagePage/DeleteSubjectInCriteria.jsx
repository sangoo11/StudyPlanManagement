import React, { useState, useEffect } from "react";
import axios from "axios";

function DeleteSubjectInCriteria({ onClose, lOID, onDeletedSubject }) {
  const [subjects, setSubjects] = useState([]);  // To store fetched subjects with details
  const [selectedSubjectID, setSelectedSubjectID] = useState(null);  // To store the selected subject ID

  // Fetch all subjects associated with the learning outcome (lOID)
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/v1/api/learning-outcome/get-all-subject/${lOID}`
        );
        if (response.status === 201) {
          const subjectDetailsPromises = response.data.metadata.map(async (subject) => {
            // For each subject, fetch the subject code and details
            const subjectResponse = await axios.get(
              `http://localhost:8080/v1/api/subject/get-subject/${subject.subjectID}`
            );
            return {
              subjectID: subject.subjectID,
              subjectCode: subjectResponse.data.metadata.subjectCode,
            };
          });

          const subjectsWithCode = await Promise.all(subjectDetailsPromises);
          setSubjects(subjectsWithCode);
        } else {
          alert("Failed to fetch subjects. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching subjects:", error);
        alert("Failed to fetch subjects. Please check the console for details.");
      }
    };

    fetchSubjects();
  }, [lOID]);

  // Handle subject deletion
  const handleDelete = async (e) => {
    e.preventDefault(); // Prevent form default submission behavior
    if (!selectedSubjectID) {
      alert("Please select a subject to delete.");
      return;
    }

    console.log(Number(selectedSubjectID));
    try {
      const response = await axios.delete(
        `http://localhost:8080/v1/api/learning-outcome/delete-subject-learning-outcome/${lOID}`,
        {
            data: { subjectID: Number(selectedSubjectID) },
        }
      );
      if (response.status === 201) {
        alert("Xóa môn học thành công");
        if (onDeletedSubject) {
          onDeletedSubject();
        }
        onClose(); // Close the modal after successful deletion
      } else {
        alert("Không thể xóa môn học. Vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Error deleting subject:", error);
      alert("Failed to delete the subject. Please check the console for details.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="flex flex-col w-[50vw] h-auto bg-gray-200 p-6 rounded">
        <h2 className="flex justify-center text-3xl font-bold mb-4">Xóa môn học</h2>
        <form className="flex flex-col space-y-4" onSubmit={handleDelete}>
          <div className="flex flex-col">
            <label className="text-xl mb-2">Chọn môn học</label>
            <select
              className="p-2 border rounded"
              value={selectedSubjectID}
              onChange={(e) => setSelectedSubjectID(e.target.value)}
            >
              <option value="" disabled>
                -- Chọn môn học --
              </option>
              {subjects.map((subject) => (
                <option key={subject.subjectID} value={subject.subjectID}>
                  {subject.subjectID} - {subject.subjectCode}
                </option>
              ))}
            </select>
          </div>
          <div className="flex space-x-4 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-white text-[#1DA599] font-bold rounded hover:bg-[#1DA599] hover:text-white border-2 border-[#1DA599]"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-700"
            >
              Xóa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DeleteSubjectInCriteria;
