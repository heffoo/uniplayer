import { Layout, Row } from "antd";
import { Player } from "./components/player/Player";
import { Header } from "./components/header/Header";
import { SideMenu } from "./components/sidemenu/SideMenu";
import { Playlist } from "./components/playlist/Playlist";

import "./App.scss";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <Header />
        <Row style={{ minHeight: "calc(100vh - 18vh)" }}>
          <SideMenu />
          <Playlist />
        </Row>
        <Player />
      </Layout>
    </Provider>
  );
}

export default App;
