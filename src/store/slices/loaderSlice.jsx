import { createSlice } from "@reduxjs/toolkit"

const initial_state = {
    checkUser: true,
    DataLoader: true,

}


const loader = createSlice({

    name: "loader",
    initialState: initial_state,

    reducers: {
        stopCheckUser(state, action) {
            state.checkUser = action.payload;
        },
        stopDataLoader(state, action) {
            state.DataLoader = action.payload;
        },

    }
});

export const { stopCheckUser, stopDataLoader } = loader.actions;
export default loader.reducer;