import SignUpPicture from '../../assets/images/signup.png';
import React, { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";

const SignUpPage = () => {

  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    fullname: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: ""
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
      newErrors.fullname = "* Full Name must be at least 2 characters.";
    } else if (!/^[A-Za-z\s]+$/.test(inputValue.fullname)) {
      newErrors.fullname = "* Full Name can only contain letters and spaces.";
    }

    if (!inputValue.phone.trim() || !/^\d{10}$/.test(inputValue.phone)) {
      newErrors.phone = "Phone must be a valid 10-digit number.";
    }

    if (!inputValue.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValue.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!inputValue.password || inputValue.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    } else if (
      !/[A-Z]/.test(inputValue.password) ||
      !/[a-z]/.test(inputValue.password) ||
      !/\d/.test(inputValue.password) ||
      !/[!@#$%^&*]/.test(inputValue.password)
    ) {
      newErrors.password =
        "Password must contain uppercase, lowercase, a number, and a special character.";
    }

    if (inputValue.confirmPassword !== inputValue.password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSignUp = async (event) => {
    event.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    try {
      const response = await axios.post('http://localhost:8080/v1/api/access/signup', {
        fullname: inputValue.fullname,
        phone: inputValue.phone,
        email: inputValue.email,
        password: inputValue.password
      });

      const decoded = jwtDecode(response.data.metadata.accessToken);

      localStorage.setItem('accountID', decoded.accountID);
      localStorage.setItem('accountableType', decoded.accountableType);

      navigate('/');
    } catch (error) {
      console.error('Error during signup:', error.response.data.message);
    }
  };


  return (
    <div className="flex mt-[12vh]">
      <div className="flex-1">
        <img className="w-3/4" src={SignInPicture}></img>
      </div>
      <div className="flex-1 m-auto flex flex-col items-center">
        <form onSubmit={handleSignUp} className="w-fit max-w-[600px] bg-[#1DA599] flex flex-col gap-2 items-center text-center p-8 text-white rounded-md">
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
          <button className="w-full underline">Forgot Password</button>
          <p className="w-full">Or</p>
          <button onClick={() => navigate('/signup')} className="w-full underline">Create an account</button>
          <button onClick={handleSignUp} className="w-full text-white font-medium py-1 px-3 bg-yellow-500 hover:bg-yellow-600 rounded mt-2">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;