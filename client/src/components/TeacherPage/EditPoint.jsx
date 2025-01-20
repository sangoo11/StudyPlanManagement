import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditCriteria({ onClose, studentId }) {
    const accountID = Number(localStorage.getItem("accountID"));
    const [studentData, setStudentData] = useState(null);
    const [teacherID, setTeacherID] = useState(null);
    const { courseID } = useParams();
    const courseId = Number(courseID);
    const [scores, setScores] = useState([
        { scoreType: "progress", score: "" },
        { scoreType: "midterm", score: "" },
        { scoreType: "final", score: "" }
    ]);
    
    
    // Fetch teacher ID for current user
    const getTeacherId = async () => {
        if (!accountID) return;
        try {
            const response = await axios.get(
                `http://localhost:8080/v1/api/account/get-user-id/${accountID}`
            );
            console.log("API Response:", response.data);
            setTeacherID(response.data.metadata.teacherID); // Make sure this is correct
        } catch (error) {
            console.error(error.response?.data?.message || "Error fetching teacherID");
        }
    };
    useEffect(() => {
        getTeacherId();
    }, []);
    // Fetch student data on component mount
    useEffect(() => {
        if (studentId) {
            axios
                .get(`http://localhost:8080/v1/api/student/get-student/${studentId}`)
                .then((response) => {
                    if (response.status === 201) {
                        setStudentData(response.data.metadata);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching student data:", error);
                });
        }
    }, [studentId]);

    // Handle input changes for student data
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStudentData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle score change
    const handleScoreChange = (index, e) => {
        const { value } = e.target;
        const updatedScores = [...scores];
        updatedScores[index].score = value;
        setScores(updatedScores);
    };

    // Validate the score input
    const isValidScore = (score) => {
        const num = parseFloat(score);
        return !isNaN(num) && num >= 0 && num <= 10;
    };

    // Handle form submission
    const handleSubmit = async () => {
        if (scores.some((score) => !isValidScore(score.score))) {
            alert("Please ensure all scores are between 0 and 10.");
            return;
        }

        const scoresAsNumbers = scores.map((score) => ({
            scoreType: score.scoreType,
            score: parseFloat(score.score) // Ensure it's a number
        }));

        const dataToSend = {
            courseID: courseID,
            teacherID,
            score: scoresAsNumbers
        };
        console.log(dataToSend);
        console.log(studentId);

        try {
            const response = await axios.post(
                `http://localhost:8080/v1/api/score/grade-score/${studentId}`,
                dataToSend
            );
            if (response.status === 201) {
                alert("Cập nhật điểm thành công!");
                onClose();
            }
        } catch (error) {
            console.error("Error saving score data:", error);
            alert("Error saving score data. Please try again.");
        }
    };

    if (!studentData) return <div>Loading...</div>;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="flex flex-col w-[50vw] h-auto bg-gray-200 p-6 rounded">
                <h2 className="flex w-full justify-center text-3xl font-bold mb-4">Thông tin sinh viên</h2>
                <div className="flex">
                    <form className="flex flex-col space-y-4 w-1/2">
                        <div>
                            <label className="block text-gray-700">Họ và tên:</label>
                            <input
                                type="text"
                                name="fullName"
                                value={studentData.fullName || ""}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded bg-white h-[5vh]"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700">Mã số sinh viên:</label>
                            <input
                                type="text"
                                name="id"
                                value={studentData.id || ""}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded bg-white h-[5vh]"
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
                                className="w-full px-4 py-2 border rounded bg-white h-[5vh]"
                            />
                        </div>
                    </form>
                </div>

                <div className="h-auto mb-[4vh] mt-[4vh]">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Loại điểm</th>
                                <th className="py-2 px-4 border-b">Điểm</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scores.map((score, index) => (
                                <tr key={index}>
                                    <td className="py-2 px-4 border-b">{score.scoreType}</td>
                                    <td className="py-2 px-4 border-b">
                                        <input
                                            type="number"
                                            value={score.score}
                                            onChange={(e) => handleScoreChange(index, e)}
                                            className="border border-gray-300 rounded w-full"
                                            placeholder={`Điểm ${score.scoreType}`}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
                        className="px-6 py-2 bg-[#1DA599] text-white font-bold rounded hover:bg-green-400"
                    >
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditCriteria;
