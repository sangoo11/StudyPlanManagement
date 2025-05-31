import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from '../../configs/axios';

const ResetPasswordForm = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [token, setToken] = useState('');

    useEffect(() => {
        const tokenParam = searchParams.get('token');
        if (!tokenParam) {
            navigate('/forgot-password', { replace: true });
            return;
        }
        setToken(tokenParam);
    }, [searchParams, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setLoading(true);

        const password = event.target.elements.password.value;
        const confirmPassword = event.target.elements.confirmPassword.value;

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            setLoading(false);
            return;
        }

        try {
            const { data } = await axios.post('/access/reset-password', {
                token,
                password
            });

            if (data.metadata.success) {
                setSuccess(true);
                // Redirect to login page
                await new Promise((res) => {
                    setTimeout(() => {
                        navigate('/signin', { replace: true });
                        res();
                    }, 2000)
                })
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to reset password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className='bg-[#fff4f4d5] min-h-screen py-10'>
            <div className='container'>
                <form className='max-w-sm w-full mx-auto text-center bg-white p-8 rounded-md shadow-md' onSubmit={handleSubmit}>
                    <h1 className='text-2xl font-semibold mb-2'>Reset Password</h1>
                    <p className='text-gray-600 mb-6'>Please enter your new password</p>

                    {error && (
                        <div className='mb-4 p-3 bg-red-100 text-red-700 rounded-md'>
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className='mb-4 p-3 bg-green-100 text-green-700 rounded-md'>
                            Password has been reset successfully! Redirecting to login...
                        </div>
                    )}

                    <div className='space-y-4'>
                        <div>
                            <input
                                className='w-full p-2 border border-gray-300 rounded-md focus:border-yellow-500 focus:outline-none bg-yellow-50'
                                type='password'
                                name='password'
                                required
                                disabled={loading}
                                placeholder='New password'
                                minLength={6}
                            />
                        </div>

                        <div>
                            <input
                                className='w-full p-2 border border-gray-300 rounded-md focus:border-yellow-500 focus:outline-none bg-yellow-50'
                                type='password'
                                name='confirmPassword'
                                required
                                disabled={loading}
                                placeholder='Confirm new password'
                                minLength={6}
                            />
                        </div>

                        <button
                            className='w-full bg-yellow-900 py-2 text-yellow-300 hover:bg-yellow-700 rounded-md disabled:opacity-50 transition-colors'
                            disabled={loading}
                            type='submit'
                        >
                            {loading ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default ResetPasswordForm; 