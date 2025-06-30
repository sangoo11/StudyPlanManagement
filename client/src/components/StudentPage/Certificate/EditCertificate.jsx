import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const certificateTypes = [
  'Chứng chỉ TOEIC (Nghe-Đọc)',
  'Chứng chỉ TOEIC (Nói- Viết)',
  'Chứng chỉ TOEFL iBT',
  'Chứng chỉ IELTS',
  'Chứng chỉ PTE Academic',
  'Chứng chỉ Cambridge',
  'Chứng chỉ VNU-EPT',
  'Tiếng Nhật',
  'Tiếng Pháp',
  'VPET',
  'Chứng chỉ GDQP&AN',
  'Bằng TN THPT',
  'Giấy Khai sinh',
  'VSTEP - Đánh giá năng lực',
  'Bằng đại học ngoại ngữ',
  'Bằng cao đẳng'
];

function EditCertificate({ id, onClose, onEdited }) {
  const [form, setForm] = useState({
    certificateNumber: "",
    type: "",
    point: "",
    takenAt: "",
    expiredAt: "",
    status: "",
    invalidReason: "",
    studentID: "",
    image: null,
    imageUrl: "",
  });

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCertificate() {
      try {
        const res = await axios.get(`http://localhost:8080/v1/api/certificate/${id}`);
        if (res.data.status === 200) {
          const cert = res.data.metadata;
          setForm({
            certificateNumber: cert.certificateNumber || "",
            type: cert.type || "",
            point: cert.point || "",
            takenAt: cert.takenAt ? cert.takenAt.slice(0, 10) : "",
            expiredAt: cert.expiredAt ? cert.expiredAt.slice(0, 10) : "",
            status: cert.status || "",
            invalidReason: cert.invalidReason || "",
            studentID: cert.studentID || "",
            image: null,
            imageUrl: cert.image ? `http://localhost:8080/${cert.image}` : "",
          });
        } else {
          toast.error("Không tải được dữ liệu chứng chỉ!");
        }
      } catch (error) {
        console.error(error);
        toast.error("Lỗi khi tải chứng chỉ!");
      } finally {
        setLoading(false);
      }
    }

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

    fetchCertificate();
    fetchStudents();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      setForm((prev) => ({
        ...prev,
        image: files[0],
        imageUrl: URL.createObjectURL(files[0]),
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Validate expiredAt >= takenAt
  const isDateValid =
    !form.takenAt ||
    !form.expiredAt ||
    new Date(form.expiredAt) >= new Date(form.takenAt);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isDateValid) {
      toast.error("Ngày hết hạn phải lớn hơn hoặc bằng ngày có hiệu lực.");
      return;
    }

    try {
      const data = new FormData();
      data.append("certificateNumber", form.certificateNumber);
      data.append("type", form.type);
      data.append("point", form.point);
      data.append("takenAt", form.takenAt);
      data.append("expiredAt", form.expiredAt);
      data.append("status", form.status);
      if (form.invalidReason) data.append("invalidReason", form.invalidReason);
      data.append("studentID", form.studentID);
      if (form.image) data.append("image", form.image);

      const res = await axios.patch(
        `http://localhost:8080/v1/api/certificate/${id}`,
        data,
      );

      if (res.data.status === 200 || res.data.status === 201) {
        toast.success("Cập nhật chứng chỉ thành công!");
        onEdited();
        onClose();
      } else {
        toast.error("Cập nhật chứng chỉ thất bại!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi cập nhật chứng chỉ!");
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded shadow-lg">
          Đang tải dữ liệu chứng chỉ...
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 overflow-auto p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-[600px] max-h-full overflow-auto">
        <h2 className="text-2xl font-bold mb-4 text-center text-[#1DA599]">
          Chỉnh sửa Chứng Chỉ
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block font-semibold">Mã chứng chỉ</label>
          <input
            type="text"
            name="certificateNumber"
            placeholder="Mã chứng chỉ"
            value={form.certificateNumber}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          <label className="block font-semibold">Loại chứng chỉ</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Chọn loại chứng chỉ</option>
            {certificateTypes.map((type, idx) => (
              <option key={idx} value={type}>
                {type}
              </option>
            ))}
          </select>

          <label className="block font-semibold">Điểm số</label>
          <input
            type="number"
            name="point"
            placeholder="Điểm số"
            value={form.point}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          <label className="block font-semibold">Ngày có hiệu lực</label>
          <input
            type="date"
            name="takenAt"
            value={form.takenAt}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          <label className="block font-semibold">Ngày hết hạn</label>
          <input
            type="date"
            name="expiredAt"
            value={form.expiredAt}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            min={form.takenAt || undefined}
          />
          {!isDateValid && (
            <div className="text-red-600 text-sm">
              Ngày hết hạn phải lớn hơn hoặc bằng ngày có hiệu lực.
            </div>
          )}

          <label className="block font-semibold">Trạng thái</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Chọn trạng thái</option>
            <option value="valid">Valid</option>
            <option value="invalid">Invalid</option>
            <option value="pending">Pending</option>
          </select>

          {(form.status === "invalid") && (
            <>
              <label className="block font-semibold">Lý do không hợp lệ</label>
              <textarea
                name="invalidReason"
                placeholder="Lý do không hợp lệ"
                value={form.invalidReason}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows={3}
              />
            </>
          )}

          <label className="block font-semibold">Sinh viên</label>
          <select
            name="studentID"
            value={form.studentID}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Chọn sinh viên</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.id} - {student.fullName}
              </option>
            ))}
          </select>

          <label className="block font-semibold">Ảnh chứng chỉ</label>
          {form.imageUrl && (
            <img
              src={form.imageUrl}
              alt="certificate"
              className="w-48 h-auto mb-2 border rounded"
            />
          )}
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full"
          />

          <div className="flex justify-end space-x-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-200"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#1DA599] text-white rounded hover:bg-[#178a7d]"
              disabled={!isDateValid}
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCertificate;