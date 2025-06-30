import React, { useState } from "react";
import SignInPicture from '../../assets/images/signin.png'
import axios from 'axios'
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

const SignInScreen = () => {
    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState({
        email: "",
        password: ""
    });

    //function control value of inputbox
    function handleChange(event) {
        const { name, value } = event.target;
        setInputValue(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    function validate() {
        if (!inputValue.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValue.email)) {
            alert("Enter a valid email address.");
            return false;
        }
        if (!inputValue.password) {
            alert("Password must be at least 8 characters.");
            return false;
        }
        return true;
    }

    const handleSignIn = async (event) => {
        let valid = validate();
        if (!valid) return;

        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/v1/api/access/signin', {
                email: inputValue.email,
                password: inputValue.password
            });

            const decoded = jwtDecode(response.data.metadata.accessToken);

            localStorage.setItem('accountID', decoded.accountID);
            localStorage.setItem('accountableType', decoded.accountableType);

            if (decoded.accountableType === 'teacher') {
                console.log(decoded.accountableType);
                navigate('/teacher');
            } else if (decoded.accountableType === 'admin') {
                navigate('/admin/statistics');
            } else {
                navigate('/student');
            }
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <div className="flex mt-[12vh]">
            <div className="flex-1 mt-10">
                <img className="w-3/4 mx-auto" src={SignInPicture}></img>
            </div>
            <div className="flex-1 mt-10 flex flex-col items-center">
                <div className="w-fit max-w-[600px] bg-[#1DA599] flex flex-col gap-2 items-center text-center p-8 text-white rounded-md shadow-sm">
                    <h2 className="w-full text-4xl font-semibold mb-3">Sign in</h2>
                    <input type="text"
                        autoComplete="true"
                        placeholder="Email"
                        onChange={(event) => handleChange(event)}
                        value={inputValue.email}
                        name="email"
                        className="rounded text-black bg-[#EBF4F6] w-[350px] h-[36px] indent-3 focus:outline-none focus:ring focus:ring-yellow-400"
                    />
                    <input type="password"
                        autoComplete="true"
                        placeholder="Password"
                        onChange={(event) => handleChange(event)}
                        value={inputValue.password}
                        name="password"
                        className="rounded text-black bg-[#EBF4F6] w-[350px] h-[36px] indent-3 focus:outline-none focus:ring focus:ring-yellow-400"
                    />
                    <Link to={'/forgot-password'} className="w-full underline">Forgot Password</Link>
                    <p className="w-full">Or</p>
                    <Link to={'/signup'} className="w-full underline">Create an account</Link>
                    <button onClick={handleSignIn} className="w-full text-white font-medium py-1 px-3 bg-yellow-500 hover:bg-yellow-600 rounded mt-2">Sign In</button>
                </div>
            </div>
        </div>
    );
};

export default SignInScreen;