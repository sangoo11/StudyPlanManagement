import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Navigate, Outlet } from 'react-router';
import UserLogo from '../assets/images/userlogo.png';

function AdminPageLayout(props) {

    const appName = 'EduOrganizer';
    const appMail = 'eduorganizer@gmail.com';
    const studentName = 'Admin Name';
    const title1 = 'Statistics';
    const title2 = 'Students';
    const title3 = 'Teachers';
    const title4 = 'Output Criteria';
    const title5 = 'Subjects';

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
            {/* Header */}
            <div className="fixed top-0 right-0 left-0 min-h-[8vh] bg-white items-center justify-center pt-4 border-b border-[#1DA599]">
                <div className="flex justify-center items-center space-x-12">
                    <div className='fixed left-0'>
                        <h1 className="text-3xl text-[#1DA599] font-bold pl-10">{appName}</h1>
                    </div>

                    <NavLink style={navLinkStyles} to="/admin" end></NavLink>
                    <NavLink style={navLinkStyles} to="/admin/statistics" >{title1}</NavLink>
                    <NavLink style={navLinkStyles} to="/admin/students">{title2}</NavLink>
                    <NavLink style={navLinkStyles} to="/admin/teachers">{title3}</NavLink>
                    <NavLink style={navLinkStyles} to="/admin/outputcriteria">{title4}</NavLink>
                    <NavLink style={navLinkStyles} to="/admin/subjects">{title5}</NavLink>

                    <button className='fixed right-10 space-x-2'>
                        <div className='fixed w-6 h-6 items-center justify-center'>
                            <img src={UserLogo} />
                        </div>
                        <h1 className="text-[#1DA599] pl-10">{studentName}</h1>
                    </button>
                </div>
            </div>

            {/* Content */}
            <Outlet />

            {/* Footer */}
            <div className='fixed bottom-0 right-0 left-0 min-h-[10vh] bg-[#1DA599] px-10 py-6'>
                <div className='grid grid-cols-[2fr_1fr_1fr_1fr_1fr] h-full min-h-[10vh] text-white'>
                    <div className='w-4/6'>
                        <h3 className='text-xl font-semibold mb-2'>{appName}</h3>
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
        </div>
    );
}

export default AdminPageLayout;