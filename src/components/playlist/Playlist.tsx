import { Col, Divider, Dropdown, MenuProps, Row, Space, Typography } from "antd";
import { tracks } from "../../api/mocks";
import "./playlist.scss";
import { useAppSelector } from "../../store/store";
import { PlayPause } from "../shared/PlayPause";
import { HeartIcon, MoreIcon, PlusIcon } from "../../assets/icons";

const { Title, Text } = Typography;
//добавить в плейлист, отредактировать, удалить
export const Playlist = () => {
  const currentPlaylist = useAppSelector(
    (state) => state.playlist.currentPlaylist
  );

  const items: MenuProps["items"] = [
    {
      label: (
        <Space align="center">
          Добавить в плейлист <img className="add-to-playlist-icon" alt="add" src={PlusIcon}></img>
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
      <Title className="playlist-name" level={3}>
        {currentPlaylist?.title || "Все песни"}
      </Title>
      <Divider className="playlist-divider" />
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
