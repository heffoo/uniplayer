import classnames from "classnames";
import { PauseIcon, PlayIcon } from "../../assets/icons";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { playTrack, pauseTrack, setTrack } from "../../store/trackSlice";
import { Track } from "../../types";
import { current } from "@reduxjs/toolkit";
import { getTrack } from "../../api/tracks";

interface PlaylistProps {
  className?: string;
  disabled?: boolean;
  track: Track | null;
}

export const PlayPause = ({ className, track, disabled }: PlaylistProps) => {
  const dispatch = useAppDispatch();
  const currentTrack = useAppSelector((state) => state.track.currentTrack);
  const isPlaying = useAppSelector((state) => state.track.isPlaying);

  const play = async () => {
    await dispatch(setTrack(track));
    getTrack(track?.trackFileId);
    dispatch(playTrack(track?.trackFileId));
  };

  const pause = async () => {
    await dispatch(pauseTrack());
  };

  return (
    <button
      className={classnames("player-button", className)}
      disabled={disabled}
    >
      {track?.id !== currentTrack?.id || !isPlaying ? (
        <img alt="play" src={PlayIcon} onClick={play} />
      ) : (
        <img alt="pause" src={PauseIcon} onClick={pause} />
      )}
    </button>
  );
};
