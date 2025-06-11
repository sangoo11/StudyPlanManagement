import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function ExpiredCertificate() {
  const [certificates, setCertificates] = useState([]);
  const [students, setStudents] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchCertificates = async () => {
      setLoading(true);
      try {
        const res = await axios.get('http://localhost:8080/v1/api/certificate');
        const allCerts = res.data.metadata;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const filteredCerts = allCerts
          .filter(cert => {
            const expiredDate = new Date(cert.expiredAt);
            expiredDate.setHours(0, 0, 0, 0);
            const diffDays = Math.round((expiredDate - today) / (1000 * 60 * 60 * 24));
            return ['pending', 'valid'].includes(cert.status) && (diffDays <= 3);
          })
          .map(cert => {
            const expiredDate = new Date(cert.expiredAt);
            expiredDate.setHours(0, 0, 0, 0);
            let diffDays = Math.round((expiredDate - today) / (1000 * 60 * 60 * 24));
            const remainingDays = diffDays < 0 ? 0 : diffDays;
            return { ...cert, remainingDays };
          });

        setCertificates(filteredCerts);

        const studentIDs = [...new Set(filteredCerts.map(cert => cert.studentID))];
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
        toast.error('Lỗi khi tải dữ liệu!');
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


  useEffect(() => {
    fetchCertificates();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex items-center justify-center mt-[8vh]">
        <h1 className="text-2xl font-bold text-red-600">Chứng chỉ sắp hết hạn</h1>
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
                <th className="p-3 border">Số ngày còn lại</th>
                <th className="p-3 border">Trạng thái</th>
                <th className="p-3 border">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {certificates.map((cert) => (
                <tr key={cert.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 border">{cert.certificateNumber}</td>
                  <td className="p-3 border">{cert.type}</td>
                  <td className="p-3 border">{students[cert.studentID]?.fullName || 'Không rõ'}</td>
                  <td className="p-3 border">{cert.point}</td>
                  <td className="p-3 border">{new Date(cert.takenAt).toLocaleDateString()}</td>
                  <td className="p-3 border text-red-600 font-semibold">
                    {new Date(cert.expiredAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 border text-[#E12D2D] font-bold">
                    {cert.remainingDays} ngày
                  </td>
                  <td className={cert.status === 'pending' ? 'p-3 font-bold text-yellow-600' : cert.status === 'valid' ? 'p-3 font-bold text-green-600' : 'p-3 font-bold text-red-600'}>
                    {cert.status.charAt(0).toUpperCase() + cert.status.slice(1)}
                  </td>
                  <td className="flex w-full p-3 justify-center">
                    <button
                      className="flex w-[6vw] bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 item-center justify-center"
                      onClick={() => handleDelete(cert.id)}
                    >
                      Xoá
                    </button>
                  </td>
                </tr>
              ))}
              {certificates.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-gray-500">
                    Không có chứng chỉ nào sắp hết hạn trong 3 ngày tới.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ExpiredCertificate;
