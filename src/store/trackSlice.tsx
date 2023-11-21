import { createSlice } from "@reduxjs/toolkit";
import { Track } from "../types";
import { audio } from "../components/player/Player";

interface TrackState {
  currentTrack: Track | null;
  isPlaying: boolean;
  isRadioPlaying: boolean;
}

const initialState: TrackState = {
  currentTrack: null,
  isPlaying: false,
  isRadioPlaying: false,
};

const trackSlice = createSlice({
  name: "track",
  initialState,

  reducers: {
    setIsRadioPlaying: (state) => {
      state.isRadioPlaying = true;
    },
    setIsRadioNotPlaying: (state) => {
      state.isRadioPlaying = false;
    },
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

export const { setTrack, playTrack, pauseTrack, setIsRadioPlaying, setIsRadioNotPlaying } = trackSlice.actions;
export default trackSlice.reducer;
