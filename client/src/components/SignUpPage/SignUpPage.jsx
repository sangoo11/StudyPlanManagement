import SignUpPicture from '../../assets/images/signup.png';
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { signUp } from "../../services/auth";

const SignUpPage = () => {

  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountableType: "",
    major: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setInputValue(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  // Validation function
  const validate = () => {
    if (!inputValue.fullname.trim() || inputValue.fullname.length < 2) {
      alert("* Full Name must be at least 2 characters.");
      return false;
    } else if (!/^[A-Za-z\s]+$/.test(inputValue.fullname)) {
      alert("* Full Name must contain only alphabets.");
      return false;
    }

    if (!inputValue.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValue.email)) {
      alert("* Invalid email address.");
      return false;
    }

    if (!inputValue.password || inputValue.password.length < 8) {
      alert("* Password must be at least 8 characters.");
      return false;
    } else if (
      !/[A-Z]/.test(inputValue.password) ||
      !/[a-z]/.test(inputValue.password) ||
      !/\d/.test(inputValue.password) ||
      !/[!@#$%^&*]/.test(inputValue.password)
    ) {
      alert("* Password must contain at least one uppercase letter, one lowercase letter, one digit and one special character.");
      return false;
    }

    if (inputValue.confirmPassword !== inputValue.password) {
      alert("* Passwords do not match.");
      return false;
    }

    if (!inputValue.accountableType) {
      alert("* Please select an account type (Teacher or Student).");
      return false;
    }

    if (!inputValue.major.trim()) {
      alert("* Please enter your major.");
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSignUp = async (event) => {
    event.preventDefault();

    // Validate the input values
    if (!validate()) {
      return;
    }

    try {
      // Initiate sign-up process
      const response = await signUp(
        inputValue.fullname,
        inputValue.email,
        inputValue.password,
        inputValue.accountableType,
        inputValue.major
      );

      alert("Check your email to receive verification code")

      // Store user info in localStorage
      const userInfo = {
        fullname: inputValue.fullname,
        email: inputValue.email,
        password: inputValue.password,
        accountableType: inputValue.accountableType,
        major: inputValue.major
      };
      localStorage.setItem('user-info', JSON.stringify(userInfo));

      // Navigate to verify code page
      navigate('/verify-code');
    } catch (error) {
      console.error('Signup failed:', error);
      alert('Signup failed. Please try again.');
    }
  };


  return (
    <div className="flex mt-[12vh]">
      <div className="flex-1 m-auto flex flex-col items-center">
        <form onSubmit={handleSignUp} className="w-fit max-w-[600px] bg-[#1DA599] flex flex-col gap-4 items-center text-center p-8 text-white rounded-md">
          <h2 className="w-full text-4xl font-semibold mb-3">Sign Up</h2>
          <input type="text"
            autoComplete="true"
            placeholder="Email"
            onChange={(event) => handleChange(event)}
            value={inputValue.email}
            name="email"
            className="rounded text-black bg-[#EBF4F6] w-[350px] h-[36px] indent-3 focus:outline-none focus:ring focus:ring-yellow-400"
          />
          <input type="text"
            autoComplete="true"
            placeholder="Fullname"
            onChange={(event) => handleChange(event)}
            value={inputValue.fullname}
            name="fullname"
            className="rounded text-black bg-[#EBF4F6] w-[350px] h-[36px] indent-3 focus:outline-none focus:ring focus:ring-yellow-400"
          />
          <input type="text"
            autoComplete="true"
            placeholder="Major"
            onChange={(event) => handleChange(event)}
            value={inputValue.major}
            name="major"
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
          <input type="password"
            autoComplete="true"
            placeholder="Confirm Password"
            onChange={(event) => handleChange(event)}
            value={inputValue.confirmPassword}
            name="confirmPassword"
            className="rounded text-black bg-[#EBF4F6] w-[350px] h-[36px] indent-3 focus:outline-none focus:ring focus:ring-yellow-400"
          />
          <div className="flex gap-4">
            <div className='space-x-2'>
              <input type="radio"
                value="teacher"
                name="accountableType"
                onChange={(event) => handleChange(event)}
              />
              <label htmlFor='teacher'>
                Teacher
              </label>
            </div>
            <div className='space-x-2'>
              <input type="radio"
                value="student"
                name="accountableType"
                onChange={(event) => handleChange(event)}
              />
              <label htmlFor='student'>
                Student
              </label>
            </div>
          </div>
          <button type="submit" className="w-full text-white font-medium py-1 px-3 bg-yellow-500 hover:bg-yellow-600 rounded mt-2">Sign Up</button>
          <button type="button" onClick={() => navigate('/signin')} className="w-full underline">Already have account?</button>
        </form>
      </div>
      <div className="flex-1">
        <img className="w-3/4" src={SignUpPicture} alt="Sign Up"></img>
      </div>
    </div>
  );
};

export default SignUpPage;