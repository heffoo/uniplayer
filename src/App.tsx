import { Layout, Row } from "antd";
import { Player } from "./components/player/Player";
import { Header } from "./components/header/Header";
import { SideMenu } from "./components/sidemenu/SideMenu";
import { Playlist } from "./components/playlist/Playlist";

import "./App.scss";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { useState } from "react";
import { LoginPage } from "./components/login/LoginPage";

function App() {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  return (
    <Provider store={store}>
      {isLogin && (
        <Layout>
          <Header />
          <Row style={{ minHeight: "calc(100vh - 18vh)" }}>
            <SideMenu />
            <Playlist />
          </Row>
          <Player />
          <button onClick={() => setIsLogin(false)}></button>
        </Layout>
      )}
      {!isLogin && <LoginPage />}
    </Provider>
  );
}

export default App;
