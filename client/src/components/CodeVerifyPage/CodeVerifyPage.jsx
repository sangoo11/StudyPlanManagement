import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CodeVerifyPicture from '../../assets/images/verify-code-hero-img.jpg';
import VeriForm from './VeriForm';
import { createAccount, verifyCode } from '../../services/auth';
import { jwtDecode } from "jwt-decode";

const CodeVerifyPage = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleVerification = async (code) => {
        setError('');

        if (!code) {
            setError('Please enter the verification code');
            return;
        }

        const { email } = JSON.parse(localStorage.getItem('user-info'));
        if (!email) {
            setError('No user info found. Please sign up again.');
            return;
        }

        try {
            const verifyResponse = await verifyCode(email, code);

            console.log(verifyResponse);


            if (verifyResponse.metadata.isValid) {
                // Show success message
                alert('Email verified successfully!');

                // Create account with verified email
                try {
                    const { fullname, email, password, accountableType, major } = JSON.parse(localStorage.getItem('user-info'));
                    const accountResponse = await createAccount(fullname, email, password, accountableType, major);

                    const decoded = jwtDecode(accountResponse.metadata.accessToken);

                    // Store user info in localStorage
                    localStorage.setItem('accountID', decoded.accountID);
                    localStorage.setItem('accountableType', decoded.accountableType);

                    localStorage.removeItem("user-info")

                    // Navigate based on user type
                    if (decoded.accountableType === 'teacher') {
                        navigate('/teacher');
                    } else if (decoded.accountableType === 'admin') {
                        navigate('/admin');
                    } else {
                        navigate('/student');
                    }
                } catch (error) {
                    setError('Create account error. Please try again later.');
                    console.error('Create account error:', error);
                }
            } else {
                setError('Verification code has expired. Please request a new one.');
            }
        } catch (error) {
            console.error('Verification error:', error);
            setError('Verification failed. Please try again.');
        }
    };

    return (
        <section className='relative'>
            <img src={CodeVerifyPicture} alt='Hero image' className='mt-[-20rem] w-svw h-svh absolute -z-10 top-0 left-0' />
            <div className='max-w-md sm mt-[20rem] rounded-md mx-auto p-10 bg-white text-center'>
                <h1 className='text-3xl font-semibold mb-4'>Check your mail</h1>
                <p className='mb-4'>Enter a 6-digit verification code sent to your email</p>
                <VeriForm onSubmit={handleVerification} />
                {error && (
                    <div className="mb-4 text-red-500 text-sm">
                        {error}
                    </div>
                )}
                <button className="text-blue-500 hover:text-blue-700">Resend code</button>
            </div>
        </section>
    );
};

export default CodeVerifyPage;