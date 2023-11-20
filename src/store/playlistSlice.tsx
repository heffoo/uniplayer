import { createSlice } from "@reduxjs/toolkit";
import { Playlist, Track } from "../types";

interface PlaylistState {
  favoritePlaylistTracks: Track[];
  currentPlaylist: Playlist | null;
  tracks: Track[];
  allPlaylists: Playlist[];
}

const initialState: PlaylistState = {
  favoritePlaylistTracks: [],
  currentPlaylist: null,
  allPlaylists: [],
  tracks: [],
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,

  reducers: {
    setPlaylist: (state, action) => {
      state.currentPlaylist = action.payload;
    },
    setFavoritePlaylistTracks: (state, action) => {
      state.favoritePlaylistTracks = action.payload;
    },
    setPlaylists: (state, action) => {
      state.allPlaylists = action.payload;
    },
    setTracksFromPlaylist: (state, action) => {
      state.tracks = action.payload;
    },
  },
});

export const {
  setPlaylist,
  setTracksFromPlaylist,
  setPlaylists,
  setFavoritePlaylistTracks,
} = playlistSlice.actions;
export default playlistSlice.reducer;
