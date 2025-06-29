import React, { useState, useEffect } from "react"; 
import axios from "axios";
import { useParams } from "react-router-dom";

function EditPoint({ onClose, studentId }) {
    const accountID = Number(localStorage.getItem("accountID"));
    const { courseID } = useParams();
    const courseId = Number(courseID);

    const [studentData, setStudentData] = useState(null);
    const [teacherID, setTeacherID] = useState(null);
    const [scores, setScores] = useState([
        { scoreType: "progress", score: "" },
        { scoreType: "midterm", score: "" },
        { scoreType: "final", score: "" }
    ]);
    const [isCompleted, setIsCompleted] = useState(false);

    const scoreTypeMap = {
        progress: "Quá trình",
        midterm: "Giữa kì",
        final: "Cuối kì",
    };

    // Fetch teacher ID for the current user
    useEffect(() => {
        const fetchTeacherId = async () => {
            if (!accountID) return;
            try {
                const response = await axios.get(
                    `http://localhost:8080/v1/api/account/get-user-id/${accountID}`
                );
                setTeacherID(response.data.metadata.teacherID);
            } catch (error) {
                console.error("Error fetching teacherID:", error.response?.data?.message || error);
            }
        };
        fetchTeacherId();
    }, [accountID]);

    // Fetch student data
    useEffect(() => {
        if (!studentId) return;
        const fetchStudentData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/v1/api/student/get-student/${studentId}`
                );
                if (response.status === 201) {
                    setStudentData(response.data.metadata);
                }
            } catch (error) {
                console.error("Error fetching student data:", error);
            }
        };
        fetchStudentData();
    }, [studentId]);

    // Validate the score input
    const isValidScore = (score) => {
        const num = parseFloat(score);
        return !isNaN(num) && num >= 0 && num <= 10;
    };

    // Check if all 3 scores have data (completed)
    const checkIfCompleted = (scoresArray) => {
        return scoresArray.every(score => {
            const scoreValue = score.score;
            return scoreValue !== "" && 
                   scoreValue !== null && 
                   scoreValue !== undefined &&
                   isValidScore(scoreValue);
        });
    };

    // Fetch student scores
    useEffect(() => {
        if (!studentId || !courseId) return;
        const fetchStudentScores = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/v1/api/score/${studentId}`,
                    { params: { courseID: courseId } }
                );
                
                const defaultScores = [
                    { scoreType: "progress", score: "" },
                    { scoreType: "midterm", score: "" },
                    { scoreType: "final", score: "" }
                ];

                if (
                    response.status === 200 &&
                    Array.isArray(response.data.metadata) &&
                    response.data.metadata.length > 0
                ) {
                    const studentScoreData = response.data.metadata.find(
                        (item) => Number(item.courseID) === Number(courseId)
                    );
                    
                    let mergedScores = defaultScores;
                    if (studentScoreData && Array.isArray(studentScoreData.scores)) {
                        mergedScores = defaultScores.map(def => {
                            const found = studentScoreData.scores.find(s => s.scoreType === def.scoreType);
                            return found
                                ? { ...def, score: parseFloat(found.score) }
                                : def;
                        });
                    }
                    
                    setScores(mergedScores);
                    
                    // Chỉ kiểm tra completed khi fetch dữ liệu
                    const completed = checkIfCompleted(mergedScores);
                    setIsCompleted(completed);
                    
                } else {
                    // No scores found, reset to default
                    setScores(defaultScores);
                    setIsCompleted(false);
                }
            } catch (error) {
                console.error("Lỗi khi lấy điểm sinh viên:", error);
                // Set default scores even if there's an error
                setScores([
                    { scoreType: "progress", score: "" },
                    { scoreType: "midterm", score: "" },
                    { scoreType: "final", score: "" }
                ]);
                setIsCompleted(false);
            }
        };

        fetchStudentScores();
    }, [studentId, courseId]);

    // Handle input changes for student data
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStudentData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle score change - chỉ cập nhật scores, không thay đổi completed status
    const handleScoreChange = (index, e) => {
        const { value } = e.target;
        const newScores = scores.map((score, i) =>
            i === index ? { ...score, score: value } : score
        );
        setScores(newScores);
    };

    // Check if we can submit - có ít nhất 1 điểm hợp lệ
    const canSubmit = () => {
        if (isCompleted) return false; // Không cho submit nếu đã hoàn thành
        
        const filledScores = scores.filter(score => 
            score.score !== "" && 
            score.score !== null && 
            score.score !== undefined
        );
        
        // Phải có ít nhất 1 điểm và tất cả điểm đã điền phải hợp lệ
        return filledScores.length > 0 && filledScores.every(score => isValidScore(score.score));
    };

    // Handle form submission
    const handleSubmit = async () => {
        if (isCompleted) {
            alert("Đã hoàn thành chấm điểm cho sinh viên này!");
            return;
        }

        // Only validate and submit scores that are not empty
        const filledScores = scores.filter(score => 
            score.score !== "" && 
            score.score !== null && 
            score.score !== undefined
        );

        if (filledScores.length === 0) {
            alert("Vui lòng nhập ít nhất một loại điểm!");
            return;
        }

        if (filledScores.some((score) => !isValidScore(score.score))) {
            alert("Vui lòng nhập điểm hợp lệ (từ 0-10)!");
            return;
        }

        const formattedScores = filledScores.map((score) => ({
            scoreType: score.scoreType,
            score: parseFloat(score.score)
        }));

        const dataToSend = {
            courseID: courseId,
            teacherID,
            score: formattedScores
        };

        try {
            const response = await axios.post(
                `http://localhost:8080/v1/api/score/grade-score/${studentId}`,
                dataToSend
            );
            if (response.status === 201) {
                alert("Cập nhật điểm thành công!");
                
                // Kiểm tra xem sau khi submit có đủ 3 loại điểm không
                const updatedCompleted = checkIfCompleted(scores);
                setIsCompleted(updatedCompleted);
                
                onClose();
            }
        } catch (error) {
            console.error("Error saving score data:", error);
            alert("Có lỗi xảy ra khi lưu điểm. Vui lòng thử lại!");
        }
    };

    if (!studentData) return <div>Loading...</div>;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="flex flex-col w-[50vw] h-auto bg-gray-200 p-6 rounded">
                <h2 className="flex w-full justify-center text-3xl font-bold mb-4 text-[#1DA599]">Thông tin sinh viên</h2>
                <div className="flex">
                    <form className="flex flex-col space-y-4 w-1/2">
                        <div>
                            <label className="block text-gray-700">Họ và tên:</label>
                            <input
                                type="text"
                                name="fullName"
                                value={studentData.fullName || ""}
                                onChange={handleInputChange}
                                className="w-[40vw] px-4 py-2 border rounded bg-white h-[5vh]"
                                disabled
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700">Mã số sinh viên:</label>
                            <input
                                type="text"
                                name="id"
                                value={studentData.id || ""}
                                onChange={handleInputChange}
                                className="w-[40vw] px-4 py-2 border rounded bg-white h-[5vh]"
                                disabled
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700">Chuyên ngành:</label>
                            <input
                                type="text"
                                name="major"
                                value={studentData.major || ""}
                                onChange={handleInputChange}
                                className="w-[40vw] px-4 py-2 border rounded bg-white h-[5vh]"
                                disabled
                            />
                        </div>
                    </form>
                </div>

                <div className="h-auto mb-[4vh] mt-[4vh]">
                    <table className="w-full bg-white border border-[#1DA599] border-2">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b text-[#1DA599] text-xl">Loại điểm</th>
                                <th className="py-2 px-8 border-b text-[#1DA599] text-xl">Điểm</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {scores.map((score, index) => (
                                <tr key={index}>
                                    <td className="py-2 px-4">{scoreTypeMap[score.scoreType] || score.scoreType}</td>
                                    <td className="py-2 px-4 bg-transparent border-none outline-none">
                                        <input
                                            type="number"
                                            value={score.score}
                                            onChange={(e) => handleScoreChange(index, e)}
                                            className={`border-none outline-none rounded w-full items-center pb-2 text-center ${
                                                isCompleted ? 'bg-gray-100 cursor-not-allowed text-gray-500' : 'bg-white'
                                            }`}
                                            placeholder={`Nhập điểm ${scoreTypeMap[score.scoreType]}`}
                                            disabled={isCompleted}
                                            min="0"
                                            max="10"
                                            step="0.1"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {/* Hiển thị trạng thái */}
                    {isCompleted && (
                        <div className="text-green-600 text-center mt-4 font-semibold text-lg">
                            ✓ Đã hoàn thành chấm điểm (3/3 loại điểm)
                        </div>
                    )}
                    
                    {!isCompleted && (
                        <div className="text-blue-600 text-center mt-4 font-medium">
                            Bạn có thể nhập 1, 2 hoặc cả 3 loại điểm
                        </div>
                    )}
                </div>

                <div className="flex space-x-4 justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2 bg-white text-[#1DA599] font-bold rounded hover:bg-[#1DA599] hover:text-white border-2 border-[#1DA599]"
                    >
                        Hủy
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className={`px-6 py-2 font-bold rounded transition-colors ${
                            !canSubmit() || isCompleted
                                ? "bg-gray-400 text-gray-600 cursor-not-allowed" 
                                : "bg-[#1DA599] text-white hover:bg-green-600"
                        }`}
                        disabled={!canSubmit() || isCompleted}
                    >
                        {isCompleted ? "Đã hoàn thành" : "Xác nhận"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditPoint;