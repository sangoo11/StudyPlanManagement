import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import AddButton from "../../../assets/images/addButton.png";
import minusButton from "../../../assets/images/minusButton.png";
import ShowLess from "../../../assets/images/showLess.png";
import ShowMore from "../../../assets/images/showMore.png";
import AddCriteria from "./AddCriteria";
import DeleteCriteria from "./DeleteCriteria";
import EditCriteria from "./EditCriteria";
import AddSubject from "./AddSubjectInCriteria";
import DeleteSubject from "./DeleteSubjectInCriteria";
import EditSubject from "./EditSubjectInCriteria";

function OutputCriteriaManagePage() {
  // State for visibility of semesters
  const [visibleSemesters, setVisibleSemesters] = useState({});
  // State for learning outcomes
  const [learningOutcomes, setLearningOutcomes] = useState([]);
  // State for subjects by learning outcome
  const [subjects, setSubjects] = useState({});
  
  // States for modals
  const [isAddCriteriaVisible, setAddCriteriaVisible] = useState(false);
  const [isDeleteCriteriaVisible, setDeleteCriteriaVisible] = useState(false);
  const [isEditCriteriaVisible, setEditCriteriaVisible] = useState(false);
  const [selectedLearningOutcomeId, setSelectedLearningOutcomeId] = useState("");
  const [selectedLearningOutcomeCode, setSelectedLearningOutcomeCode] = useState("");
  const [isAddSubjectVisible, setAddSubjectVisible] = useState(false);
  const [isDeleteSubjectVisible, setDeleteSubjectVisible] = useState(false);
  const [isEditSubjectVisible, setEditSubjectVisible] = useState(false);
  
  const fetchLearningOutcomes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/v1/api/learning-outcome/get-all-learning-outcome"
      );
      const { metadata } = response.data;
      setLearningOutcomes(metadata || []);
    } catch (error) {
      console.error("Error fetching learning outcomes:", error);
    }
  };
  useEffect(() => {
    fetchLearningOutcomes();
  }, []);

  // Fetch subjects for a specific learning outcome
  const fetchSubjects = useCallback(async (learningOutcomeID) => {
    try {
      // Fetch subject IDs
      const response = await axios.get(
        `http://localhost:8080/v1/api/learning-outcome/get-all-subject/${learningOutcomeID}`
      );
      const subjectData = response.data.metadata;

      // Fetch subject details
      const subjectDetailsPromises = subjectData.map(async (item) => {
        const subjectResponse = await axios.get(
          `http://localhost:8080/v1/api/subject/get-subject/${item.subjectID}`
        );
        return {
          ...subjectResponse.data.metadata,
          level: item.level, // Include the level from subjectData
        };
      });
      const subjectDetails = await Promise.all(subjectDetailsPromises);

      setSubjects((prev) => ({
        ...prev,
        [learningOutcomeID]: subjectDetails,
      }));
    } catch (error) {
      console.error(`Error fetching subjects for learning outcome ${learningOutcomeID}:`, error);
    }
  }, []);
  
  useEffect(() => {
    if (selectedLearningOutcomeId) {
      fetchSubjects(selectedLearningOutcomeId);
    }
  }, [selectedLearningOutcomeId, fetchSubjects]);

  // Toggle visibility for a specific semester
  const toggleSemesterVisibility = useCallback(
    (id) => {
      setVisibleSemesters((prev) => ({
        ...prev,
        [id]: !prev[id],
      }));

      // Fetch subjects when expanding
      if (!visibleSemesters[id]) {
        fetchSubjects(id);
      }
    },
    [fetchSubjects, visibleSemesters]
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Page Title */}
      <header className="flex items-center justify-center mt-[8vh]">
        <h1 className="text-3xl font-bold text-[#1DA599] mb-6 text-center">
          Quản lý tiêu chuẩn đầu ra
        </h1>
      </header>

      {/* Learning Outcomes List */}
      <main className="flex flex-col mt-4 space-y-4">
        {learningOutcomes.map((outcome) => (
          <div
            key={outcome.id}
            className="flex flex-col bg-white shadow-lg rounded-lg border border-gray-300 overflow-hidden"
          >
            {/* Header */}
            <header className="flex justify-between items-center p-4 bg-[#f9f9f9] border-b border-gray-200">
              <h2 className={`text-xl font-semibold ${outcome.active ? 'text-green-500' : 'text-red-500'}`}>
                {outcome.learningOutcomeCode}: {outcome.learningOutcomeName}
              </h2>
              <div className="flex items-center space-x-2">

                {/* Delete Button */}
                <button
                  className="flex justify-center items-center w-11 h-full rounded-full hover:border-4 hover:border-yellow-400 transition border-4 border-white"
                  onClick={() => {
                    setSelectedLearningOutcomeId(outcome.id);
                    setSelectedLearningOutcomeCode(outcome.learningOutcomeCode); 
                    setDeleteCriteriaVisible(true);
                  }}
                  aria-label="Delete Criteria"
                >
                  <img src={minusButton} alt="Delete" />
                </button>

                {/* Toggle Button */}
                <button
                  className="flex justify-center items-center w-8 h-8 rounded-full hover:bg-gray-200 transition"
                  onClick={() => toggleSemesterVisibility(outcome.id)}
                  aria-label={
                    visibleSemesters[outcome.id] ? "Collapse Details" : "Expand Details"
                  }
                >
                  <img
                    src={visibleSemesters[outcome.id] ? ShowLess : ShowMore}
                    alt={visibleSemesters[outcome.id] ? "Show Less" : "Show More"}
                  />
                </button>

              </div>
            </header>

            {/* Details and Table */}
            {visibleSemesters[outcome.id] && (
              <div className="p-4">
                <p className="mb-2">
                  <strong>Description:</strong> {outcome.description}
                </p>
                <p>
                  <strong>Status:</strong> {outcome.active ? "Active" : "Inactive"}
                </p>
                <div className="flex justify-between">
                    
                    <button
                      onClick={() => {
                        setSelectedLearningOutcomeId(outcome.id);
                        setAddSubjectVisible(true);
                      }}
                      className="w-[20vw] h-10 bg-[#1DA599] font-bold text-white rounded hover:border-4 hover:border-yellow-400 flex items-center justify-center mt-[4vh]"
                      aria-label="Add Subject"
                    >
                      Thêm môn học
                    </button>
                    
                    <button
                      onClick={() => {
                        setSelectedLearningOutcomeId(outcome.id);
                        setEditSubjectVisible(true);
                      }}
                      className="w-[20vw] h-10 bg-[#1DA599] font-bold text-white rounded hover:border-4 hover:border-yellow-400 flex items-center justify-center mt-[4vh]"
                      aria-label="Edit Subject"
                    >
                      Chỉnh sửa môn học
                    </button>

                    <button
                      onClick={() => {
                        setSelectedLearningOutcomeId(outcome.id);
                        setDeleteSubjectVisible(true);
                      }}
                      className="w-[20vw] h-10 bg-[#1DA599] font-bold text-white rounded hover:border-4 hover:border-yellow-400 flex items-center justify-center mt-[4vh]"
                      aria-label="Delete Subject"
                    >
                      Xóa môn học
                    </button>
                </div>

                {/* Table */}
                {subjects[outcome.id] && (
                  <table className="w-full mt-4 border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-2">Mã môn học</th>
                        <th className="border border-gray-300 p-2">Tên môn học</th>
                        <th className="border border-gray-300 p-2">Mức độ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subjects[outcome.id].map((subject) => (
                        <tr key={subject.id} className="text-center">
                          <td className="border border-gray-300 p-2">{subject.id}</td>
                          <td className="border border-gray-300 p-2">{subject.subjectName}</td>
                          <td className="border border-gray-300 p-2">{subject.level || "N/A"}</td> {/* Placeholder for Factor */}
                        </tr>
                      ))}
                    </tbody>
                  </table>  
                )}
                <div>
                    <button
                      onClick={() => {
                        setSelectedLearningOutcomeId(outcome.id);
                        setEditCriteriaVisible(true);
                      }}
                      className="w-[20vw] h-10 bg-[#1DA599] font-bold text-white rounded hover:border-4 hover:border-yellow-400 flex items-center justify-center mt-[4vh]"
                      aria-label="Add Criteria"
                    >
                      Chỉnh sửa tiêu chuẩn đầu ra
                    </button>
                </div>
                
              </div>
            )}
          </div>
        ))}
      </main>

      {/* Action Buttons */}
      <footer className="mt-6 flex justify-end space-x-4 mr-[2vw]">
        <button
          onClick={() => setAddCriteriaVisible(true)}
          className="w-10 h-10 bg-[#1DA599] text-white rounded-full hover:border-4 hover:border-yellow-400 hover:text-gray-700 flex items-center justify-center"
          aria-label="Add Criteria"
        >
          <img src={AddButton} alt="Add" />
        </button>
      </footer>

      {/* Modals */}
      {isAddCriteriaVisible && (
        <AddCriteria onClose={() => setAddCriteriaVisible(false)} onAddedCriteria={fetchLearningOutcomes} />
      )}
      {isEditCriteriaVisible && (
        <EditCriteria 
            onClose={() => setEditCriteriaVisible(false)} 
            id={selectedLearningOutcomeId}
            onEditedCriteria={fetchLearningOutcomes}
        />
      )}
      {isDeleteCriteriaVisible && (
        <DeleteCriteria 
            onClose={() => setDeleteCriteriaVisible(false)} 
            id={selectedLearningOutcomeId}
            lOID={selectedLearningOutcomeCode}
            onDeletedCriteria={fetchLearningOutcomes}
        />
      )}
      {isDeleteSubjectVisible && (
        <DeleteSubject
            onClose={() => setDeleteSubjectVisible(false)} 
            lOID={selectedLearningOutcomeId}
            onDeletedSubject={() => fetchSubjects(selectedLearningOutcomeId)}
        />
      )}
      {isAddSubjectVisible && (
        <AddSubject
            onClose={() => setAddSubjectVisible(false)} 
            id={selectedLearningOutcomeId}
            onAddedSubject={() => fetchSubjects(selectedLearningOutcomeId)}
        />
      )}
      {isEditSubjectVisible && (
        <EditSubject
            onClose={() => setEditSubjectVisible(false)} 
            lOID={selectedLearningOutcomeId}
            onEditedSubject={() => fetchSubjects(selectedLearningOutcomeId)}
        />
      )}
      
    </div>
  );
}

export default OutputCriteriaManagePage;
