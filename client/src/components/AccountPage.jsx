import React from 'react';
import { useNavigate } from 'react-router-dom'; 

function AccountPage() {
    const accountID = localStorage.getItem('accountID'); // Retrieve account ID from localStorage
    
    const navigate = useNavigate(); // Use the navigate hook to navigate to other pages

    // Sample account information
    const accountInfo = {
        id: accountID, // Use account ID from localStorage
        name: 'John Doe',
        major: 'Computer Science',
        role: 'Student',
        email: 'john.doe@example.com',
        phone: '(123) 456-7890'
    };

    // Handle log out
    const handleLogOut = () => {
        localStorage.removeItem('accountID'); // Clear the stored account ID
        navigate("/signin");
    };

    // Handle return (navigate back)
    const handleReturn = () => {
        navigate(-1);
    };

    // Handle edit (navigate to an edit page)
    const handleEdit = () => {
        history.push(`/edit-account/${accountInfo.id}`); // Navigate to edit page, passing the account ID
    };

    return (
        <div className='flex w-full min-h-screen bg-green-50 p-6'>
            <div className='flex flex-col h-[60vh] w-[50vw] mx-auto bg-white p-6 rounded-lg shadow-lg mt-[10vh]'>
                <h1 className='text-2xl font-semibold text-center text-gray-700 mb-6'>Thông tin cá nhân</h1>
                <div className='space-y-4'>
                    <div className='flex justify-between'>
                        <span className='font-semibold text-gray-600'>ID:</span>
                        <span className='text-gray-700'>{accountInfo.id}</span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='font-semibold text-gray-600'>Name:</span>
                        <span className='text-gray-700'>{accountInfo.name}</span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='font-semibold text-gray-600'>Major:</span>
                        <span className='text-gray-700'>{accountInfo.major}</span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='font-semibold text-gray-600'>Role:</span>
                        <span className='text-gray-700'>{accountInfo.role}</span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='font-semibold text-gray-600'>Email:</span>
                        <span className='text-gray-700'>{accountInfo.email}</span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='font-semibold text-gray-600'>Phone:</span>
                        <span className='text-gray-700'>{accountInfo.phone}</span>
                    </div>
                </div>

                {/* Buttons */}
                <div className='mt-6 flex justify-between'>
                    <button
                        onClick={handleReturn}
                        className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
                    >
                        Return
                    </button>
                    <button
                        onClick={handleEdit}
                        className='px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600'
                    >
                        Edit
                    </button>
                    <button
                        onClick={handleLogOut}
                        className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
                    >
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AccountPage;
