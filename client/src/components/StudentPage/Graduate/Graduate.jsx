import React, { useEffect, useState } from "react";
import axios from "axios";

function Graduate() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [studentID, setStudentID] = useState(null);


    useEffect(() => {
        const fetchStudentID = async () => {
            try {
                const accountID = localStorage.getItem('accountID');
                const { data } = await axios.get(
                    `http://localhost:8080/v1/api/account/get-user-data/${accountID}`
                );
                setStudentID(data.metadata.id);
            } catch (err) {
                setError("Không thể lấy thông tin sinh viên.");
                setLoading(false);
            }
        };
        fetchStudentID();
    }, []);

    useEffect(() => {
        if (!studentID) return;
        const fetchGraduateStatus = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:8080/v1/api/student/${studentID}/graduate`
                );
                setData(res.data);
            } catch (err) {
                setError("Không thể lấy trạng thái tốt nghiệp.");
            } finally {
                setLoading(false);
            }
        };
        fetchGraduateStatus();
    }, [studentID]);

    const statusColor = (ok) => ok ? "text-green-600 font-bold" : "text-red-600 font-bold";
    const statusText = (ok, yes = "Đạt", no = "Chưa đạt") => ok ? yes : no;

    return (
        <div className="min-h-screen bg-gray-50 p-6 mb-[8vh]">
            {/* Page Title */}
            <div className="flex items-center justify-center mt-[8vh]">
                <h1 className="text-2xl font-bold text-[#1DA599]">Trạng thái tốt nghiệp</h1>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mt-4 text-center text-red-500">
                    {error}
                </div>
            )}

            {/* Loading */}
            {loading && (
                <div className="mt-8 text-center text-gray-500">Đang tải...</div>
            )}

            {/* Graduation Table */}
            {!loading && data && (
                <div className="mt-10 max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
                    <table className="min-w-full table-auto border border-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3 border text-left">Tiêu chí</th>
                                <th className="p-3 border text-left">Trạng thái</th>
                                <th className="p-3 border text-left">Điều kiện</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-t hover:bg-gray-50">
                                <td className="p-3 border">Số tín chỉ tối thiểu</td>
                                <td className={`p-3 border ${statusColor(data.metadata.result.minCredit)}`}>
                                    {statusText(data.metadata.result.minCredit)}
                                </td>
                                <td className='p-3 borderborder'>Tối thiểu 130 tín chỉ</td>
                            </tr>
                            <tr className="border-t hover:bg-gray-50">
                                <td className="p-3 border">Ngoại ngữ</td>
                                <td className={`p-3 border ${statusColor(data.metadata.result.foreignLanguage)}`}>
                                    {statusText(data.metadata.result.foreignLanguage)}
                                </td>
                                <td className='p-3 borderborder'>Cần ít nhất 1 chứng chỉ ngoại ngữ</td>
                            </tr>
                            <tr className="border-t hover:bg-gray-50">
                                <td className="p-3 border">Chứng chỉ GDANQP</td>
                                <td className={`p-3 border ${statusColor(data.metadata.result.GDANQPCertificate)}`}>
                                    {statusText(data.metadata.result.GDANQPCertificate)}
                                </td>
                                <td className='p-3 borderborder'>Cần nộp chứng chỉ GDAN&QP</td>
                            </tr>
                            <tr className="border-t hover:bg-gray-50">
                                <td className="p-3 border">Hoàn thành tất cả học phần</td>
                                <td className={`p-3 border ${statusColor(data.metadata.result.allCoursesCompleted)}`}>
                                    {statusText(data.metadata.result.allCoursesCompleted, "Đã hoàn thành", "Chưa hoàn thành")}
                                </td>
                                <td className='p-3 borderborder'>Không có học phần nào đang học</td>
                            </tr>
                            <tr className="border-t hover:bg-gray-50">
                                <td className="p-3 border">Đậu tất cả môn học</td>
                                <td className={`p-3 border ${statusColor(data.metadata.result.allSubjectsPassed)}`}>
                                    {statusText(data.metadata.result.allSubjectsPassed, "Đã đậu", "Chưa đậu")}
                                </td>
                                <td className='p-3 borderborder'>Không có học phần nào không đạt</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="mt-6 flex flex-col items-center">
                        <div className="text-lg font-semibold">
                            Trạng thái tốt nghiệp:&nbsp;
                            <span className={data.metadata.status === "pass" ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                                {data.metadata.status === "pass" ? "Đủ điều kiện tốt nghiệp" : "Chưa đủ điều kiện"}
                            </span>
                        </div>
                        {data.metadata.status === "fail" && data.metadata.reason && (
                            <div className="mt-2 text-red-500 text-center">
                                <b>Lý do:</b> {data.metadata.reason}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Graduate;