import React, {useEffect, useState} from "react";
import {capitalize} from "../utils/helper.js";

const filterKeys = ["majorid", "image"];

export default function AccountInfo({accountID, accountableType}) {
    const [userData, setUserData] = useState(undefined);

    useEffect(() => {
        const getAccountInfo = async () => {
            const response = await fetch(`http://localhost:8080/v1/api/account/get-user-data/${accountID}`);
            const data = await response.json();
            console.log(data);
        }

        if (accountID && accountableType) {
            getAccountInfo()
        }
    }, [accountID, accountableType])

    return (
        <section className={'w-screen h-screen flex justify-center items-center'}>
            <div className={'max-w-full w-fit bg-white p-6 rounded-md shadow-md'}>
                <h1 className={'text-2xl mb-6'}>Thông tin tài khoản</h1>
                <div className={'flex items-center'}>
                    <label className={'w-[15ch]'} htmlFor={'id'}>ID </label>
                    <span>: {accountID}</span>
                </div>
                <div className={'flex items-center'}>
                    <label className={'w-[15ch]'} htmlFor={'role'}>Role </label>
                    <span>: {capitalize(accountableType)}</span>
                </div>
                <div className={'flex items-center'}>
                    <label className={'w-[15ch]'} htmlFor={'id'}>ID </label>
                    <span>: {accountID}</span>
                </div>
            </div>
        </section>
    );
} 