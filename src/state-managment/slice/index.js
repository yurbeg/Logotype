import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  originalData: [], 
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setDate: (state, action) => {
      state.data = action.payload;
    },
    setOriginalData: (state, action) => {
      state.originalData = action.payload;
    },
  },
});

export const { setDate, setOriginalData } = dataSlice.actions;
export default dataSlice.reducer;
