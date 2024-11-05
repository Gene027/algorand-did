import toast from 'react-hot-toast';
import { SignUpDto } from '../../app/(signup)/interface/auth.interface';
import { User } from '../../app/(signup)/interface/user.interface';
import axios from "axios";

export const axiosInstanceDIDServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DID_SERVER_URL,
});

export const useAuthActions = () => {
  const signUp = async (dto: SignUpDto) => {
    const url = `/api/auth/signup`;
    try {
      const res = await axios.post(url, dto);
      return res.data as User;
    } catch (error: any) {
      toast.error(error?.message.toString()); 
    }
  };

  const deployContract = async (userId: string) => {
    const url = `api/contract-deploy`;
    try {
      const res = await axios.post(url, { userId });
      return res.data;
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message.toString()); 
    }
  };

  const getProfile = async (userId: string) => {
    const url = `/api/auth/profile`;
    try {
      const res = await axios.post(url, { userId });
      return res.data as User;
    } catch (error: any) {
      toast.error(error?.message.toString()); 
    }
  };

  return {
    signUp,
    deployContract,
    getProfile,
  };
};
