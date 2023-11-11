import { Layout, Row } from "antd";
import { Player } from "./components/player/Player";
import { Header } from "./components/header/Header";
import { SideMenu } from "./components/sidemenu/SideMenu";
import { Playlist } from "./components/playlist/Playlist";

import "./App.scss";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { LoginPage } from "./components/login/LoginPage";
import { TrackInfoBlock } from "./components/trackInfo/TrackInfo";

function App() {
  const isUserLogged = localStorage.getItem("isUserLogged");

  return (
    <Provider store={store}>
      <Layout>
        {isUserLogged ? (
          <>
            <Header />
            <Row style={{ minHeight: "calc(100vh - 18vh)" }}>
              <SideMenu />
              <Playlist />
              <TrackInfoBlock />
            </Row>
            <Player />
          </>
        ) : (
          <LoginPage />
        )}
      </Layout>
    </Provider>
  );
}

export default App;
