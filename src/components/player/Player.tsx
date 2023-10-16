import { Col, Row, Space, Typography } from "antd";

import { createRef, useCallback, useEffect, useRef, useState } from "react";
import { tracks } from "../../api/mocks";
import {
  StepBackwardOutlined,
  PlayCircleOutlined,
  PauseOutlined,
  StepForwardOutlined,
} from "@ant-design/icons";

import "./player.scss";
import {
  BackIcon,
  ForwardIcon,
  PauseIcon,
  PlayIcon,
  RepeatIcon,
  ShuffleIcon,
  VolumeOnIcon,
} from "../../assets/icons";
import { playTrack, pauseTrack, setTrack } from "../../store/trackSlice";
import { useAppDispatch } from "../../store/store";
import { PlayPause } from "../shared/PlayPause";

// radio france - http://icecast.radiofrance.fr/fip-midfi.mp3
//synth radio - http://77.51.212.205:8005/live192
//европа плюс - https://ep256.hostingradio.ru:8052/europaplus256.mp3
//казак фм - https://radio.mediacdn.ru/kazak_fm.mp3
//максимум - https://maximum.hostingradio.ru/maximum96.aacp
export const audio = createRef<HTMLAudioElement>();

export const Player = () => {
  const [currentTrack, setCurrentTrack] = useState(tracks[4]);
  const [isTrackPlaying, setIsTrackPlaying] = useState<boolean>(false);
  const [progressBarPercent, setProgressBarPercent] = useState(0);
  const [progressCounter, setProgressCounter] = useState("00:00");
  const [duration, setDuration] = useState("00:00");

  const dispatch = useAppDispatch();

  const play = async () => {
    setIsTrackPlaying(true);
    await dispatch(playTrack());
    dispatch(setTrack(currentTrack));
  };

  const pause = async () => {
    setIsTrackPlaying(false);
    await dispatch(pauseTrack());
  };

  //   useEffect(() => {
  //     if (!mounted.current) {
  //       mounted.current = true;
  //     } else {
  //       playTrack();
  //     }
  //   }, [currentTrack]);

  const prevTrack = () => {
    let index = tracks.findIndex((el) => el.title === currentTrack.title);
    setCurrentTrack(
      index === 0 ? tracks[tracks.length - 1] : tracks[index - 1]
    );
    console.log(index === 0 ? tracks[tracks.length - 1] : tracks[index - 1]);
    audio.current?.load();
  };

  const nextTrack = () => {
    let index = tracks.findIndex((el) => el.title === currentTrack.title);
    setCurrentTrack(index > tracks.length - 2 ? tracks[0] : tracks[index + 1]);

    audio.current?.load();
    playTrack();
  };

  const progressBar = () => {
    const { duration, currentTime } = audio.current!;
    setProgressBarPercent((currentTime / duration) * 100);
  };

  return (
    <Row className="player-body" justify="space-between" align="middle">
      <audio ref={audio} src={currentTrack.src} autoPlay={false} />
      <div className="track-info">
        <Row>
          <Col>
            <img className="track-logo" alt="logo" src={currentTrack.cover} />
          </Col>
          <Col className="player__track-info">
            <Row>
              <Typography.Text className="track-title">
                {currentTrack.title}
              </Typography.Text>
            </Row>
            <Row>
              <Typography.Text className="track-singer">
                {currentTrack.singerName}
              </Typography.Text>
            </Row>
          </Col>
        </Row>
      </div>
      <Row className="player-controls" align="middle">
        <button className="player-button">
          <img alt="back" src={BackIcon} />
        </button>
        {/* TODO: change to PlayPause */}
        <PlayPause track={currentTrack}/>
        <button className="player-button">
          <img alt="forward" src={ForwardIcon} />
        </button>
      </Row>
      <Row align="middle" className="track-controls">
        <button className="player-button">
          <img alt="repeat" src={RepeatIcon} />
        </button>
        <button className="player-button">
          <img alt="shuffle" src={ShuffleIcon} />
        </button>
        <button className="player-button">
          <img alt="volume-on" src={VolumeOnIcon} />
        </button>
      </Row>
    </Row>
  );
};
