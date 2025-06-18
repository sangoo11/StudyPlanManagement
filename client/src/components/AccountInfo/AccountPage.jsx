import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AccountInfo from "./AccountInfo.jsx";

function AccountPage() {
    const accountID = localStorage.getItem('accountID');
    const accountableType = localStorage.getItem('accountableType');
    const navigate = useNavigate();
    const [isEdit, setIsEdit] = React.useState(false);


    if (!accountID) {
        return (
            <div className='w-screen h-screen flex flex-col justify-center items-center'>
                <h1 className={'text-2xl'}>You need to login first to see the account info</h1>
                <Link
                    className={'mt-4 text-green-700 text-lg hover:text-green-900 hover:underline hover:scale-110 border border-green-700 rounded-lg px-6 py-2'}
                    to={'/signin'}>Login</Link>
            </div>
        )
    }

    const handleLogOut = () => {
        localStorage.clear();
        navigate("/signin");
    };

    const handleReturn = () => {
        navigate(-1);
    };


    return (
        <div className='w-full min-h-screen bg-green-50 p-6'>
            <AccountInfo accountableType={accountableType} accountID={accountID} isEdit={isEdit} onFinish={() => setIsEdit(false)} />
            <div className='mt-6 flex justify-between w-96 max-w-full mx-auto'>
                {isEdit ? <button
                    onClick={() => setIsEdit(false)}
                    className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
                >
                    Cancel
                </button> :
                    <button
                        onClick={handleReturn}
                        className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
                    >
                        Return
                    </button>}
                {(isEdit || accountableType === 'admin') ? null : (
                    <button
                        onClick={() => setIsEdit(true)}
                        className='px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600'
                    >
                        Edit
                    </button>
                )}
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
