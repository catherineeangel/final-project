import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

type LoginType = {
  username: string;
  password: string;
};
type RegisterType = LoginType & {
  role: string;
};

export const userLogin = createAsyncThunk(
  "user/login",
  async ({ username, password }: LoginType, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          Authorization: `bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        { username, password },
        config
      );

      toast.success("Successfully Login!");

      return data;
    } catch (error: any) {
      // return custom error message from API if any
      toast.error(error.response.data.error);
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  async ({ username, password, role }: RegisterType, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
          "Content-Type": "application/json",
        },
      };

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        { username, password, role },
        config
      );

      toast.success("Account created successfully!");
    } catch (error: any) {
      toast.error(error.response.data.error);
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
