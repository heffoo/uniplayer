import React from "react";
import { Row, Col } from "antd";
import { Header as AntHeader } from "antd/es/layout/layout";

import "./header.scss";

export const Header = () => {
  return (
    <AntHeader className="header">
      <img
        className="header__logo"
        alt="Uniplayer"
        src=".\assets\uniplayer-logo.png"
      />
      <Col>User User</Col>
    </AntHeader>
  );
};
