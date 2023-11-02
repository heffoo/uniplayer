import { createSlice } from "@reduxjs/toolkit";
import { audio } from "../components/player/Player";

interface PlayerState {
  muted: boolean;
  looped: boolean;
  shuffled: boolean;
  volume: number;
}

const initialState: PlayerState = {
  muted: false,
  looped: false,
  shuffled: false,
  volume: 1,
};

const playerSlice = createSlice({
  name: "player",
  initialState,

  reducers: {
    muteTrack: (state) => {
      state.muted = !state.muted;
    },

    repeatTrack: (state) => {
      state.looped = !state.looped;
    },
    shuffleTrack: (state) => {
      state.shuffled = !state.shuffled;
    },
    setVolume: (state, action) => {
      state.volume = action.payload;
      audio.current!.volume = action.payload;
    },
  },
});

export const { muteTrack, repeatTrack, shuffleTrack, setVolume } =
  playerSlice.actions;
export default playerSlice.reducer;
