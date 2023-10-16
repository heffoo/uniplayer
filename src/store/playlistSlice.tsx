import { createSlice } from "@reduxjs/toolkit";
import { Playlist } from "../types";

interface PlaylistState {
  currentPlaylist: Playlist | null;
}

const initialState: PlaylistState = {
  currentPlaylist: null,
};

const trackSlice = createSlice({
  name: "track",
  initialState,

  reducers: {
    setPlaylist: (state, action) => {
      state.currentPlaylist = action.payload;
    },
  },
});

export const { setPlaylist } = trackSlice.actions;
export default trackSlice.reducer;
