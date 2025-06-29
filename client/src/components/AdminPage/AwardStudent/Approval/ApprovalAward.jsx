import React, { useEffect, useState } from "react";
import axios from "axios";
import EditAwardApproval from "./EditAwardApproval";
import minusButton from '../../../../assets/images/minusButton.png';
import { toast } from "react-toastify";

const statusMap = {
  valid: { label: "Hợp lệ", color: "green" },
  invalid: { label: "Không hợp lệ", color: "red" },
  pending: { label: "Chờ xét duyệt", color: "goldenrod" },
};

const ApprovalAward = () => {
  const [awards, setAwards] = useState([]);
  const [selectedAward, setSelectedAward] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [imageModal, setImageModal] = useState({ open: false, src: "" });
  const [awardTypes, setAwardTypes] = useState([]);

  // Fetch awards
  const fetchAwards = async () => {
    try {
      const res = await axios.get("http://localhost:8080/v1/api/award/");
      setAwards(res.data.metadata);
    } catch (err) {
      toast.error("Không thể tải danh sách giải thưởng");
    }
  };

  // Fetch award types
  const fetchAwardTypes = async () => {
    try {
      const res = await axios.get("http://localhost:8080/v1/api/award-type/");
      setAwardTypes(res.data.metadata);
    } catch (err) {
      toast.error("Không thể tải loại giải thưởng");
    }
  };

  useEffect(() => {
    fetchAwards();
    fetchAwardTypes();
  }, []);

  const handleEdit = (award) => {
    setSelectedAward(award);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa giải thưởng này?")) {
      try {
        await axios.delete(`http://localhost:8080/v1/api/award/${id}`);
        toast.success("Đã xóa giải thưởng");
        fetchAwards();
      } catch {
        toast.error("Xóa thất bại");
      }
    }
  };

  const handleModalOk = () => {
    setModalOpen(false);
    setSelectedAward(null);
    fetchAwards();
  };

  const handleImageClick = (src) => {
    setImageModal({ open: true, src });
  };

  const closeImageModal = () => {
    setImageModal({ open: false, src: "" });
  };

  // Get award type title by id
  const getAwardTypeTitle = (id) => {
    const found = awardTypes.find(t => String(t.id) === String(id));
    return found ? found.title : 'Không rõ';
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Danh sách giải thưởng</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Mã giải thưởng</th>
              <th className="py-2 px-4 border-b">Loại</th>
              <th className="py-2 px-4 border-b">Ảnh</th>
              <th className="py-2 px-4 border-b">Ngày nhận</th>
              <th className="py-2 px-4 border-b">Trạng thái</th>
              <th className="py-2 px-4 border-b">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {awards.map((award) => (
              <tr key={award.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{award.awardNumber}</td>
                <td className="p-3 border">{getAwardTypeTitle(award.awardTypeID)}</td>
                <td className="py-2 px-4 border-b">
                  <img
                    crossOrigin="anonymous"
                    src={
                      award.image?.startsWith('http')
                        ? award.image
                        : `http://localhost:8080/images/award/${encodeURIComponent(award.image?.split('/').pop())}`
                    }
                    alt=""
                    className="w-20 h-12 object-cover rounded cursor-pointer hover:scale-110 transition-transform"
                    onClick={() =>
                      handleImageClick(
                        award.image?.startsWith('http')
                          ? award.image
                          : `http://localhost:8080/images/award/${encodeURIComponent(award.image?.split('/').pop())}`
                      )
                    }
                  />
                </td>
                <td className="py-2 px-4 border-b">
                  {new Date(award.receivedAt).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b">
                  <b style={{ color: statusMap[award.status]?.color }}>
                    {statusMap[award.status]?.label}
                  </b>
                  {award.status === "invalid" && (
                    <div className="text-xs text-gray-500 mt-1">
                      Lý do: {award.invalidReason}
                    </div>
                  )}
                </td>
                <td className="py-4 px-4 border-b flex items-center gap-2">
                  <button
                    className="flex w-[8vw] bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 items-center justify-center mr-2"
                    onClick={() => handleEdit(award)}
                  >
                    Phê duyệt
                  </button>
                  <button
                    className="w-8 h-8 rounded-full hover:ring-2 hover:ring-red-300 transition"
                    style={{
                      background: `url(${minusButton}) no-repeat center center`,
                      backgroundSize: "contain",
                    }}
                    title="Xóa"
                    onClick={() => handleDelete(award.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modalOpen && selectedAward && (
        <EditAwardApproval
          award={selectedAward}
          open={modalOpen}
          onOk={handleModalOk}
          onCancel={() => setModalOpen(false)}
        />
      )}

      {/* Image Modal */}
      {imageModal.open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
          onClick={closeImageModal}
        >
          <div
            className="bg-white rounded-lg p-4 shadow-lg relative max-w-[90vw] max-h-[90vh] flex flex-col items-center"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute text-red-600 text-4xl top-2 right-2 text-gray-600 hover:text-red-500 text-2xl font-bold"
              onClick={closeImageModal}
              aria-label="Đóng"
            >
              x
            </button>
            <img
              crossOrigin="anonymous"
              src={imageModal.src}
              alt="award"
              className="max-w-[80vw] max-h-[70vh] rounded object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ApprovalAward;