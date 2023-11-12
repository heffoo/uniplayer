import {
  Col,
  Divider,
  Dropdown,
  MenuProps,
  Row,
  Space,
  Typography,
} from "antd";
import "./playlist.scss";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { PlayPause } from "../shared/PlayPause";
import { HeartIcon, MoreIcon, PlusIcon } from "../../assets/icons";
import Link from "antd/es/typography/Link";
import { setDrawerOpened } from "../../store/uiSlice";

const { Title, Text } = Typography;
//добавить в плейлист, отредактировать, удалить
export const Playlist = () => {
  const dispatch = useAppDispatch();
  const currentPlaylist = useAppSelector(
    (state) => state.playlist.currentPlaylist
  );
  const tracks = useAppSelector((state) => state.playlist.tracks);
  {
    console.log(tracks);
  }

  const openTrackInfo = async () => {
    await dispatch(setDrawerOpened());
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <Space align="center">
          Добавить в плейлист{" "}
          <img className="add-to-playlist-icon" alt="add" src={PlusIcon}></img>
        </Space>
      ),
      key: "0",
    },
    {
      label: "Редактировать",
      key: "1",
    },
    {
      label: "Удалить",
      key: "3",
    },
  ];

  return (
    <div className="playlist-content">
      <Col offset={2}>
        <Title className="playlist-name" level={3}>
          {currentPlaylist?.title || "Все песни"}
        </Title>
        <Col span={6}>
          <Divider className="playlist-divider" />
        </Col>
      </Col>
      <Col>
        {tracks.map((track) => (
          <Row
            key={track.title}
            justify="space-between"
            className="playlist-song"
          >
            <Row>
              <PlayPause className="playlist-song__play-pause" track={track} />
              <Col>
                <Row>
                  {/* <Link
                    className="playlist-song__title"
                    onClick={openTrackInfo}
                  >
                    {track.title}
                  </Link> */}
                  <Text className="playlist-song__title">{track.title}</Text>
                </Row>
                <Text className="playlist-song__singer">
                  {track.singerName}
                </Text>
              </Col>
            </Row>
            <Row align="middle" justify="space-around">
              {/* //TODO: change with backend */}
              <Text className="playlist-song__button">3:35</Text>
              <img
                className="playlist-song__button"
                alt="like"
                src={HeartIcon}
              />
              <Dropdown overlayClassName="settings-dropdown" menu={{ items }}>
                <a onClick={(e) => e.preventDefault()}>
                  <img
                    className="playlist-song__button"
                    alt="more"
                    src={MoreIcon}
                  />
                </a>
              </Dropdown>
            </Row>
          </Row>
        ))}
      </Col>
    </div>
  );
};
