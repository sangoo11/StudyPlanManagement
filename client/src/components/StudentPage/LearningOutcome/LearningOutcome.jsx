import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import ShowLess from "../../../assets/images/showLess.png";
import ShowMore from "../../../assets/images/showMore.png";

function LearningOutcome() {
  // State for visibility of semesters
  const [visibleSemesters, setVisibleSemesters] = useState({});
  // State for learning outcomes
  const [learningOutcomes, setLearningOutcomes] = useState([]);
  // State for subjects by learning outcome
  const [subjects, setSubjects] = useState({});
  // Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [highlightedOutcomeIds, setHighlightedOutcomeIds] = useState([]);

  // Refs for scrolling
  const outcomeRefs = useRef({});

  useEffect(() => {
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

  // Fetch all subjects for all outcomes on mount
  useEffect(() => {
    if (learningOutcomes.length > 0) {
      learningOutcomes.forEach((outcome) => {
        fetchSubjects(outcome.id);
      });
    }
  }, [learningOutcomes, fetchSubjects]);

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

  // Flatten all subjects for recommendations
  const allSubjects = [];
  for (const outcome of learningOutcomes) {
    const subjectList = subjects[outcome.id] || [];
    subjectList.forEach((subj) =>
      allSubjects.push({
        ...subj,
        outcomeId: outcome.id,
        outcomeName: outcome.learningOutcomeName,
      })
    );
  }

  // Update recommendations as user types
  useEffect(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      setRecommendations([]);
      return;
    }
    // Filter and deduplicate by subject.id only
    const filtered = [];
    const seen = new Set();
    for (const subj of allSubjects) {
      if (
        (subj.subjectCode?.toLowerCase().includes(q) ||
          subj.subjectName?.toLowerCase().includes(q)) &&
        !seen.has(subj.id)
      ) {
        filtered.push(subj);
        seen.add(subj.id);
      }
    }
    setRecommendations(filtered.slice(0, 5)); // Show top 5
  }, [searchQuery, subjects, learningOutcomes]);

  // Show and highlight all outcomes containing the subject
  const showAllOutcomesWithSubject = (subject, query) => {
    // Find all outcomes containing this subject (by id)
    const matchedOutcomes = allSubjects
      .filter((subj) => subj.id === subject.id)
      .map((subj) => subj.outcomeId);

    // Expand all matched outcomes
    setVisibleSemesters((prev) => {
      const updated = { ...prev };
      matchedOutcomes.forEach((id) => {
        updated[id] = true;
      });
      return updated;
    });

    // Scroll to the first matched outcome
    if (matchedOutcomes.length > 0) {
      setTimeout(() => {
        outcomeRefs.current[matchedOutcomes[0]]?.scrollIntoView({ behavior: "smooth", block: "center" });
        setHighlightedOutcomeIds(matchedOutcomes);
        setTimeout(() => setHighlightedOutcomeIds([]), 2000);
      }, 200);
    }

    // Hide recommendations
    setRecommendations([]);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter" && recommendations.length > 0) {
      const query = searchQuery.trim().toLowerCase();
      showAllOutcomesWithSubject(recommendations[0], query);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Page Title & Search */}
      <header className="flex flex-col items-center justify-center mt-[8vh] mb-4">
        <h1 className="text-3xl font-bold text-[#1DA599] mb-4 text-center">
          Tiêu chuẩn đầu ra
        </h1>
        <div className="w-full flex flex-col items-center relative">
          <div className="flex w-full justify-center items-center mt-[9vh]">
            <input
              type="text"
              className="border border-gray-300 rounded px-3 py-2 w-[30vw] mr-2"
              placeholder="Tìm kiếm mã hoặc tên môn học và nhấn Enter..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              onKeyDown={handleSearchKeyDown}
              autoComplete="off"
            />
            <button
              className="ml-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 font-semibold"
              onClick={() => {
                // Collapse all outcomes
                setVisibleSemesters({});
              }}
            >
              Thu gọn
            </button>
          </div>
          {/* Recommendations dropdown */}
          {recommendations.length > 0 && (
            <ul className="absolute z-10 bg-white border border-gray-300 rounded w-[30vw] mt-[6vh] max-h-60 overflow-y-auto shadow-lg">
              {recommendations.map((subj) => (
                <li
                  key={subj.id}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer flex flex-col"
                  onClick={() => {
                    const query = searchQuery.trim().toLowerCase();
                    showAllOutcomesWithSubject(subj, query);
                  }}
                >
                  <span>
                    <strong>{subj.subjectCode}</strong> - {subj.subjectName}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>

      {/* Learning Outcomes List */}
      <main className="flex flex-col mt-4 space-y-4">
        {learningOutcomes.map((outcome) => (
          <div
            key={outcome.id}
            ref={(el) => (outcomeRefs.current[outcome.id] = el)}
            className={`flex flex-col bg-white shadow-lg rounded-lg border border-gray-300 overflow-hidden transition-all duration-300 ${
              highlightedOutcomeIds.includes(outcome.id) ? "ring-4 ring-yellow-400" : ""
            }`}
          >
            {/* Header */}
            <header className="flex justify-between items-center p-4 bg-[#f9f9f9] border-b border-gray-200">
              <h2 className={`text-xl font-semibold ${outcome.active ? 'text-black' : 'text-red-500'}`}>
                {outcome.learningOutcomeCode}: {outcome.learningOutcomeName}
              </h2>
              <div className="flex items-center space-x-2">
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
                          <td className="border border-gray-300 p-2">{subject.subjectCode}</td>
                          <td className="border border-gray-300 p-2">{subject.subjectName}</td>
                          <td className="border border-gray-300 p-2">{subject.level || "N/A"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        ))}
      </main>
    </div>
  );
}

export default LearningOutcome;