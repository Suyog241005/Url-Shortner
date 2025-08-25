import axios from "axios";

interface initUserProps{
  clerkId: string;
  emailAddress: string;
  firstName?: string;
  lastName?: string;
}

export const initUser = async({
  clerkId,
  emailAddress,
  firstName,
  lastName,
}: initUserProps) => {
  const res = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/api/init-user`, {
    clerkId,
    email:emailAddress,
    firstName,
    lastName,
  }); 

  return res.data;
}