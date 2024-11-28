import React from "react";
import SignInPicture from '../../assets/images/signin.png'


const SignInScreen = () => {
    return (
        <div>
            <div className="flex flex-col min-h-screen">
                {/* Main Section */}
                <main className="flex flex-1 items-center justify-center bg-white py-4 h-full w-full">
                    <div className="flex flex-col md:flex-row items-center max-w-5xl w-full gap-8 px-10">
                        {/* Image Section */}
                        <div className="flex justify-center w-full">
                            <div className="relative w-1/2 h-1/2  overflow-hidden">
                                <img
                                    src={SignInPicture}
                                    alt="Student"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>
                        {/* Form Section */}
                        <div className="bg-custom-teal text-white p-6 rounded-lg shadow-md max-w-md w-full">
                            <h2 className="text-2xl font-semibold text-center mb-4">Sign in</h2>
                            <form className="space-y-4">
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium mb-1"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="Email"
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-yellow-400 text-black"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium mb-1"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        placeholder="Password"
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-yellow-400 text-black"
                                    />
                                </div>
                                <div className="text-center space-y-1">
                                    <a href="/" className="text-sm text-white underline">Forgot password?</a>
                                    <div className="text-sm">or</div>
                                    <a href="/signup" className="text-sm text-white underline">Create an account?</a>
                                </div>
                                <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded transition ">
                                    Sign in
                                </button>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default SignInScreen;