import React from 'react';
import { useNavigate } from 'react-router-dom';
import AccountInfo from "./AccountInfo";

function AccountPage() {
    const accountID = localStorage.getItem('accountID'); // Retrieve account ID from localStorage

    const navigate = useNavigate(); // Use the navigate hook to navigate to other pages

    // Fetch admin info from backend (pseudo, you may want to use useEffect/axios in real app)
    // For now, just show the accountID and role as admin
    const accountInfo = {

        id: accountID,
        role: 'Admin',
        email: 'admin@example.com',
        status: 'Active',
    };

    // Handle log out
    const handleLogOut = () => {
        localStorage.clear() // Clear 
        navigate("/signin");
    };

    // Handle return (navigate back)
    const handleReturn = () => {
        navigate(-1);
    };

    return (
        <div className='w-full min-h-screen bg-green-50 p-6'>
            <AccountInfo accountInfo={accountInfo} title="Admin Account Info" />
            <div className='mt-6 flex justify-between w-full max-w-md mx-auto'>
                <button
                    onClick={handleReturn}
                    className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
                >
                    Return
                </button>
                <button
                    onClick={handleLogOut}
                    className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
                >
                    Log Out
                </button>
            </div>
        </div>
    );
}

export default AccountPage;
