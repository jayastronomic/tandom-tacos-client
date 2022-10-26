import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../interfaces/user.interface";

const initialState: User = {
  uuid: "",
  username: "",
  name: "",
  email: "",
  logged_in: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createUserSuccess: (state, action: PayloadAction<User>) => action.payload,
    fetchUserSuccess: (state, action: PayloadAction<User>) => action.payload,
    logout: (state, action: PayloadAction<User>) => action.payload,
  },
});

export const { createUserSuccess, logout, fetchUserSuccess } =
  userSlice.actions;
export default userSlice.reducer;
