import { PauseIcon, PlayIcon } from "../../assets/icons";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { playTrack, pauseTrack, setTrack } from "../../store/trackSlice";
import { Track } from "../../types";

interface PlaylistProps {
  track: Track;
}

export const PlayPause = ({ track }: PlaylistProps) => {
  const dispatch = useAppDispatch();
  const currentTrack = useAppSelector((state) => state.track.currentTrack);
  const isPlaying = useAppSelector((state) => state.track.isPlaying);

  const play = async () => {
    await dispatch(playTrack());
    dispatch(setTrack(track));
  };

  const pause = async () => {
    await dispatch(pauseTrack());
  };
  return (
    <button className="player-button">
      {track.id !== currentTrack?.id || !isPlaying ? (
        <img alt="play" src={PlayIcon} onClick={play} />
      ) : (
        <img alt="pause" src={PauseIcon} onClick={pause} />
      )}
    </button>
  );
};
