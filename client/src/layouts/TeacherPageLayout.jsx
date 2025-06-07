import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink } from 'react-router-dom';
import { Navigate, Outlet, useNavigate } from 'react-router';
import UserLogo from '../assets/images/userlogo.png';

function TeacherPageLayout(props) {

    const appName = 'EduOrganizer';
    const appMail = 'eduorganizer@gmail.com';
    const teacher = 'Teacher';
    const title1 = 'Home Page';
    const title2 = 'Statistics';
    const accountID = localStorage.getItem('accountID');
    const [teacherID, setTeacherID] = useState(null);

    const navigate = useNavigate();

    const navLinkStyles = ({ isActive }) => {
        return {
            color: isActive ? "#1DA599" : "black",
            fontWeight: 400,
            textDecoration: "none",
            borderBottom: isActive ? "1px solid #1DA599" : "none",
            paddingBottom: isActive ? "5px" : "0",
        };
    };


    // Fetch teacher ID for current user
    const getTeacherId = async () => {
        if (!accountID) return;
        try {
            const response = await axios.get(
                `http://localhost:8080/v1/api/account/get-user-id/${accountID}`
            );
            setTeacherID(response.data.metadata.teacherID); // Make sure this is correct
        } catch (error) {
            console.error(error.response?.data?.message || "Error fetching teacherID");
        }
    };
    useEffect(() => {
        getTeacherId();
    }, []);

    return (
        <div className="relative">
            {/* Header */}
            <div className="fixed top-0 right-0 left-0 min-h-[8vh] bg-white items-center justify-center pt-4 border-b border-[#1DA599]">
                <div className="flex justify-center items-center space-x-12">
                    <div className='fixed left-0'>
                        <h1 className="text-3xl text-[#1DA599] font-bold pl-10">{appName}</h1>
                    </div>

                    <NavLink style={navLinkStyles} to="/teacher" end>{title1}</NavLink>
                    <NavLink style={navLinkStyles} to="/teacher/outcome" end>Out come</NavLink>
                    <NavLink style={navLinkStyles} to="/teacher/statistics">{title2}</NavLink>

                    <button
                        className='fixed right-10 space-x-8'
                        onClick={() => navigate(`/teacher/accountteacher/${teacherID}`)}
                    >
                        <div className='fixed w-6 h-6 items-center justify-center'>
                            <img src={UserLogo} />
                        </div>
                        <h1 className="text-[#1DA599]">{teacher}</h1>
                    </button>
                </div>
            </div>

            {/* Content */}
            <Outlet />

            {/* Footer
            <div className='absolute flex-reverse bottom-0 right-0 left-0 min-h-[10vh] bg-[#1DA599] px-10 py-6'>
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
            </div> */}
        </div>
    );
}

export default TeacherPageLayout;