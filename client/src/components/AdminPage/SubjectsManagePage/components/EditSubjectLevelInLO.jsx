import React, { useState, useEffect } from "react";
import axios from "axios";

function EditSubjectLevelInLO({ onClose, lOID }) {
  const [subjects, setSubjects] = useState([]);  // To store fetched subjects with details
  const [selectedSubjectID, setSelectedSubjectID] = useState(null);  // To store the selected subject ID
  const [level, setLevel] = useState("");  // To store the selected level

 
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="flex flex-col w-[50vw] h-auto bg-gray-200 p-6 rounded">
        <h2 className="flex justify-center text-3xl font-bold mb-4">Chỉnh sửa mức độ</h2>
        
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
      </div>
    </div>
  );
}

export default EditSubjectLevelInLO;
