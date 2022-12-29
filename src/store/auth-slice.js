import { createSlice } from '@reduxjs/toolkit';

const token = document.cookie.substring(document.cookie.indexOf('=') + 1);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: token,
    tokenExpireTime: "",
    isLogedIn: token ? true : false,
  },
  reducers: {
    login(state, action) {
      state.token = action.payload.idToken;
      state.tokenExpireTime = action.payload.expiresIn;
      document.cookie=`token=${action.payload.idToken}`;
      state.isLogedIn = true;
    },
    logout(state) {
      state.token = "";
      document.cookie = "token=;expires=" + new Date(0).toUTCString();
      state.isLogedIn = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
