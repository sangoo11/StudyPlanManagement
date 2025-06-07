import React, {useEffect, useState} from "react";
import {capitalize} from "../../utils/helper.js";
import AccountInfoInput from "./AccountInfoInput.jsx";


export default function AccountInfo({accountID, accountableType}) {
    const [userData, setUserData] = useState(undefined);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        const getAccountInfo = async () => {
            const response = await fetch(`http://localhost:8080/v1/api/account/get-user-data/${accountID}`);
            const data = await response.json();
            setUserData(data.metadata);
        }

        if (accountID && accountableType) {
            getAccountInfo()
        }
    }, [accountID, accountableType])

    return (
        <section className={'mt-20 flex justify-center items-center'}>
            <div className={'max-w-full w-fit bg-white p-8 rounded-md shadow-md'}>
                <h1 className={'text-2xl mb-6'}>Thông tin tài khoản</h1>
                <AccountInfoInput isEditing={isEdit} name={'id'} value={accountID}>ID</AccountInfoInput>
                <AccountInfoInput isEditing={isEdit} name={'role'}
                                  value={capitalize(accountableType)}>Role</AccountInfoInput>
                {userData?.fullName &&
                    <AccountInfoInput isEditing={isEdit} name={'fullName'}
                                      value={userData?.fullName}>Fullname</AccountInfoInput>}
                {userData?.year &&
                    <AccountInfoInput isEditing={isEdit} name={'year'} value={userData?.year}>Year</AccountInfoInput>}
            </div>
        </section>
    );
}