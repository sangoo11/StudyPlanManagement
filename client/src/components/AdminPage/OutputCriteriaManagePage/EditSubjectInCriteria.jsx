import React, { useState, useEffect } from "react";
import axios from "axios";

function EditSubjectInCriteria({ onClose, lOID, onEditedSubject }) {
  const [subjects, setSubjects] = useState([]);  // To store fetched subjects with details
  const [selectedSubjectID, setSelectedSubjectID] = useState(null);  // To store the selected subject ID
  const [level, setLevel] = useState("");  // To store the selected level

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

  // Handle subject editing
  const handleEdit = async (e) => {
    e.preventDefault(); // Prevent form default submission behavior
    if (!selectedSubjectID) {
      alert("Please select a subject to edit.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/v1/api/learning-outcome/edit-subject-learning-outcome/${lOID}`,
        {
          subjectID: Number(selectedSubjectID),
          level,
        }
      );
      if (response.status === 201) {
        alert("Chỉnh sửa môn học thành công");
        if (onEditedSubject) {
          onEditedSubject();
        }
        onClose(); // Close the modal after successful editing
      } else {
        alert("Không thể chỉnh sửa môn học. Vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Error editing subject:", error);
      alert("Failed to edit the subject. Please check the console for details.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="flex flex-col w-[50vw] h-auto bg-gray-200 p-6 rounded">
        <h2 className="flex justify-center text-3xl font-bold mb-4">Chỉnh sửa môn học</h2>
        <form className="flex flex-col space-y-4" onSubmit={handleEdit}>
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

            <label className="text-xl mb-2 mt-4">Chọn mức độ</label>
            <input
              className="p-2 border rounded"
              value={level}
              placeholder="Mức độ"
              onChange={(e) => setLevel(e.target.value)}
            />
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
              className="px-6 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700"
            >
              Chỉnh sửa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditSubjectInCriteria;
