import axios from 'axios';

const BACKEND_URL = 'http://localhost:8080/v1/api';

export const signUp = async (fullname, email, password, accountableType, major) => {
    try {
        // Format the request body to match server expectations
        const requestBody = {
            fullname,
            email,
            password,
            accountableType: accountableType.toLowerCase(), // Ensure lowercase to match enum
            major
        };

        const response = await axios.post(`${BACKEND_URL}/access/signup`, requestBody, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Signup error details:', error.response?.data || error.message); // Debug log

        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            throw new Error(error.response.data.message || 'Signup failed');
        } else if (error.request) {
            // The request was made but no response was received
            throw new Error('No response from server. Please check if the server is running.');
        } else {
            // Something happened in setting up the request that triggered an Error
            throw new Error('Error setting up request: ' + error.message);
        }
    }
};

export const verifyCode = async (email, code) => {
    try {
        const { data } = await axios.post(`${BACKEND_URL}/access/verify-code`, {
            email,
            code
        })
        return data
    } catch (e) {
        throw new Error(error.response.data.message || "Code is invalid")
    }
}

export const createAccount = async (fullname, email, password, accountableType, major) => {
    try {
        const { data } = await axios.post(`${BACKEND_URL}/access/create-account`, {
            fullname, email, password, accountableType, major
        })
        return data
    } catch (e) {
        throw new Error(error.response.data.message || "Create account failed")
    }
}