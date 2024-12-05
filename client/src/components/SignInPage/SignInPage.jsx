import React, { useState } from "react";
import SignInPicture from '../../assets/images/signin.png'
import axios from 'axios'
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";

const SignInScreen = () => {
    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState({
        email: "test@gmail.com",
        password: "test"
    });

    //function control value of inputbox
    function handleChange(event) {
        const { name, value } = event.target;
        setInputValue(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSignIn = async () => {
        try {
            const response = await axios.post('http://localhost:8080/v1/api/access/signin', {
                email: inputValue.email,
                password: inputValue.password
            });

            // Storing the access token and role in localStorage
            const accessToken = response.data.metadata.accessToken;

            const decoded = jwtDecode(accessToken)


            const userRole = response.data.metadata.user.role || decoded.userRole;
            const userId = response.data.metadata.user.id || decoded.userId;

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('role', userRole);
            localStorage.setItem('loggedIn', true);

            //Show res to user
            console.log('Signin successful:', response.data);

            // Navigating based on the role 
            navigate(`/${userRole}`);
        } catch (error) {
            console.error('Error during signin:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="flex mt-[12vh]">
            <div className="flex-1">
                <img className="w-full" src={SignInPicture}></img>
            </div>
            <div className="flex-1 m-auto flex flex-col items-center">
                <div className="w-fit max-w-[600px] bg-[#1DA599] flex flex-col gap-2 items-center text-center p-8 text-white rounded-md">
                    <h2 className="w-full text-4xl font-semibold mb-3">Sign in</h2>
                    <input type="text"
                        placeholder="Email"
                        onChange={(event) => handleChange(event)}
                        value={inputValue.email}
                        name="email"
                        className="rounded text-black bg-[#EBF4F6] w-[350px] h-[36px] indent-3"
                    />
                    <input type="password"
                        placeholder="Password"
                        onChange={(event) => handleChange(event)}
                        value={inputValue.password}
                        name="password"
                        className="rounded text-black bg-[#EBF4F6] w-[350px] h-[36px] indent-3"
                    />
                    <button className="w-full">Forgot Password</button>
                    <p className="w-full">Or</p>
                    <button onClick={() => navigate('/signup')} className="w-full">Create an account</button>
                    <button onClick={handleSignIn} className="w-fit text-[#1DA599] font-semibold py-1 px-3 bg-white rounded mt-2">Sign In</button>
                </div>
            </div>
        </div>
    );
};

export default SignInScreen;