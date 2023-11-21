import { useCallback, useEffect, useMemo, useState } from "react";
import {
  addTrackToPlaylist,
  getTracksFromPlaylist,
  removeTrackFromPlaylist,
} from "../api/playlists";
import { HeartFilledIcon, HeartIcon } from "../assets/icons";
import { Track } from "../types";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setTracksFromPlaylist } from "../store/playlistSlice";

interface AddToFavoriteProps {
  trackId: string;
  favoritePlaylistTracks: Track[];
  favoritePlaylistId: string;
  getFavoritesTracks: () => void;
}

export const AddToFavorite = ({
  trackId,
  favoritePlaylistTracks,
  favoritePlaylistId,
  getFavoritesTracks,
}: AddToFavoriteProps) => {
  const currentPlaylist = useAppSelector(
    (state) => state.playlist.currentPlaylist
  );
  const dispatch = useAppDispatch();

  const addToFavoritePlaylist = useCallback(async () => {
    console.log(favoritePlaylistId)
    favoritePlaylistId &&
      (await addTrackToPlaylist(favoritePlaylistId, trackId));
    if (currentPlaylist) {
      const { data } = await getTracksFromPlaylist(currentPlaylist?.id);
      getFavoritesTracks();
      dispatch(setTracksFromPlaylist(data.items));
    }
  }, [
    currentPlaylist,
    dispatch,
    favoritePlaylistId,
    getFavoritesTracks,
    trackId,
  ]);

  const removeFromFavorite = useCallback(async () => {
    console.log(222)
    favoritePlaylistId &&
      (await removeTrackFromPlaylist(favoritePlaylistId, trackId));
    if (currentPlaylist) {
      const { data } = await getTracksFromPlaylist(currentPlaylist?.id);
      getFavoritesTracks();
      dispatch(setTracksFromPlaylist(data.items));
    }
  }, [
    currentPlaylist,
    dispatch,
    favoritePlaylistId,
    getFavoritesTracks,
    trackId,
  ]);

  const isTrackFavorite = useMemo(() => {
    return favoritePlaylistTracks.some((track) => track.id === trackId);
  }, [favoritePlaylistTracks, trackId]);

  return (
    <>
      {!isTrackFavorite ? (
        <img
          className="playlist-song__button"
          alt="like"
          src={HeartIcon}
          onClick={addToFavoritePlaylist}
        />
      ) : (
        <img
          className="playlist-song__button--filled"
          alt="like"
          src={HeartFilledIcon}
          onClick={removeFromFavorite}
        />
      )}
    </>
  );
};
