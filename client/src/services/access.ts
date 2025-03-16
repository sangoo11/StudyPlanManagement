import axios from "../configs/axios.ts";

export const signIn = async (
  email: string,
  password: string
): Promise<string> => {
  try {
    const { data } = await axios.post("/access/signin", {
      email,
      password,
    });
    return data;
  } catch (error) {
    throw error;
  }
};
