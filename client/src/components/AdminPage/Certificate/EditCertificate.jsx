import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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
    image: "",
  });

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [certRes, studentRes] = await Promise.all([
          axios.get(`http://localhost:8080/v1/api/certificate/${id}`),
          axios.get("http://localhost:8080/v1/api/student/get-all-student"),
        ]);

        if (certRes.data.status === 200) {
          const cert = certRes.data.metadata;
          setForm({
            certificateNumber: cert.certificateNumber || "",
            type: cert.type || "",
            point: cert.point || "",
            takenAt: cert.takenAt?.slice(0, 10) || "",
            expiredAt: cert.expiredAt?.slice(0, 10) || "",
            status: cert.status || "",
            invalidReason: cert.invalidReason || "",
            studentID: cert.studentID || "",
            image: cert.image || "", 
          });
        } else {
          toast.error("Không tải được dữ liệu chứng chỉ!");
        }

        if (studentRes.data.status === 201) {
          setStudents(studentRes.data.metadata || []);
        } else {
          toast.error("Không lấy được danh sách sinh viên!");
        }
      } catch (error) {
        console.error(error);
        toast.error("Lỗi khi tải dữ liệu!");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

    const handleChange = (e) => {
      const { name, value } = e.target;

      setForm((prev) => {
        if (name === "status" && (value === "valid" || value === "pending")) {
          // Nếu trạng thái mới là valid hoặc pending thì xóa invalidReason
          return {
            ...prev,
            status: value,
            invalidReason: "",
          };
        }
        // Trường hợp bình thường, cập nhật như cũ
        return {
          ...prev,
          [name]: value,
        };
      });
    };

  const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const payload = {
          status: form.status,
        };

        // Nếu trạng thái invalid mới gửi invalidReason
        if (form.status === "invalid" && form.invalidReason) {
          payload.invalidReason = form.invalidReason;
        } else {
          // Nếu valid hoặc pending, reset invalidReason luôn
          payload.invalidReason = "";
        }

        const res = await axios.patch(`http://localhost:8080/v1/api/certificate/${id}`, payload);

        if ([200, 201].includes(res.data.status)) {
          toast.success("Cập nhật trạng thái thành công!");
          onEdited();
          onClose();
        } else {
          toast.error("Cập nhật thất bại!");
        }
      } catch (error) {
        console.error(error);
        toast.error("Lỗi khi cập nhật trạng thái!");
      }
    };

  const getImageUrl = () => {
      if (!form.image) return null;
      if (typeof form.image === 'string') return `http://localhost:8080/${form.image}`;
      return URL.createObjectURL(form.image);
    };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded shadow-lg">Đang tải dữ liệu chứng chỉ...</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 overflow-auto p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-[600px] max-h-full overflow-auto">
        <h2 className="text-2xl font-bold mb-4 text-center text-[#1DA599]">
          Phê duyệt chứng chỉ
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold">Mã chứng chỉ</label>
            <div className="w-full p-2 border rounded bg-gray-100">{form.certificateNumber}</div>
          </div>

          <div>
            <label className="block font-semibold">Loại chứng chỉ</label>
            <div className="w-full p-2 border rounded bg-gray-100">{form.type}</div>
          </div>

          <div>
            <label className="block font-semibold">Điểm số</label>
            <div className="w-full p-2 border rounded bg-gray-100">{form.point}</div>
          </div>

          <div>
            <label className="block font-semibold">Ngày cấp</label>
            <div className="w-full p-2 border rounded bg-gray-100">{form.takenAt}</div>
          </div>

          <div>
            <label className="block font-semibold">Ngày hết hạn</label>
            <div className="w-full p-2 border rounded bg-gray-100">{form.expiredAt}</div>
          </div>

          <div>
            <label className="block font-semibold">Trạng thái</label>
            <select name="status" value={form.status} onChange={handleChange} className="w-full p-2 border rounded">
              <option value="">Chọn trạng thái</option>
              <option value="valid">Valid</option>
              <option value="invalid">Invalid</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          {form.status === "invalid" && (
            <div>
              <label className="block font-semibold">Lý do không hợp lệ</label>
              <textarea
                name="invalidReason"
                value={form.invalidReason}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows={3}
              />
            </div>
          )}

          <div>
            <label className="block font-semibold">Sinh viên</label>
            <input
              type="text"
              value={
                students.find((s) => s.id === form.studentID)?.fullName || form.studentID
              }
              readOnly
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="block font-semibold">Ảnh chứng chỉ</label>
            {form.image ? (
              <a
                href={getImageUrl()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={getImageUrl()}
                  alt="Nhấn để xem ảnh chứng chỉ"
                  className="w-80 h-auto mb-2 border rounded cursor-pointer hover:shadow-lg font-bold text-[#1DA599] hover:text-[#178a7d] transition-all duration-300"
                />
              </a>
            ) : (
              <p className="text-gray-500">Không có ảnh</p>
            )}
          </div>

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
            >
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCertificate;
