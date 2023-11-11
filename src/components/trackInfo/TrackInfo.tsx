import { Col, Row } from "antd/es/grid";

import { useAppSelector } from "../../store/store";
import classNames from "classnames";
import { Divider, Space } from "antd";
import "./trackInfoBlock.scss";


export const TrackInfoBlock = () => {
  const isDrawerOpened = useAppSelector((state) => state.ui.isDrawerOpened);
  const currentTrack = useAppSelector((state) => state.track.currentTrack);

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
            src={currentTrack?.cover}
          ></img>
          <Row className="track-info-drawer__singer">
            {currentTrack?.singerName}
          </Row>
          <Row className="track-info-drawer__title">{currentTrack?.title}</Row>
          <Row className="track-info-drawer__album">
            {currentTrack?.albumName}
          </Row>
          <Row className="track-info-drawer__duration">3:35</Row>
          <Divider className="track-info-drawer__divider" />
        </Space>
      </Col>
    );
  }
  return <></>;
};
