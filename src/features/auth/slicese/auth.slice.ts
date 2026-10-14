import { createSlice } from "@reduxjs/toolkit";

type user = {
  name: string;
  id?: string;
  email?: string;
  role: string;
};

export type initialState = { isAuthenticated: boolean; userInfo: null | user };

const initialState: initialState = { isAuthenticated: false, userInfo: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthStates: function (state, action) {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.userInfo = action.payload.userInfo;
    },

    logout : function(state){
      state.isAuthenticated = false ,
      state.userInfo = null
    }
  },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
