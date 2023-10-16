import { useMemo, useState } from "react";
import { playlists } from "../../api/mocks";

import "./side-menu.scss";
import { radio_stations } from "../../constants";

export const SideMenu = () => {
  const [showPlaylists, setShowPlaylists] = useState<boolean>(true);

  const allPlaylists = useMemo(() => {
    return [
      {
        id: 1234,
        name: "Все песни",
      },
      {
        id: 2234,
        name: "Любимое",
      },
      ...playlists,
    ];
  }, []);

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
              <div key={playlist.id} className="side-menu__item">
                {playlist.name}
              </div>
            ))}
          </>
        ) : (
          <>
            {radio_stations.map((radio_station) => (
              <div key={radio_station.id} className="side-menu__item">
                {radio_station.name}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
