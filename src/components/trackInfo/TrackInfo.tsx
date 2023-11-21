import { Col, Row } from "antd/es/grid";

import { useAppDispatch, useAppSelector } from "../../store/store";
import classNames from "classnames";
import { Divider, Space, Typography } from "antd";
import "./trackInfoBlock.scss";
import { AddToFavorite } from "../AddToFavorite";
import { useMemo, useCallback } from "react";
import { getTracksFromPlaylist } from "../../api/playlists";
import { setFavoritePlaylistTracks } from "../../store/playlistSlice";

const { Text } = Typography;

export const TrackInfoBlock = () => {
  const isDrawerOpened = useAppSelector((state) => state.ui.isDrawerOpened);
  const currentTrack = useAppSelector((state) => state.track.currentTrack);
  const playlists = useAppSelector((state) => state.playlist.allPlaylists);

  const dispatch = useAppDispatch();

  const favoritePlaylistTracks = useAppSelector(
    (state) => state.playlist.favoritePlaylistTracks
  );

  function secondsToTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

    return `${minutes}:${formattedSeconds}`;
  }

  const favoritePlaylistId = useMemo(
    () => playlists.find((playlist) => playlist.title === "Любимое")?.id || "",
    [playlists]
  );

  const getFavoritesTracks = useCallback(() => {
    favoritePlaylistId &&
      getTracksFromPlaylist(favoritePlaylistId).then((resp) =>
        dispatch(setFavoritePlaylistTracks(resp.data.items))
      );
  }, [dispatch, favoritePlaylistId]);

  const blockClass = isDrawerOpened ? "slide-in" : "slide-out";
  if (isDrawerOpened) {
    return (
      <Col span={5} className={classNames("track-info-block-col", blockClass)}>
        <Space
          className="track-info-drawer"
          direction="vertical"
          align="center"
        >
          <img
            className="track-info-drawer__cover"
            alt="img"
            src={
              currentTrack && "cover" in currentTrack
                ? `${currentTrack.cover}`
                : currentTrack?.coverFileId
                ? `http://localhost:3000/cover-files/${currentTrack.coverFileId}`
                : "./assets/No_cover.png"
            }
          />
          <Row className="track-info-drawer__singer">
            <Text ellipsis>{currentTrack?.singerName}</Text>
          </Row>
          <Row className="track-info-drawer__title">
            <Text ellipsis>{currentTrack?.title}</Text>
            {currentTrack && (
              <AddToFavorite
                trackId={currentTrack.id}
                favoritePlaylistTracks={favoritePlaylistTracks}
                favoritePlaylistId={favoritePlaylistId}
                getFavoritesTracks={getFavoritesTracks}
              />
            )}
          </Row>
          <Row className="track-info-drawer__album">
            <Text ellipsis>{currentTrack?.albumName}</Text>
          </Row>
          {currentTrack?.duration && (
            <Row className="track-info-drawer__duration">
              <Text>{secondsToTime(currentTrack.duration)}</Text>
            </Row>
          )}
          <Divider className="track-info-drawer__divider" />
        </Space>
      </Col>
    );
  }
  return <></>;
};
