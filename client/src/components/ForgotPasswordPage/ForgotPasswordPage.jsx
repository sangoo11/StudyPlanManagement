import React, { useEffect, useRef, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from '../../configs/axios.js';
import ResetPasswordForm from './ResetPasswordForm';

const ForgotPasswordPage = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    // If token exists, show reset password form
    if (token) {
        return <ResetPasswordForm />;
    }

    // Otherwise show forgot password form
    const focusRef = useRef()
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (focusRef) {
            focusRef.current.focus();
        }
    }, [])

    const verifyEmailHandler = async (event) => {
        event.preventDefault();
        setError('');
        setLoading(true);

        try {
            const inputEmail = event.target.elements.email.value;

            const { data } = await axios.post('/access/forgot-password', {
                email: inputEmail
            });

            if (data.metadata.success) {
                setSuccess(true);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className='bg-[#fff4f4d5] min-h-screen py-10'>
            <div className='container'>
                <form className='max-w-sm w-full mx-auto text-center bg-white p-8 rounded-md shadow-md' onSubmit={verifyEmailHandler}>
                    <h1 className='text-2xl font-semibold mb-2'>Forgot Password</h1>
                    <p className='text-gray-600 mb-6'>Please enter your email address</p>

                    {error && (
                        <div className='mb-4 p-3 bg-red-100 text-red-700 rounded-md'>
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className='mb-4 p-3 bg-green-100 text-green-700 rounded-md'>
                            Password reset link has been sent to your email!
                        </div>
                    )}

                    <div className='space-y-4'>
                        <input
                            ref={focusRef}
                            className='w-full p-2 border border-gray-300 rounded-md focus:border-yellow-500 focus:outline-none bg-yellow-50'
                            type='email'
                            name='email'
                            required
                            disabled={loading}
                            placeholder='Your email address'
                        />

                        <button
                            className='w-full bg-yellow-900 py-2 text-yellow-300 hover:bg-yellow-700 rounded-md disabled:opacity-50 transition-colors'
                            disabled={loading}
                            type='submit'
                        >
                            {loading ? 'Sending...' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default ForgotPasswordPage