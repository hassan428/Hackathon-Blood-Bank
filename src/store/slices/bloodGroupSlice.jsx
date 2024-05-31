import { createSlice } from "@reduxjs/toolkit";

const initial_state = {
  bloodGroups: [
    {
      bloodGroup: "A+",
      value: 10,
    },
    {
      bloodGroup: "A-",
      value: 11,
    },
    {
      bloodGroup: "B+",
      value: 20,
    },
    {
      bloodGroup: "B-",
      value: 21,
    },
    {
      bloodGroup: "AB+",
      value: 30,
    },
    {
      bloodGroup: "AB-",
      value: 31,
    },
    {
      bloodGroup: "O+",
      value: 40,
    },
    {
      bloodGroup: "O-",
      value: 41,
    },
  ],
  selectedGroups: "",
};

const bloodGroup = createSlice({
  name: "bloodGroup",
  initialState: initial_state,
  reducers: {
    setSelectedGroups(state, action) {
     state.selectedGroups = action.payload;
    },
  },
});

export const { setSelectedGroups } = bloodGroup.actions;
export default bloodGroup.reducer;
