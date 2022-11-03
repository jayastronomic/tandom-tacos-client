import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../interfaces/user.interface";

const initialState: User = {
  id: 0,
  uuid: "",
  username: "",
  name: "",
  email: "",
  logged_in: false,
  recipes: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUserSuccess: (state, action: PayloadAction<User>) => action.payload,
    logoutSuccess: (state, action: PayloadAction<User>) => action.payload,
  },
});

export const { logoutSuccess, fetchUserSuccess } = userSlice.actions;
export default userSlice.reducer;
