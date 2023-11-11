import { createSlice } from "@reduxjs/toolkit";

interface UiState {
  isDrawerOpened: boolean;
}

const initialState: UiState = {
  isDrawerOpened: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,

  reducers: {
    setDrawerOpened: (state) => {
      state.isDrawerOpened = !state.isDrawerOpened;
    },
  },
});

export const { setDrawerOpened } = uiSlice.actions;
export default uiSlice.reducer;
