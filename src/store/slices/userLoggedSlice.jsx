import { createSlice } from "@reduxjs/toolkit";

const initial_state = {
  loginSuccess: false,
  userID: "",
  hitDatabase: true,
};

const userLogged = createSlice({
  name: "userLogged",
  initialState: initial_state,
  reducers: {
    setLoginSuccess: (state, actions) => {
      const { payload } = actions;
      state.loginSuccess = payload;
    },
    setUserID: (state, actions) => {
      const { payload } = actions;
      state.userID = payload;
    },
    setHitDatabase: (state, actions) => {
      const { payload } = actions;
      state.hitDatabase = payload;
    },
  },
});

export const { setLoginSuccess, setUserID, setHitDatabase } = userLogged.actions;
export default userLogged.reducer;
