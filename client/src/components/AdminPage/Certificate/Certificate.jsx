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
        <div className="mt-10 max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
          <table className="min-w-full table-auto border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border">Mã chứng chỉ</th>
                <th className="p-3 border">Loại</th>
                <th className="p-3 border">Sinh viên</th>
                <th className="p-3 border">Điểm</th>
                <th className="p-3 border">Ngày thi</th>
                <th className="p-3 border">Ngày hết hạn</th>
                <th className="p-3 border">Trạng thái</th>
                <th className="p-3 border">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {certificates.map((cert) => (
                <tr key={cert.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 border">{cert.certificateNumber}</td>
                  <td className="p-3 border">{cert.type}</td>
                  <td className="p-3 border"> {students[cert.studentID]?.fullName || 'Không rõ'} </td>
                  <td className="p-3 border">{cert.point}</td>
                  <td className="p-3 border">{new Date(cert.takenAt).toLocaleDateString()}</td>
                  <td className="p-3 border">{new Date(cert.expiredAt).toLocaleDateString()}</td>
                  <td className="p-3 border">
                    <span className={cert.status === 'pending' ? 'font-bold text-yellow-600' : cert.status === 'valid' ? 'font-bold text-green-600' : 'font-bold text-red-600'}>
                      {cert.status}
                    </span>
                  </td>
                  <td className="p-3 border space-x-2">
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                      onClick={() => handleEditClick(cert.id)}
                    >
                      Sửa
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
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
    </div>
  );
}

export default Certificate;
