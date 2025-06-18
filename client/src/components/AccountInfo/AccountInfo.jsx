import React, { useEffect, useState } from "react";
import { capitalize } from "../../utils/helper.js";
import AccountInfoInput from "./AccountInfoInput.jsx";
import axios from '../../configs/axios.js'


export default function AccountInfo({ accountID, accountableType, isEdit, onFinish }) {
    const [userData, setUserData] = useState(undefined);
    const [error, setError] = useState()

    useEffect(() => {
        const getAccountInfo = async () => {
            const response = await fetch(`http://localhost:8080/v1/api/account/get-user-data/${accountID}`);
            const data = await response.json();
            setUserData(data.metadata);
        }

        if (accountID && accountableType) {
            getAccountInfo()
        }
    }, [accountID, accountableType, isEdit])

    const submitHandler = async (e) => {
        e.preventDefault();


        const formData = Object.fromEntries(new FormData(e.target).entries());

        try {
            await axios.put(`/account/edit-user-data/${accountID}`, formData)
        } catch (e) {
            setError(e.message)
        } finally {
            onFinish()
        }

    }

    return (
        <section className={'mt-20 flex justify-center items-center'}>
            <div className={'w-96 max-w-full bg-white p-8 rounded-md shadow-md'}>
                <h1 className={'text-2xl mb-6'}>Thông tin tài khoản</h1>
                <form className='flex flex-col gap-y-2' onSubmit={submitHandler}>
                    <AccountInfoInput name={'id'} value={accountID}>ID</AccountInfoInput>
                    <AccountInfoInput name={'role'}
                        value={capitalize(accountableType)}>Role</AccountInfoInput>
                    {userData?.fullName &&
                        <AccountInfoInput isEditing={isEdit} name={'fullName'}
                            value={userData?.fullName}>Fullname</AccountInfoInput>}
                    {userData?.year &&
                        <AccountInfoInput isEditing={isEdit} name={'year'} value={userData?.year}>Year</AccountInfoInput>}
                    {error && <p className="text-center text-red-500">{error}</p>}
                    {isEdit && <button
                        className='px-4 py-2 mt-4 bg-green-500 text-white rounded hover:bg-green-600'
                        type="submit"
                    >
                        Confirm
                    </button>}
                </form>
            </div>
        </section>
    );
}