import React, { useState } from "react";
import { Row, Col, MenuProps, Dropdown, Tooltip } from "antd";
import { Header as AntHeader } from "antd/es/layout/layout";

import "./header.scss";
import { UploadIcon } from "../../assets/icons";
import { UploadTrackModal } from "../UploadTrackModal";

export const Header = () => {
  const [isUploadTrackModalOpen, setIsUploadTrackModalOpen] = useState(false);
  const username = localStorage.getItem("username");
  const logOut = () => {
    localStorage.removeItem("isUserLogged");
    window.location.reload();
  };

  const items: MenuProps["items"] = [
    {
      label: "Выйти",
      key: "1",
      onClick: logOut,
    },
  ];

  return (
    <AntHeader className="header">
      <img
        className="header__logo"
        alt="Uniplayer"
        src=".\assets\uniplayer-logo.png"
      />
      <Row align="middle">
        <Tooltip title="Загрузить песню">
          <button
            className="upload-button"
            onClick={() => setIsUploadTrackModalOpen(true)}
          >
            <img alt="upload" src={UploadIcon} />
          </button>
        </Tooltip>
        <Dropdown overlayClassName="settings-dropdown" menu={{ items }}>
          <Col>{username || "usename"}</Col>
        </Dropdown>
      </Row>
      <UploadTrackModal
        opened={isUploadTrackModalOpen}
        setOpened={setIsUploadTrackModalOpen}
      />
    </AntHeader>
  );
};
