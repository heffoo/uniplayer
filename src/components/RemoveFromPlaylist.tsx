import { Checkbox, Col, Modal, Row } from "antd";
import "./upload-track-modal.scss";
import { useAppSelector } from "../store/store";
import { Track } from "../types";
import { addTrackToPlaylist, removeTrackFromPlaylist } from "../api/playlists";
import { useCallback, useEffect, useState } from "react";

interface RemoveFromPlaylistModalProps {
  opened: boolean;
  setOpened: (opened: boolean) => void;
  track: Track;
}

export const RemoveFromPlaylistModal = ({
  opened,
  setOpened,
  track,
}: RemoveFromPlaylistModalProps) => {
  const playlists = useAppSelector(
    (state) => state.playlist.allPlaylists
  ).slice(1);

  const onCancel = () => {
    setOpened(false);
  };

  const onPlaylistSelect = async (playlistId: string) => {
    await removeTrackFromPlaylist(playlistId, track.id);
  };

  const newArr = track.playlistIds.map((id) => {
    const targetObj = playlists.find((obj) => obj.id === id);
    console.log("targetObj", targetObj)
    return targetObj ? { id: String(id), title: targetObj.title } : null;
  });
  // .filter(Boolean);

  return (
    <Modal
      width={600}
      className="upload-track-modal"
      title="Удалить из плейлиста"
      open={opened}
      destroyOnClose
      okText="Готово"
      cancelText="Отмена"
      onCancel={onCancel}
      onOk={onCancel}
    >
      <Col span={24}>
        {newArr.length &&
          newArr.map((playlist) => (
            <Row key={playlist?.id}>
              <Checkbox
                className="checkbox"
                onChange={() => console.log(newArr)}
              >
                {playlist?.title}
              </Checkbox>
            </Row>
          ))}
      </Col>
    </Modal>
  );
};
