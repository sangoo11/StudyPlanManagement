import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const statusMap = {
  valid: { label: "Hợp lệ", color: "green" },
  invalid: { label: "Không hợp lệ", color: "red" },
  pending: { label: "Chờ xét duyệt", color: "goldenrod" },
};

const EditAwardApproval = ({ award, open, onOk, onCancel }) => {
  const [status, setStatus] = useState(award.status);
  const [invalidReason, setInvalidReason] = useState(award.invalidReason || "");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async () => {
    if (status === "invalid" && !invalidReason.trim()) {
      toast.error("Vui lòng nhập lý do không hợp lệ");
      return;
    }
    setLoading(true);
    try {
      await axios.patch(`http://localhost:8080/v1/api/award/${award.id}`, {
        status,
        invalidReason: status === "invalid" ? invalidReason : null,
      });
      toast.success("Cập nhật trạng thái thành công");
      onOk();
    } catch {
      toast.error("Cập nhật thất bại");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 min-w-[350px] max-w-[95vw] shadow-lg relative">
        <h3 className="mb-4 text-lg font-semibold">
          Xét duyệt giải thưởng: <span className="text-blue-600">{award.awardNumber}</span>
        </h3>
        <div className="mb-2">
          <b>Mô tả:</b> {award.description}
        </div>
        <div className="my-3">
          <b>Trạng thái hiện tại: </b>
          <span
            className={`font-bold`}
            style={{ color: statusMap[award.status]?.color }}
          >
            {statusMap[award.status]?.label}
          </span>
        </div>
        <div className="flex gap-6 my-3">
          <label className="flex items-center gap-1 cursor-pointer">
            <input
              type="radio"
              value="valid"
              checked={status === "valid"}
              onChange={() => setStatus("valid")}
              className="accent-green-600"
            />
            <span className="font-bold text-green-600">Hợp lệ</span>
          </label>
          <label className="flex items-center gap-1 cursor-pointer">
            <input
              type="radio"
              value="invalid"
              checked={status === "invalid"}
              onChange={() => setStatus("invalid")}
              className="accent-red-600"
            />
            <span className="font-bold text-red-600">Không hợp lệ</span>
          </label>
          <label className="flex items-center gap-1 cursor-pointer">
            <input
              type="radio"
              value="pending"
              checked={status === "pending"}
              onChange={() => setStatus("pending")}
              className="accent-yellow-500"
            />
            <span className="font-bold text-yellow-500">Chờ xét duyệt</span>
          </label>
        </div>
        {status === "invalid" && (
          <textarea
            rows={3}
            placeholder="Nhập lý do không hợp lệ"
            value={invalidReason}
            onChange={e => setInvalidReason(e.target.value)}
            className="w-full mt-2 p-2 border border-gray-300 rounded resize-y focus:outline-blue-400"
          />
        )}
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 transition"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`px-4 py-2 bg-blue-600 text-white rounded font-bold hover:bg-blue-700 transition ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {loading ? "Đang lưu..." : "Lưu"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAwardApproval;