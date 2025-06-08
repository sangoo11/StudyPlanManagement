import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddButton from '../../../assets/images/addButton.png';
import AddCertificate from './AddCertificate';
import EditCertificate from './EditCertificate';
import { toast } from 'react-toastify';

function Certificate() {
  const [certificates, setCertificates] = useState([]);
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const getStudentDataAndCertificates = async () => {
    setLoading(true);
    try {
      const accountID = localStorage.getItem('accountID');
      const { data } = await axios.get(
        `http://localhost:8080/v1/api/account/get-user-data/${accountID}`
      );
      const student = data.metadata;
      setStudentData(student);

      const studentID = student.id;
      const certResponse = await axios.get(
         `http://localhost:8080/v1/api/certificate/${studentID}`   
      );

      const certData = Array.isArray(certResponse.data.metadata)
        ? certResponse.data.metadata
        : [certResponse.data.metadata];

      setCertificates(certData);
    } catch (error) {
      console.error('Failed to fetch student or certificates:', error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    getStudentDataAndCertificates();
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
          {certificates.length === 0 ? (
            <p className="text-center text-gray-500">Không có chứng chỉ nào.</p>
          ) : (
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

                </tr>
              </thead>
              <tbody>
                {certificates.map((cert) => (
                  <tr key={cert.id} className="border-t hover:bg-gray-50">
                    <td className="p-3 border">{cert.certificateNumber}</td>
                    <td className="p-3 border">{cert.type}</td>
                    <td className="p-3 border">{studentData?.fullName || 'Không rõ'}</td>
                    <td className="p-3 border">{cert.point}</td>
                    <td className="p-3 border">{new Date(cert.takenAt).toLocaleDateString()}</td>
                    <td className="p-3 border">{new Date(cert.expiredAt).toLocaleDateString()}</td>
                    <td className="p-3 border">
                      <span className={cert.status === 'pending' ? 'font-bold text-yellow-600' : cert.status === 'valid' ? 'font-bold text-green-600' : 'font-bold text-red-600'}>
                        {cert.status.charAt(0).toUpperCase() + cert.status.slice(1)}
                      </span>
                    </td>
                  
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Modals */}
      {showAddModal && (
        <AddCertificate
          onClose={() => setShowAddModal(false)}
          onAdded={() => getStudentDataAndCertificates()}
        />
      )}
    </div>
  );
}

export default Certificate;
