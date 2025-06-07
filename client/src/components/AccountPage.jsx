import React from 'react';
import { useNavigate } from 'react-router-dom';
import AccountInfo from "./AccountInfo";

function AccountPage() {
    const accountID = localStorage.getItem('accountID');
    const navigate = useNavigate();

    // Show admin info only
    const accountInfo = {
        id: accountID,
        role: 'Admin',
        email: 'admin@example.com',
        status: 'Active',
    };

    const handleLogOut = () => {
        localStorage.clear();
        navigate("/signin");
    };

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
