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
    image: null,
  });

  const [studentID, setStudentID] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  // Auto-fetch studentID using accountID
  useEffect(() => {
    const fetchStudentID = async () => {
      const accountID = localStorage.getItem("accountID");
      if (!accountID) {
        toast.error("Không tìm thấy accountID trong localStorage.");
        return;
      }

      try {
        const res = await axios.get(
          `http://localhost:8080/v1/api/account/get-user-data/${accountID}`
        );
        const student = res.data?.metadata;
        if (student?.id) {
          setStudentID(student.id);
        } else {
          toast.error("Không tìm thấy thông tin sinh viên.");
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin sinh viên:", error);
        toast.error("Lỗi khi lấy thông tin sinh viên.");
      }
    };

    fetchStudentID();
  }, []);

  // Preview image
  useEffect(() => {
    if (formData.image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(formData.image);
    } else {
      setImagePreview(null);
    }
  }, [formData.image]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Validate expiredAt >= takenAt
  const isDateValid =
    !formData.takenAt ||
    !formData.expiredAt ||
    new Date(formData.expiredAt) >= new Date(formData.takenAt);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!studentID) {
      toast.warning("Không thể gửi vì thiếu studentID.");
      return;
    }

    if (!isDateValid) {
      toast.error("Ngày hết hạn phải lớn hơn hoặc bằng ngày có hiệu lực.");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      if (val) data.append(key, val);
    });
    data.append("studentID", studentID);

    try {
      const res = await axios.post(
        "http://localhost:8080/v1/api/certificate",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data?.status === 201) {
        toast.success("Thêm chứng chỉ thành công!");
        onAdded?.();
        onClose?.();
      }
    } catch (error) {
      console.error("Lỗi khi thêm chứng chỉ:", error);
      toast.error("Thêm chứng chỉ thất bại!");
    }
  };

  const isFormValid =
    formData.certificateNumber &&
    formData.type &&
    formData.point &&
    formData.takenAt &&
    formData.expiredAt &&
    formData.image &&
    studentID &&
    isDateValid;

  return (
    <>
      {/* Background Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
        {/* Form Modal */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-[90vw] max-w-[600px] max-h-[90vh] overflow-y-auto relative">
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
            <label className="block font-semibold">Ngày có hiệu lực</label>
            <input
              type="date"
              name="takenAt"
              className="w-full p-2 border rounded"
              value={formData.takenAt}
              onChange={handleChange}
              required
            />
            <label className="block font-semibold">Ngày hết hạn</label>
            <input
              type="date"
              name="expiredAt"
              className="w-full p-2 border rounded"
              value={formData.expiredAt}
              onChange={handleChange}
              required
              min={formData.takenAt || undefined}
            />
            {!isDateValid && (
              <div className="text-red-600 text-sm">
                Ngày hết hạn phải lớn hơn hoặc bằng ngày có hiệu lực.
              </div>
            )}
            <input
              type="file"
              name="image"
              className="w-full"
              accept="image/*"
              onChange={handleChange}
              required
            />
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-w-full h-48 object-contain border rounded cursor-pointer"
                  onClick={() => setIsImageModalOpen(true)}
                />
              </div>
            )}
            <div className="flex justify-end space-x-4 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Huỷ
              </button>
              <button
                type="submit"
                className={`px-4 py-2 rounded text-white ${
                  isFormValid ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-300 cursor-not-allowed"
                }`}
                disabled={!isFormValid}
              >
                Thêm
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Image Modal */}
      {isImageModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
          onClick={() => setIsImageModalOpen(false)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-white p-4 rounded shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-white bg-red-500 rounded-full px-3 py-1 text-sm hover:bg-red-600"
              onClick={() => setIsImageModalOpen(false)}
            >
              ✕
            </button>
            <img
              src={imagePreview}
              alt="Full Preview"
              className="w-full h-full object-contain rounded"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default AddCertificate;