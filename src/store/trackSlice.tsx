import { createSlice } from "@reduxjs/toolkit";
import { Track } from "../types";
import { audio } from "../components/player/Player";

interface TrackState {
  currentTrack: Track | null;
  isPlaying: boolean;
}

const initialState: TrackState = {
  currentTrack: null,
  isPlaying: false,
};

const trackSlice = createSlice({
  name: "track",
  initialState,

  reducers: {
    setTrack: (state, action) => {
      state.currentTrack = action.payload;
    },
    playTrack: (state, action) => {
      state.isPlaying = true;
      if (state.currentTrack && action.payload !== "radio") {
        state.currentTrack.trackFileId = action.payload;
      }
      audio.current?.play();
    },
    pauseTrack: (state) => {
      state.isPlaying = false;
      audio.current?.pause();
    },
  },
});

export const { setTrack, playTrack, pauseTrack } = trackSlice.actions;
export default trackSlice.reducer;
