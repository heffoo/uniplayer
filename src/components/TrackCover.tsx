import { Col } from "antd";

interface TrackCoverProps {
  coverFileId: string;
}

export const TrackCover = ({ coverFileId }: TrackCoverProps) => {
  return (
    <Col>
      <img
        className="track-logo"
        alt="logo"
        src={`http://localhost:3000/cover-files/${coverFileId}`}
      />
    </Col>
  );
};
