import { createSlice } from "@reduxjs/toolkit";

interface UiState {
  isDrawerOpened: boolean;
  isRadioPlaying: boolean;
}

const initialState: UiState = {
  isDrawerOpened: false,
  isRadioPlaying: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,

  reducers: {
    setDrawerOpened: (state) => {
      state.isDrawerOpened = !state.isDrawerOpened;
    },
    setRadioIsPlaying: (state) => {
      state.isRadioPlaying = !state.isRadioPlaying;
    },
  },
});

export const { setDrawerOpened, setRadioIsPlaying } = uiSlice.actions;
export default uiSlice.reducer;
