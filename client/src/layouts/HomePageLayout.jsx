import React from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router';
import { Link, NavLink } from 'react-router-dom';

function HomePageLayout(props) {
    const navigate = useNavigate();

    const appName = 'EduOrganizer';
    const appDescription = 'The app helps manage student and teacher data, track grades, monitor learning outcomes, and visualize academic progress, ensuring alignment with program standards and goals.';
    const appMail = 'eduorganizer@gmail.com';

    const navLinkStyles = ({ isActive }) => {
        return {
            color: isActive ? "#1DA599" : "black",
            fontWeight: 400,
            textDecoration: "none",
            borderBottom: isActive ? "1px solid #1DA599" : "none",
            paddingBottom: isActive ? "5px" : "0",
        };
    };

    return (

        <div>
            <div className='fixed top-0 right-0 left-0 min-h-[10vh] bg-white'>
                <div className='flex items-center justify-between min-h-[10vh] h-full px-10'>
                    <h1 className='text-3xl text-black font-bold'>{appName}</h1>
                    <nav className='flex gap-14 text-black text-xl'>
                        <NavLink style={navLinkStyles} to="/admin/statistic">Home</NavLink>
                        <NavLink style={navLinkStyles} to="/admin/students">Services</NavLink>
                        <NavLink style={navLinkStyles} to="/admin/teachers">About Us</NavLink>
                        <NavLink style={navLinkStyles} to="/admin/outputcriteria">Out Teams</NavLink>
                        <NavLink style={navLinkStyles} to="/admin/classrooms">Contact Us</NavLink>
                    </nav>
                    <div>
                        <button onClick={() => navigate('/signin')}
                            className='border border-[#1DA599] rounded-sm  text-[#1DA599] font-semibold w-full py-1 px-5'>Sign in</button>
                    </div>
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

export default HomePageLayout;