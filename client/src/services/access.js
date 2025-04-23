import axios from "../configs/axios.js";

export const signUp = async (fullname, email, password, accountableType, major) => {
    try {
        const response = await axios.post('/access/signup', {
        fullname,
        email,
        password,
        accountableType,
        major
        });
        return response.data;
    } catch (error) {
        console.log("Error during sign-up:", error);
        throw error;
    }
}

export const createAccount = async (fullname, email, password, accountableType, major) => {
    try {
        const response = await axios.post('/access/create-account', {
            fullname,
            email,
            password,
            accountableType,
            major
        });
        return response.data;
    } catch (error) {
        console.error("Error during account creation:", error);
        throw error;
    }
}