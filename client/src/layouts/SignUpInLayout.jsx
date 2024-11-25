import React from 'react';
import { Outlet } from 'react-router';

function SignInLayout(props) {

    const appName = 'EduOrganizer';
    const appDescription = 'The app helps manage student and teacher data, track grades, monitor learning outcomes, and visualize academic progress, ensuring alignment with program standards and goals.';
    const appMail = 'eduorganizer@gmail.com';

    return (
        <div>
            <div className='fixed top-0 right-0 left-0 min-h-[10vh] bg-[#1DA599]'>
                <div className='flex items-center min-h-[10vh] h-full'>
                    <h1 className='text-3xl text-white font-bold pl-10'>{appName}</h1>
                </div>
            </div>
            <div className='fixed bottom-0 right-0 left-0 min-h-[10vh] bg-[#1DA599] px-10 py-6'>
                <div className='grid grid-cols-[2fr_1fr_1fr_1fr_1fr] h-full min-h-[10vh] text-white'>
                    <div className='w-4/6'>
                        <h3 className='text-xl font-semibold mb-2'>{appName}</h3>
                        <p className='text-xs font-thin'>{appDescription}</p>
                    </div>
                    <div>
                        <h3 className='text-xl font-semibold mb-2'>Company</h3>
                        <ul className='text-xs font-thin space-y-2'>
                            <li>About Us</li>
                            <li>Services</li>
                            <li>Community</li>
                            <li>Testimorial</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className='text-xl font-semibold mb-2'>Support</h3>
                        <ul className='text-xs font-thin space-y-2'>
                            <li>Help Center</li>
                            <li>Feed Back</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className='text-xl font-semibold mb-2'>Links</h3>
                        <ul className='text-xs font-thin space-y-2'>
                            <li>Courses</li>
                            <li>Become Teacher</li>
                            <li>Services</li>
                            <li>All in One</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className='text-xl font-semibold mb-2'>Contact Us</h3>
                        <p className='text-xs font-thin'>{appMail}</p>
                    </div>
                </div>
            </div>
            <Outlet />
        </div>
    );
}

export default SignInLayout;