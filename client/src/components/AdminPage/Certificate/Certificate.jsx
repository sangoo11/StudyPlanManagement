import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddButton from '../../../assets/images/addButton.png';
import AddCertificate from './AddCertificate';
import EditCertificate from './EditCertificate';
import { toast } from 'react-toastify';

function Certificate() {
  const [certificates, setCertificates] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [imageModal, setImageModal] = useState({ open: false, src: "" });


  const fetchCertificates = async () => {
      setLoading(true);
      try {
        const res = await axios.get('http://localhost:8080/v1/api/certificate');
        const certs = res.data.metadata;
        setCertificates(certs);

        // Get unique student IDs
        const studentIDs = [...new Set(certs.map(cert => cert.studentID))];

        // Fetch student info for each ID
        const studentPromises = studentIDs.map(id =>
          axios.get(`http://localhost:8080/v1/api/student/get-student/${id}`)
        );

        const studentResponses = await Promise.all(studentPromises);

        const studentsMap = {};
        studentResponses.forEach(resp => {
          const student = resp.data.metadata;
          studentsMap[student.id] = student;
        });

        setStudents(studentsMap);
      } catch (error) {
        console.error('Failed to fetch certificates or students:', error);
      } finally {
        setLoading(false);
      }
    };


  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/v1/api/certificate/${id}`);
      if (window.confirm('Bạn có chắc chắn muốn xoá chứng chỉ này?')) {
        toast.success('Xoá chứng chỉ thành công!');
        await fetchCertificates();
      }
      else {
        toast.error('Xoá chứng chỉ thất bại!');
      }
    } catch (error) {
      console.error('Failed to delete certificate:', error);
      toast.error('Xoá chứng chỉ thất bại!');
    }
  };

  const handleEditClick = (id) => {
    setSelectedId(id);
    setShowEditModal(true);
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleImageClick = (src) => {
    setImageModal({ open: true, src });
  };

  const closeImageModal = () => {
    setImageModal({ open: false, src: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex items-center justify-center mt-[8vh]">
        <h1 className="text-2xl font-bold text-[#1DA599]">Danh sách chứng chỉ</h1>
      </div>

      <div className="flex justify-end mr-8 mt-4">
        <button
          onClick={() => setShowAddModal(true)}
          className="w-10 h-10 bg-[#1DA599] text-white rounded-full hover:border-4 hover:border-yellow-400 hover:text-gray-700 flex items-center justify-center"
        >
          <img src={AddButton} alt="Add" />
        </button>
      </div>

      {loading ? (
        <p className="text-center mt-10">Đang tải...</p>
      ) : (
        <div className="overflow-x-auto mt-10 max-w-8xl mx-auto bg-white shadow-md rounded-lg p-6">
          <table className="min-w-full border border-gray-200 rounded-lg bg-white">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">Mã chứng chỉ</th>
                <th className="py-2 px-4 border-b">Loại</th>
                <th className="py-2 px-4 border-b">Ảnh</th>
                <th className="py-2 px-4 border-b">Sinh viên</th>
                <th className="py-2 px-4 border-b">Điểm</th>
                <th className="py-2 px-4 border-b">Ngày thi</th>
                <th className="py-2 px-4 border-b">Ngày hết hạn</th>
                <th className="py-2 px-4 border-b">Trạng thái</th>
                <th className="py-2 px-4 border-b">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {certificates.map((cert) => (
                <tr key={cert.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{cert.certificateNumber}</td>
                  <td className="py-2 px-4 border-b">{cert.type}</td>
                  <td className="py-2 px-4 border-b">
                    <img
                      crossOrigin="anonymous"
                      src={
                        cert.image.startsWith('http')
                          ? cert.image
                          : `http://localhost:8080/images/certificate/${encodeURIComponent(cert.image.split('/').pop())}`
                      }
                      alt=""
                      className="w-20 h-12 object-cover rounded cursor-pointer hover:scale-110 transition-transform"
                      onClick={() =>
                        handleImageClick(
                          cert.image.startsWith('http')
                            ? cert.image
                            : `http://localhost:8080/images/certificate/${encodeURIComponent(cert.image.split('/').pop())}`
                        )
                      }
                    />
                  </td>
                  <td className="py-2 px-4 border-b">{students[cert.studentID]?.fullName || 'Không rõ'}</td>
                  <td className="py-2 px-4 border-b">{cert.point}</td>
                  <td className="py-2 px-4 border-b">{new Date(cert.takenAt).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-b">{new Date(cert.expiredAt).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-b">
                    <b
                      style={{
                        color:
                          cert.status === 'valid'
                            ? 'green'
                            : cert.status === 'pending'
                            ? 'goldenrod'
                            : 'red',
                      }}
                    >
                      {cert.status === 'valid'
                        ? 'Hợp lệ'
                        : cert.status === 'pending'
                        ? 'Chờ xét duyệt'
                        : 'Không hợp lệ'}
                    </b>
                    {cert.status === "invalid" && cert.invalidReason && (
                      <div className="text-xs text-gray-500 mt-1">
                        Lý do: {cert.invalidReason}
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-4 border-b flex items-center gap-2 justify-center">
                    <button
                      className="flex w-[8vw] bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 items-center justify-center"
                      onClick={() => handleDelete(cert.id)}
                    >
                      Xoá
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modals */}
      {showAddModal && (
        <AddCertificate
          onClose={() => setShowAddModal(false)}
          onAdded={() => {
            fetchCertificates();
          }}
        />
      )}
      {showEditModal && selectedId && (
        <EditCertificate
          id={selectedId}
          onClose={() => setShowEditModal(false)}
          onEdited={() => {
            fetchCertificates();
          }}
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
              alt="certificate"
              className="max-w-[80vw] max-h-[70vh] rounded object-contain"
            />
          </div>
        </div>
      )}


    </div>
  );
}

export default Certificate;
