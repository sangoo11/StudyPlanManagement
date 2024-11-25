import React from "react";
import Layout from "../../layouts/SignInUpLayout.jsx";
import SignIn from "../SignInPage/SignInPage.jsx";

const SignUpPage = () => {
  return (
    <Layout>
        <div className="flex flex-col min-h-screen">
            {/* Main Section */}
            <main className="flex flex-1 items-center justify-center bg-white py-4">
                <div className="flex flex-col md:flex-row items-center max-w-5xl w-full gap-8 px-10">
                    {/* Form Section */}
                    <div className="bg-custom-teal text-white p-6 rounded-lg shadow-md max-w-md w-full">
                        <h2 className="text-2xl font-semibold text-center mb-4">Create New Account</h2>
                        <form className="space-y-4 space-x-2">
                            <div className="flex items-center space-x-5">
                              <label htmlFor="accountName" className="text-sm font-medium w-60 ml-2">Account Name</label>
                              <input type="text" id="accountName" placeholder="Account Name" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-yellow-400 text-black" />
                            </div>
                            <div className="flex items-center space-x-4">
                              <label htmlFor="fullName" className="text-sm font-medium w-60">Full Name</label>
                              <input type="text" id="fullName" placeholder="Full Name" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-yellow-400 text-black" />
                            </div>
                            <div className="flex items-center space-x-4">
                              <label htmlFor="phone" className="text-sm font-medium w-60">Phone</label>
                              <input type="tel" id="phone" placeholder="Phone" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-yellow-400 text-black" />
                            </div>
                            <div className="flex items-center space-x-4">
                                <label htmlFor="email" className="text-large font-medium w-60">Email</label>
                                <input type="email" id="email" placeholder="Email" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-yellow-400 text-black" />
                            </div>
                            <div className="flex items-center space-x-4">
                              <label htmlFor="password" className="text-sm font-medium w-60">Password</label>
                              <input type="password" id="password" placeholder="Password" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-yellow-400 text-black" />
                            </div>
                            <div className="flex items-center space-x-4">
                              <label htmlFor="confirmPassword" className="text-sm font-medium w-60">Confirm Password</label>
                              <input type="password" id="confirmPassword" placeholder="Confirm Password" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-yellow-400 text-black" />
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
                    <div className="flex justify-center">
                        <div className="relative w-64 h-64 rounded-full border-4 border-dotted border-yellow-500 overflow-hidden">
                            <img
                                src="../../../assets/images/student.png"
                                alt="Student"
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </Layout>
  );
};

export default SignUpPage;