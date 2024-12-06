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

  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputValue((prevState) => ({
      ...prevState,
      [name]: value
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "" // Clear error when the user starts typing
    }));
  };

  // Validation function
  const validate = () => {
    const newErrors = {};

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
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      console.error("Form submission");
      return; // Stop submission if validation fails
    }

    console.log(inputValue);

    try {
      const response = await axios.post(
        "http://localhost:8080/v1/api/access/signup",
        {
          fullname: inputValue.fullname,
          phone_number: inputValue.phone,
          email: inputValue.email,
          password: inputValue.password
        }
      );

      const accessToken = response.data.metadata.accessToken;
      const decoded = jwtDecode(accessToken);
      const userRole = response.data.metadata.user.role || decoded.userRole;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("role", userRole);
      localStorage.setItem("loggedIn", true);
      navigate("/signin"); // Navigate to signin after signup
    } catch (error) {
      setErrors({
        apiError: error.response
          ? error.response.data.message
          : "Signup failed. Please try again."
      });
    }
  };


  return (
    <div>
      <div className="flex flex-col min-h-screen">
        {/* Main Section */}
        <main className="flex flex-1 items-center justify-center bg-white py-4 mt-[20vh] mb-[10vh]">
          <div className="flex flex-col md:flex-row items-center max-w-[70vw] w-full gap-8 px-10">
            {/* Form Section */}
            <div className="bg-custom-teal text-white p-6 rounded-lg shadow-md max-w-md w-full h-auto">
              <h2 className="text-2xl font-semibold text-center mb-4">Create New Account</h2>
              <form onSubmit={handleSubmit} className="space-y-4 space-x-2">
                {/* Error Show */}
                {errors.apiError && (
                  <div className="text-red-500 text-center mb-4 font-bold">
                    {errors.apiError}
                  </div>
                )}

                {/* Content */}
                <div className='flex flex-col'>
                  <div className="flex items-center space-x-4">
                    <label htmlFor="fullname" className="text-sm font-medium w-60 ml-2">Full Name</label>
                    <input type="text" 
                      name="fullname"
                      onChange={(event) => handleChange(event)}  
                      value={inputValue.fullname} 
                      placeholder="Full Name" 
                      className="w-[50vw] px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-yellow-400 text-black" 
                    /> 
                  </div>

                  <div className='flex h-[3vh] w-full h-full mt-2 h-[2vh]'>
                      {errors.fullname && (
                      <p className="text-green-200 text-sm font-bold">{errors.fullname}</p>
                    )}
                  </div>
                </div>

                <div className='flex flex-col'>
                  <div className="flex items-center space-x-3">
                    <label htmlFor="fullname" className="text-sm font-medium w-60 ml-2">Email</label>
                    <input type="text" 
                      name="email"
                      onChange={(event) => handleChange(event)}  
                      value={inputValue.email} 
                      placeholder="Email" 
                      className="w-[50vw] px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-yellow-400 text-black" 
                    /> 
                  </div>

                  <div className='flex h-[3vh] w-full h-full mt-2 h-[2vh]'>
                      {errors.email && (
                      <p className="text-green-200 text-sm font-bold">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className='flex flex-col'>
<div className="flex items-center space-x-4">
                    <label htmlFor="phone" className="text-sm font-medium w-60">Phone</label>
                    <input type="tel" 
                      name="phone"
                      onChange={(event) => handleChange(event)}  
                      value={inputValue.phone} 
                      placeholder="Phone" 
                      className="w-[50vw] px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-yellow-400 text-black"
                    /> 
                  </div>

                  <div className='flex h-[3vh] w-full h-full mt-2 h-[2vh]'>
                      {errors.phone && (
                      <p className="text-green-200 text-sm font-bold">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div className='flex flex-col'>
                  <div className="flex items-center space-x-4">
                  <label htmlFor="password" className="text-sm font-medium w-60">Password</label>
                    <input type="password" 
                      name="password" 
                      onChange={(event) => handleChange(event)}  
                      value={inputValue.password} 
                      placeholder="Password" 
                      className="w-[50vw] px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-yellow-400 text-black"
                    /> 
                  </div>

                  <div className='flex h-[3vh] w-full h-full mt-2 h-[2vh]'>
                      {errors.password && (
                      <p className="text-green-200 text-sm font-bold">{errors.password}</p>
                    )}
                  </div>
                </div>

                <div className='flex flex-col'>
                  <div className="flex items-center space-x-4">
                    <label htmlFor="confirmPassword" className="text-sm font-medium w-60">Confirm Password</label>
                    <input type="password"
                      name="confirmPassword"
                      onChange={(event) => handleChange(event)}
                      value={inputValue.confirmPassword}
                      placeholder="Confirm Password"
                      className="w-[50vw] px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-yellow-400 text-black" 
                    /> 
                  </div>

                  <div className='flex h-[3vh] w-full h-full mt-2 h-[2vh]'>
                      {errors.confirmPassword && (
                      <p className="text-green-200 text-sm font-bold">{errors.confirmPassword}</p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded transition"
                >
                  Sign up
                </button>
<div className="text-center space-y-1">
                  <a href="/signin" className="text-sm text-white underline">
                    Already have an account ?
                  </a>
                </div>
              </form>
            </div>

            {/* Image Section */}
            <div className="flex justify-center pl-[10vw]">
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={SignUpPicture}
                  alt="Student"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SignUpPage;