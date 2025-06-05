import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const certificateTypes = [
  "Chứng chỉ TOEIC (Nghe-Đọc)",
  "Chứng chỉ TOEIC (Nói- Viết)",
  "Chứng chỉ TOEFL iBT",
  "Chứng chỉ IELTS",
  "Chứng chỉ PTE Academic",
  "Chứng chỉ Cambridge",
  "Chứng chỉ VNU-EPT",
  "Tiếng Nhật",
  "Tiếng Pháp",
  "VPET",
  "Chứng chỉ GDQP&AN",
  "Bằng TN THPT",
  "Giấy Khai sinh",
  "VSTEP - Đánh giá năng lực",
  "Bằng đại học ngoại ngữ",
  "Bằng cao đẳng",
];

function AddCertificate({ onClose, onAdded }) {
  const [formData, setFormData] = useState({
    certificateNumber: "",
    type: "",
    point: "",
    takenAt: "",
    expiredAt: "",
    studentID: "",
    image: null,
  });

  const [students, setStudents] = useState([]);

  // Lấy danh sách sinh viên khi component mount
  useEffect(() => {
    async function fetchStudents() {
      try {
        const res = await axios.get("http://localhost:8080/v1/api/student/get-all-student");
        if (res.data.status === 201 && Array.isArray(res.data.metadata)) {
          setStudents(res.data.metadata);
        } else {
          toast.error("Không lấy được danh sách sinh viên");
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sinh viên:", error);
        toast.error("Lỗi khi lấy danh sách sinh viên");
      }
    }
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.studentID) {
      alert("Vui lòng chọn sinh viên");
      return;
    }

    const data = new FormData();
    data.append("certificateNumber", formData.certificateNumber);
    data.append("type", formData.type);
    data.append("point", formData.point);
    data.append("takenAt", formData.takenAt);
    data.append("expiredAt", formData.expiredAt);
    data.append("studentID", formData.studentID);
    if (formData.image) data.append("image", formData.image);

    try {
      const res = await axios.post("http://localhost:8080/v1/api/certificate", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.status === 201) {
        toast.success("Thêm chứng chỉ thành công!");
        onAdded();
        onClose();
      }
    } catch (error) {
      console.error("Lỗi khi thêm chứng chỉ:", error);
      toast.error("Thêm chứng chỉ thất bại!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90vw] max-w-[600px]">
        <h2 className="text-2xl font-bold text-center text-[#1DA599] mb-4">Thêm Chứng Chỉ</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="certificateNumber"
            placeholder="Mã chứng chỉ (CERT-2025001)"
            className="w-full p-2 border rounded"
            value={formData.certificateNumber}
            onChange={handleChange}
            required
          />
          <select
            name="type"
            className="w-full p-2 border rounded"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">Chọn loại chứng chỉ</option>
            {certificateTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="point"
            placeholder="Điểm số"
            className="w-full p-2 border rounded"
            value={formData.point}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="takenAt"
            className="w-full p-2 border rounded"
            value={formData.takenAt}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="expiredAt"
            className="w-full p-2 border rounded"
            value={formData.expiredAt}
            onChange={handleChange}
            required
          />

          {/* Dropdown chọn sinh viên */}
          <select
            name="studentID"
            className="w-full p-2 border rounded"
            value={formData.studentID}
            onChange={handleChange}
            required
          >
            <option value="">Chọn sinh viên</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.id} - {student.fullName}
              </option>
            ))}
          </select>

          <input
            type="file"
            name="image"
            className="w-full"
            accept="image/*"
            onChange={handleChange}
            required
          />
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Huỷ
            </button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              Thêm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCertificate;
