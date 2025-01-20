import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function StudentAccount() {
    const accountID = localStorage.getItem("accountID"); // Retrieve account ID from localStorage
    const navigate = useNavigate();

    const [studentID, setStudentID] = useState(null);
    const [accountInfo, setAccountInfo] = useState({
        id: "Loading...",
        name: "Loading...",
        major: "Loading...",
        year: "Loading...",
        status: "Loading...", 
        credit: "Loading...",
        accountID: "Loading...",
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    const fetchStudentData = async () => {
        if (!accountID) {
            setError("Account ID is missing.");
            setIsLoading(false);
            return;
        }

        try {
            const userResponse = await axios.get(
                `http://localhost:8080/v1/api/account/get-user-id/${accountID}`
            );
            const studentID = userResponse.data.metadata.studentID;
            console.log(studentID);
            setStudentID(studentID);

            const studentResponse = await axios.get(
                `http://localhost:8080/v1/api/student/get-student/${studentID}`
            );
            setAccountInfo(studentResponse.data.metadata);
        } catch (err) {
            console.error(err.response?.data?.message || "Error fetching data.");
            setError("Failed to load teacher data.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchStudentData();
    }, []);


    const handleLogOut = useCallback(() => {
        localStorage.removeItem("accountID"); // Clear the stored account ID
        navigate("/signin");
    }, [navigate]);

    const handleReturn = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    const handleEdit = useCallback(() => {
        navigate(`/edit-account/${accountInfo.id}`); // Navigate to edit page, passing the account ID
    }, [navigate, accountInfo.id]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="flex w-full min-h-screen bg-green-50 p-6">
            <div className="flex flex-col h-[70vh] w-[50vw] mx-auto bg-white p-6 rounded-lg shadow-lg mt-[10vh]">
                <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">Thông tin cá nhân</h1>
                <div className="space-y-4">
                    {Object.entries(accountInfo).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                            <span className="font-semibold text-gray-600">{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                            <span className="text-gray-700">{value}</span>
                        </div>
                    ))}
                </div>

                {/* Buttons */}
                <div className="mt-6 flex justify-between">
                    <button
                        onClick={handleReturn}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Return
                    </button>
                    <button
                        onClick={handleEdit}
                        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                        Edit
                    </button>
                    <button
                        onClick={handleLogOut}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
}

export default StudentAccount;
