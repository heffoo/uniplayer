import {
  useMemo,
  useState,
  KeyboardEvent,
  useEffect,
  useCallback,
} from "react";
import { radio_stations } from "../../api/mocks";

import "./side-menu.scss";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Playlist, RadioStation } from "../../types";
import { Col, Row } from "antd";
import { setPlaylist, setPlaylists, setTracksFromPlaylist } from "../../store/playlistSlice";
import classNames from "classnames";
import { playTrack, setTrack } from "../../store/trackSlice";
import { BinIcon, PlusIcon } from "../../assets/icons";
import {
  createPlaylist,
  deletePlaylist,
  getPlaylists,
  getTracksFromPlaylist,
  updatePlaylist,
} from "../../api/playlists";
import { setRadioIsPlaying } from "../../store/uiSlice";

export const SideMenu = () => {
  const currentPlaylist = useAppSelector(
    (state) => state.playlist.currentPlaylist
  );
  const playlists = useAppSelector((state) => state.playlist.allPlaylists);

  const [pagination] = useState({ offset: 0, limit: 100 });
  const [showPlaylists, setShowPlaylists] = useState<boolean>(true);
  const [isPlaylistCreating, setPlaylistCreating] = useState(false);
  // const [playlists, setAllPlaylists] = useState<Playlist[]>([]);
  const [editingPlaylist, setEditingPlaylist] = useState("");
  const [hoveringPlaylist, setHoveringPlaylist] = useState("");
  const dispatch = useAppDispatch();

  const getAllPlaylists = useCallback(async () => {
    const { data } = await getPlaylists(pagination);
    dispatch(setPlaylists(data.items));
    // setAllPlaylists(data.items);
  }, [dispatch, pagination]);

  useEffect(() => {
    getAllPlaylists();
  }, [getAllPlaylists]);

  const setCurrentPlaylist = useCallback(
    (playlist: Playlist) => {
      getTracksFromPlaylist(playlist.id).then((resp) =>
        dispatch(setTracksFromPlaylist(resp.data.items))
      );
      dispatch(setPlaylist(playlist));
    },
    [dispatch]
  );

  const setActivePlaylist = (playlist: Playlist) => {
    if (currentPlaylist) {
      return playlist.id === currentPlaylist?.id;
    }
    return playlist.title === "Все песни";
  };

  const create = useCallback(
    (title: string) => {
      setPlaylistCreating(false);
      createPlaylist(title).then(getAllPlaylists);
    },
    [getAllPlaylists]
  );

  const update = useCallback(
    (id: string, title: string) => {
      setEditingPlaylist("");
      updatePlaylist(id, title).then(getAllPlaylists);
    },
    [getAllPlaylists]
  );

  const playRadioStation = useCallback(async (radio_station: RadioStation) => {
    await dispatch(setTrack(radio_station));
    dispatch(playTrack("radio"));
    dispatch(setRadioIsPlaying());
  }, [dispatch]);

  const removePlaylist = useCallback((id: string) => {
    deletePlaylist(id).then(getAllPlaylists);
  },[getAllPlaylists]);

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
            {playlists.map((playlist) => (
              <Row
                key={playlist.id}
                justify="center"
                className={classNames("side-menu__item", {
                  "side-menu__item--active": setActivePlaylist(playlist),
                })}
                onClick={() => setCurrentPlaylist(playlist)}
                onMouseOver={() => setHoveringPlaylist(playlist.id)}
                onMouseLeave={() => setHoveringPlaylist('')}
              >
                <span onDoubleClick={() => setEditingPlaylist(playlist.id)}>
                  {editingPlaylist === playlist.id ? (
                    <input
                      className="add-playlist-input"
                      defaultValue={playlist.title}
                      onKeyDown={(event: KeyboardEvent<HTMLInputElement>) =>
                        event.code === "Enter" &&
                        update(playlist.id, event.currentTarget.value)
                      }
                    />
                  ) : (
                    playlist.title
                  )}
                </span>
                {hoveringPlaylist === playlist.id && (
                  <Row justify="space-around">
                    <button
                      className="delete-playlist-button"
                      onClick={() => removePlaylist(playlist.id)}
                    />
                    <img className="bin-icon" alt="bin" src={BinIcon} />
                  </Row>
                )}
              </Row>
            ))}
            <Row justify="center">
              {isPlaylistCreating ? (
                <input
                  className="add-playlist-input"
                  onKeyDown={(event: KeyboardEvent<HTMLInputElement>) =>
                    event.code === "Enter" && create(event.currentTarget.value)
                  }
                />
              ) : (
                <button
                  className="add-playlist-button"
                  onClick={() => setPlaylistCreating(true)}
                >
                  <img alt="add" src={PlusIcon} />
                </button>
              )}
            </Row>
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
