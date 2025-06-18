import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AccountInfo from "../AccountInfo/AccountInfo.jsx";

function TeacherAccount() {
    const accountID = localStorage.getItem("accountID"); // Retrieve account ID from localStorage
    const accountableType = localStorage.getItem("accountableType"); // Retrieve account ID from localStorage
    const navigate = useNavigate();

    const [teacherID, setTeacherID] = useState(null);
    const [accountInfo, setAccountInfo] = useState({
        id: "Loading...",
        name: "Loading...",
        major: "Loading...",
        role: "Loading...",
        email: "Loading...",
        phone: "Loading...",
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTeacherData = async () => {
        if (!accountID) {
            setError("Account ID is missing.");
            setIsLoading(false);
            return;
        }

        try {
            const userResponse = await axios.get(
                `http://localhost:8080/v1/api/account/get-user-id/${accountID}`
            );
            const teacherID = userResponse.data.metadata.teacherID;
            setTeacherID(teacherID);

            const teacherResponse = await axios.get(
                `http://localhost:8080/v1/api/teacher/get-teacher/${teacherID}`
            );
            setAccountInfo(teacherResponse.data.metadata);
        } catch (err) {
            console.error(err.response?.data?.message || "Error fetching data.");
            setError("Failed to load teacher data.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTeacherData();
    }, []);

    const handleLogOut = useCallback(() => {
        localStorage.clear()
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
        <div className="w-full min-h-screen bg-green-50 p-6">
            <AccountInfo accountID={accountID} accountableType={accountableType} />
            <div className="mt-6 flex justify-between w-96 max-w-full mx-auto">
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
    );
}

export default TeacherAccount;
