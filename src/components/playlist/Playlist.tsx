import { Button, Col, Divider, Row, Typography } from "antd";
import { tracks } from "../../api/mocks";
import "./playlist.scss";
import { PauseIcon, PlayIcon } from "../../assets/icons";
import { audio } from "../player/Player";
import { playTrack } from "../../store/trackSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { PlayPause } from "../shared/PlayPause";

const { Text } = Typography;

export const Playlist = () => {
  const dispatch = useAppDispatch();
  const track = useAppSelector((state) => state.track.currentTrack);

  const play = async () => {
    await dispatch(playTrack());
  };

  return (
    <div className="playlist-content">
      <Text className="playlist-name">Плейлист 1</Text>
      <Divider className="playlist-divider" />
      <Col>
        {tracks.map((track) => (
          <Row key={track.title} className="playlist-song">
            <PlayPause track={track} />
            <Col>
              <Row>
                <Text className="playlist-song__title">{track.title}</Text>
              </Row>
              <Text className="playlist-song__singer">{track.singerName}</Text>
            </Col>
          </Row>
        ))}
      </Col>
    </div>
  );
};
