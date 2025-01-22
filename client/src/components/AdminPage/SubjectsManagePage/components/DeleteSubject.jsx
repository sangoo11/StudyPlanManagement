import React, { useState, useEffect } from "react";
import axios from "axios";

function DeleteSubject({ onClose, subjectID, onDeletedSubject }) {
  const [subject, setSubject] = useState(null);
  const [formData, setFormData] = useState({
    subjectCode: "",
    subjectName: "",
    type: "",
    credit: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch subject data on mount
  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/v1/api/subject/get-subject/${subjectID}`
        );
        const fetchedSubject = response.data.metadata;
        if (fetchedSubject) {
          setSubject(fetchedSubject);
          setFormData({
            subjectCode: fetchedSubject.subjectCode || "",
            subjectName: fetchedSubject.subjectName || "",
            type: fetchedSubject.type || "",
            credit: fetchedSubject.credit || "",
            description: fetchedSubject.description || "",
          });
        }
      } catch (error) {
        console.error("Error fetching subject:", error);
        setError("Không thể lấy thông tin. Vui lòng kiểm tra lại.");
      }
    };

    if (subjectID) {
      fetchSubject();
    }
  }, [subjectID]);

  // Handle delete action
  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.put(
        `http://localhost:8080/v1/api/subject/delete-subject/${subjectID}`
      );
      if (onDeletedSubject) {
        onDeletedSubject(subjectID); // Notify parent component
      }
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error deleting subject:", error);
      setError(
        error.response?.data?.message || "Không thể xóa môn học. Vui lòng thử lại."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="flex flex-col w-[50vw] h-auto bg-gray-200 p-6 rounded">
        <h2 className="flex w-full justify-center text-3xl font-bold mb-4">
          Xóa môn học
        </h2>
        <h2 className="flex w-full justify-center text-xl mb-4 text-red-500">
          Bạn có chắc muốn xóa môn học?
        </h2>
        <form className="flex flex-col space-y-4" onSubmit={handleDelete}>
          <div>
            <label className="block text-gray-700">Mã môn học:</label>
            <div className="flex w-full h-[5vh] bg-white rounded-md items-center justify-center">
              {formData.subjectCode}
            </div>
          </div>

          <div>
            <label className="block text-gray-700">Tên môn học:</label>
            <div className="flex w-full h-[5vh] bg-white rounded-md items-center justify-center">
              {formData.subjectName}
            </div>
          </div>

          <div>
            <label className="block text-gray-700">Số tín chỉ:</label>
            <div className="flex w-full h-[5vh] bg-white rounded-md items-center justify-center">
              {formData.credit}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-center font-semibold">{error}</p>
          )}

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
              disabled={loading}
              className={`px-6 py-2 font-bold rounded text-white ${
                loading
                  ? "bg-red-300 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-700"
              }`}
            >
              {loading ? "Đang xóa..." : "Xóa"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DeleteSubject;
