import React, {useState, useEffect} from "react";
import {Link, NavLink} from 'react-router-dom';
import {Navigate, Outlet} from 'react-router';
import UserLogo from '../assets/images/userlogo.png';
import {useNavigate} from 'react-router';
import axios from "axios";

function StudentPageLayout(props) {

    const appName = 'EduOrganizer';
    const appMail = 'eduorganizer@gmail.com';
    const student = 'Student';
    const title1 = 'Home Page';
    const title2 = 'Learning Results';
    const title3 = 'Learning Outcomes';
    const title4 = 'Award';
    const title5 = 'Domain Field';
    const title6 = 'Certificate';

    const accountID = localStorage.getItem('accountID');
    const [studentID, setStudentID] = useState(null);

    const navigate = useNavigate();

    const navLinkStyles = ({isActive}) => {
        return {
            color: isActive ? "#1DA599" : "black",
            fontWeight: 400,
            textDecoration: "none",
            borderBottom: isActive ? "1px solid #1DA599" : "none",
            paddingBottom: isActive ? "5px" : "0",
        };
    };

    const getStudentId = async () => {
        if (!accountID) return;
        try {
            const response = await axios.get(
                `http://localhost:8080/v1/api/account/get-user-id/${accountID}`
            );
            console.log(response);

            setStudentID(response.data.metadata.studentID); // Make sure this is correct
        } catch (error) {
            console.error(error.response?.data?.message || "Error fetching studentID");
        }
    };
    useEffect(() => {
        getStudentId();
    }, []);

    return (
        <div>
            {/* Header */}
            <div
                className="fixed top-0 right-0 left-0 min-h-[8vh] bg-white items-center justify-center pt-4 border-b border-[#1DA599]">
                <div className="flex justify-center items-center space-x-12">
                    <div className='fixed left-0'>
                        <h1 className="text-3xl text-[#1DA599] font-bold pl-10">{appName}</h1>
                    </div>

                    <NavLink style={navLinkStyles} to="/student" end>{title1}</NavLink>
                    <NavLink style={navLinkStyles} to="/student/results">{title2}</NavLink>
                    <NavLink style={navLinkStyles} to="/student/outcome">{title3}</NavLink>
                    <NavLink style={navLinkStyles} to="/student/award">{title4}</NavLink>
                    <NavLink style={navLinkStyles} to="/student/domainfield">{title5}</NavLink>
                    <NavLink style={navLinkStyles} to="/student/certificate">{title6}</NavLink>

                    <button className='fixed right-10 space-x-2'
                            onClick={() => navigate(`/student/account/${studentID}`)}>
                        <div className='fixed w-6 h-6 items-center justify-center'>
                            <img src={UserLogo}/>
                        </div>
                        <h1 className="text-[#1DA599] pl-10">{student}</h1>
                    </button>
                </div>
            </div>

            {/* Content */}
            <Outlet/>

            {/* Footer */}
            {/*<div className='flex-reverse bottom-0 right-0 left-0 min-h-[10vh] bg-[#1DA599] px-10 py-6'>*/}
            {/*    <div className='grid grid-cols-[2fr_1fr_1fr_1fr_1fr] h-full min-h-[10vh] text-white'>*/}
            {/*        <div className='w-4/6'>*/}
            {/*            <h3 className='text-xl font-semibold mb-2'>{appName}</h3>*/}
            {/*        </div>*/}
            {/*        <div>*/}
            {/*            <h3 className='text-xl font-semibold mb-2'>Company</h3>*/}
            {/*            <ul className='text-xs font-thin space-y-2'>*/}
            {/*                <li>About Us</li>*/}
            {/*                <li>Services</li>*/}
            {/*                <li>Community</li>*/}
            {/*                <li>Testimorial</li>*/}
            {/*            </ul>*/}
            {/*        </div>*/}
            {/*        <div>*/}
            {/*            <h3 className='text-xl font-semibold mb-2'>Support</h3>*/}
            {/*            <ul className='text-xs font-thin space-y-2'>*/}
            {/*                <li>Help Center</li>*/}
            {/*                <li>Feed Back</li>*/}
            {/*            </ul>*/}
            {/*        </div>*/}
            {/*        <div>*/}
            {/*            <h3 className='text-xl font-semibold mb-2'>Links</h3>*/}
            {/*            <ul className='text-xs font-thin space-y-2'>*/}
            {/*                <li>Courses</li>*/}
            {/*                <li>Become Teacher</li>*/}
            {/*                <li>Services</li>*/}
            {/*                <li>All in One</li>*/}
            {/*            </ul>*/}
            {/*        </div>*/}
            {/*        <div>*/}
            {/*            <h3 className='text-xl font-semibold mb-2'>Contact Us</h3>*/}
            {/*            <p className='text-xs font-thin'>{appMail}</p>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
}

export default StudentPageLayout;