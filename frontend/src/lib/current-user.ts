import axios from "axios";

export const currentUser = async (clerkId: string) => {
  try {
    if (!clerkId) return { message: "User not found" };
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URI}/api/current-user`,
      { clerkId }
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};