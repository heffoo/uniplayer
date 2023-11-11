import { Col, Row, Space, Typography } from "antd";

import { SyntheticEvent, createRef, useState } from "react";
import { tracks } from "../../api/mocks";

import "./player.scss";
import {
  BackIcon,
  ForwardIcon,
  RepeatOneIcon,
  RepeatIcon,
  ShuffleIcon,
  VolumeOnIcon,
  NoShuffleIcon,
  VolumeOffIcon,
} from "../../assets/icons";
import { playTrack, setTrack } from "../../store/trackSlice";
import {
  muteTrack,
  repeatTrack,
  setVolume,
  shuffleTrack,
} from "../../store/playerSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { PlayPause } from "../shared/PlayPause";
import { Track } from "../../types";
import classNames from "classnames";
import { setDrawerOpened } from "../../store/uiSlice";
//TODO: отключить кнопки "далее", если сейчас играет радио
// radio france - http://icecast.radiofrance.fr/fip-midfi.mp3
//synth radio - http://77.51.212.205:8005/live192
//европа плюс - https://ep256.hostingradio.ru:8052/europaplus256.mp3
//казак фм - https://radio.mediacdn.ru/kazak_fm.mp3
//максимум - https://maximum.hostingradio.ru/maximum96.aacp
export const audio = createRef<HTMLAudioElement>();

const { Link } = Typography

export const Player = () => {
  const [progressBarPercent, setProgressBarPercent] = useState(0);
  const [progressCounter, setProgressCounter] = useState("00:00");
  const [duration, setDuration] = useState("00:00");
  const currentTrack = useAppSelector((state) => state.track.currentTrack);
  const playerData = useAppSelector((state) => state.player);

  const dispatch = useAppDispatch();

  const play = async (track: Track) => {
    await dispatch(setTrack(track));
    dispatch(playTrack());
  };

  //   useEffect(() => {
  //     if (!mounted.current) {
  //       mounted.current = true;
  //     } else {
  //       playTrack();
  //     }
  //   }, [currentTrack]);

  const prevTrack = async () => {
    let index = tracks.findIndex((el) => el.title === currentTrack?.title);
    await dispatch(
      setTrack(index === 0 ? tracks[tracks.length - 1] : tracks[index - 1])
    );
    play(index === 0 ? tracks[tracks.length - 1] : tracks[index - 1]);
  };

  const nextTrack = async () => {
    let index = tracks.findIndex((el) => el.title === currentTrack?.title);
    await dispatch(
      setTrack(index > tracks.length - 2 ? tracks[0] : tracks[index + 1])
    );
    play(index > tracks.length - 2 ? tracks[0] : tracks[index + 1]);
  };

  const progressBar = () => {
    const { duration, currentTime } = audio.current!;
    setProgressBarPercent((currentTime / duration) * 100);
  };

  //TODO: move to utils
  const formateTime = (minutes: number, seconds: number) => {
    return [
      minutes.toString().padStart(2, "0"),
      seconds.toString().padStart(2, "0"),
    ].join(":");
  };

  const counter = (e: any) => {
    let timestamp = e.target.currentTime;
    let minutes = Math.floor(timestamp / 60);
    let seconds = Math.floor(timestamp % 60);

    setProgressCounter(formateTime(minutes, seconds));
  };

  const rewindSong = (e: SyntheticEvent) => {
    const barWidth = 600;
    const clickX = (e.nativeEvent as PointerEvent).offsetX;
    const { duration } = audio.current!;

    audio.current!.currentTime = (clickX / barWidth) * duration;
  };

  const calculateDuration = (e: any) => {
    let duration = e.target.duration;

    let minutes = Math.floor(duration / 60);
    let seconds = Math.floor(duration % 60);
    if (isNaN(seconds)) {
      setDuration("∞");
    } else {
      setDuration(formateTime(minutes, seconds));
    }
  };

  //TODO: set to localStorage as user settings or player settings
  const changeVolume = async (volume: number) => {
    await dispatch(setVolume(volume));
  };

  const repeat = async () => {
    await dispatch(repeatTrack());
  };

  const shuffle = async () => {
    await dispatch(shuffleTrack());
  };

  const mute = async () => {
    await dispatch(muteTrack());
  };

  const openTrackInfo = async () => {
    await dispatch(setDrawerOpened());
  };

  return (
    <Row className="player-body" justify="space-between" align="middle">
      <Col span={4}>
        <audio
          ref={audio}
          src={currentTrack?.src}
          autoPlay={false}
          onEnded={nextTrack}
          onLoadedMetadata={calculateDuration}
          muted={playerData.muted}
          //TODO: add shuffle
          loop={playerData.looped}
          onTimeUpdate={(e) => {
            progressBar();
            counter(e);
          }}
        />
        {currentTrack && (
          <div className="track-info">
            <Row>
              <Col>
                <img
                  className="track-logo"
                  alt="logo"
                  src={currentTrack?.cover}
                />
              </Col>
              <Col className="player__track-info">
                <Row>
                  <Link className="track-title" onClick={openTrackInfo}>
                    {currentTrack.title}
                  </Link>
                </Row>
                <Row>
                  <Typography.Text className="track-singer">
                    {currentTrack.singerName}
                  </Typography.Text>
                </Row>
              </Col>
            </Row>
          </div>
        )}
      </Col>
      <Col span={16}>
        <Row className="player-controls" align="middle" justify="center">
          <button className="player-button" disabled={!currentTrack}>
            <img
              className={classNames("player-button__image", {
                "player-button--disabled": !currentTrack,
              })}
              alt="back"
              src={BackIcon}
              onClick={prevTrack}
            />
          </button>
          <PlayPause
            className={classNames({
              "player-button--disabled": !currentTrack,
            })}
            track={currentTrack}
            disabled={!currentTrack}
          />
          <button
            className="player-button"
            onClick={nextTrack}
            disabled={!currentTrack}
          >
            <img
              className={classNames("player-button__image", {
                "player-button--disabled": !currentTrack,
              })}
              alt="forward"
              src={ForwardIcon}
            />
          </button>
        </Row>
        <Row justify="center">
          <Space direction="vertical">
            <Row justify="space-between">
              <div className="time">{progressCounter}</div>
              <div className="time">{duration}</div>
            </Row>
            <div className="progressbar" onClick={rewindSong}>
              <div
                className="progress"
                style={{ width: progressBarPercent + "%" }}
              />
            </div>
          </Space>
        </Row>
      </Col>
      <Col span={4}>
        <Row align="middle" justify="end" className="track-controls">
          {/* //TODO: realize with backend */}
          <button className="player-button" onClick={shuffle}>
            <img
              alt="shuffle"
              src={playerData.shuffled ? NoShuffleIcon : ShuffleIcon}
            />
          </button>
          <button className="player-button" onClick={repeat}>
            <img
              alt="repeat"
              src={playerData.looped ? RepeatOneIcon : RepeatIcon}
            />
          </button>
          <button className="player-button" onClick={mute}>
            <img
              alt="volume-on"
              src={
                playerData.muted || playerData.volume === 0
                  ? VolumeOffIcon
                  : VolumeOnIcon
              }
            />
          </button>
          <input
            className="volume-range"
            type="range"
            id="myRange"
            min="0"
            max="1"
            step="0.01"
            value={playerData.volume}
            onChange={(event) => changeVolume(event.target.valueAsNumber)}
          />
        </Row>
      </Col>
    </Row>
  );
};
