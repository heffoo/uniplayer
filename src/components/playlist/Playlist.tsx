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
import {
  getTracksFromPlaylist,
  removeTrackFromPlaylist,
} from "../../api/playlists";
import { useCallback, useEffect, useMemo, useState } from "react";
import { setFavoritePlaylistTracks, setPlaylist, setTracksFromPlaylist } from "../../store/playlistSlice";
import { Playlist as PlaylistType, Track } from "../../types";
import { EditTrackModal } from "../EditTrackModal";
import { AddToFavorite } from "../AddToFavorite";

const { Title, Text } = Typography;
//добавить в плейлист, отредактировать, удалить
export const Playlist = () => {
  const [selectedTrack, setSelectedTrack] = useState("");
  const currentPlaylist = useAppSelector(
    (state) => state.playlist.currentPlaylist
  );
  const favoritePlaylistTracks = useAppSelector(
    (state) => state.playlist.favoritePlaylistTracks
  );

  const [editModalOpen, setEditModalOpen] = useState(false);

  const tracks = useAppSelector((state) => state.playlist.tracks);
  const playlists = useAppSelector((state) => state.playlist.allPlaylists);
  const dispatch = useAppDispatch();

  const setCurrentPlaylist = useCallback(
    async (playlist: PlaylistType) => {
      const { data } = await getTracksFromPlaylist(playlist.id);
      dispatch(setTracksFromPlaylist(data.items));

      dispatch(setPlaylist(playlist));
    },
    [dispatch]
  );

  const favoritePlaylistId = useMemo(
    () => playlists.find((playlist) => playlist.title === "Любимое")?.id || "",
    [playlists]
  );

  const getFavoritesTracks = useCallback(() => {
    favoritePlaylistId &&
      getTracksFromPlaylist(favoritePlaylistId).then((resp) =>{
        dispatch(setFavoritePlaylistTracks(resp.data.items))}
      );
  }, [dispatch, favoritePlaylistId]);

  useEffect(() => {
    getFavoritesTracks();
  }, [favoritePlaylistId, getFavoritesTracks]);

  useEffect(() => {
    !currentPlaylist && playlists.length && setCurrentPlaylist(playlists[0]);
  }, [currentPlaylist, playlists, playlists.length, setCurrentPlaylist]);

  const onDeleteTrack = async () => {
    currentPlaylist &&
      removeTrackFromPlaylist(currentPlaylist?.id, selectedTrack).then(() => {
        getTracksFromPlaylist(currentPlaylist?.id).then((resp) =>
          dispatch(setTracksFromPlaylist(resp.data.items))
        );
      });
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
      onClick: () => setEditModalOpen(true),
    },
    {
      label: "Удалить",
      key: "3",
      onClick: onDeleteTrack,
    },
  ];

  return (
    <div className="playlist-content">
      <Col offset={2}>
        <Title className="playlist-name" level={3}>
          {currentPlaylist?.title || playlists[0]?.title}
        </Title>
        <Col span={6}>
          <Divider className="playlist-divider" />
        </Col>
      </Col>
      <Col>
        {tracks.map((track) => (
          <Row key={track.id} justify="space-between" className="playlist-song">
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
              <Text className="playlist-song__button">{track.duration}</Text>
              <AddToFavorite
                trackId={track.id}
                favoritePlaylistTracks={favoritePlaylistTracks}
                favoritePlaylistId={favoritePlaylistId}
                getFavoritesTracks={getFavoritesTracks}
              />
              <Dropdown
                overlayClassName="settings-dropdown"
                menu={{ items }}
                onOpenChange={() => setSelectedTrack(track.id)}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <img
                    className="playlist-song__button"
                    alt="more"
                    src={MoreIcon}
                  />
                </a>
              </Dropdown>
              {selectedTrack === track.id && (
                <EditTrackModal
                  opened={editModalOpen}
                  setOpened={setEditModalOpen}
                  track={track}
                />
              )}
            </Row>
          </Row>
        ))}
      </Col>
    </div>
  );
};
