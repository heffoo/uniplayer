import { createSlice } from "@reduxjs/toolkit";
import { Playlist, Track } from "../types";

interface PlaylistState {
  currentPlaylist: Playlist | null;
  tracks: Track[]
}

const initialState: PlaylistState = {
  currentPlaylist: null,
  tracks: [],
};

const trackSlice = createSlice({
  name: "track",
  initialState,

  reducers: {
    setPlaylist: (state, action) => {
      state.currentPlaylist = action.payload;
    },
    setTracksFromPlaylist: (state, action) => {
      state.tracks = action.payload;
    }
  },
});

export const { setPlaylist, setTracksFromPlaylist } = trackSlice.actions;
export default trackSlice.reducer;
