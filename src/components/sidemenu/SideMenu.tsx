import { useMemo, useState } from "react";
import { playlists, radio_stations } from "../../api/mocks";

import "./side-menu.scss";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Playlist, RadioStation } from "../../types";
import { Button, Row, Typography } from "antd";
import { setPlaylist } from "../../store/playlistSlice";
import classNames from "classnames";
import { playTrack, setTrack } from "../../store/trackSlice";

export const SideMenu = () => {
  const currentPlaylist = useAppSelector(
    (state) => state.playlist.currentPlaylist
  );
  const [showPlaylists, setShowPlaylists] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  const allPlaylists = useMemo(() => {
    return [
      {
        id: "1234",
        title: "Все песни",
        tracks: [],
      },
      {
        id: "2234",
        title: "Любимое",
        tracks: [],
      },
      ...playlists,
    ];
  }, []);

  const setCurrentPlaylist = (playlist: Playlist) => {
    dispatch(setPlaylist(playlist));
  };

  const setActivePlaylist = (playlist: Playlist) => {
    if (currentPlaylist) {
      return playlist.id === currentPlaylist?.id;
    }
    return playlist.title === "Все песни";
  };

  const playRadioStation = async (radio_station: RadioStation) => {
    await dispatch(setTrack(radio_station));
    dispatch(playTrack());
  };

  return (
    <div className="side-menu">
      <div className="side-menu__lists-buttons">
        <button
          className={`side-menu__list-button ${showPlaylists && "active"}`}
          onClick={() => setShowPlaylists(true)}
        >
          Плейлисты
        </button>
        <button
          className={`side-menu__list-button ${!showPlaylists && "active"}`}
          onClick={() => setShowPlaylists(false)}
        >
          Радио
        </button>
      </div>
      <div>
        {showPlaylists ? (
          <>
            {allPlaylists.map((playlist) => (
              <Row
                key={playlist.id}
                justify="center"
                className={classNames("side-menu__item", {
                  "side-menu__item--active": setActivePlaylist(playlist),
                })}
                onClick={() => setCurrentPlaylist(playlist)}
              >
                {playlist.title}
              </Row>
            ))}
          </>
        ) : (
          <>
            {radio_stations.map((radio_station) => (
              <Row
                key={radio_station.id}
                justify="center"
                className="side-menu__item"
                onClick={() => playRadioStation(radio_station)}
              >
                {radio_station.title}
              </Row>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
