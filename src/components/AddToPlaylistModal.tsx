import { Checkbox, Col, Modal, Row } from "antd";
import "./upload-track-modal.scss";
import { useAppSelector } from "../store/store";
import { Track } from "../types";
import { addTrackToPlaylist } from "../api/playlists";
import { useCallback, useEffect, useState } from "react";

interface AddToPlaylistModalProps {
  opened: boolean;
  setOpened: (opened: boolean) => void;
  track: Track;
}

export const AddToPlaylistModal = ({
  opened,
  setOpened,
  track,
}: AddToPlaylistModalProps) => {
  const [checkedPlaylists, setCheckedPlaylists] = useState<any[]>();
  const playlists = useAppSelector(
    (state) => state.playlist.allPlaylists
  ).slice(1);

  const onCancel = () => {
    setOpened(false);
  };

  const addChecked = useCallback(() => {
    setCheckedPlaylists((prevPlaylists) => {
      const newCheckedPlaylists = playlists.filter((obj) =>
        track.playlistIds.includes(obj.id)
      );

      // Сравниваем массивы для избежания лишних перерисовок
      if (
        JSON.stringify(newCheckedPlaylists) !== JSON.stringify(prevPlaylists)
      ) {
        return newCheckedPlaylists;
      }

      return prevPlaylists;
    });
  }, [playlists, track.playlistIds]);

  useEffect(() => {
    addChecked();
  }, [addChecked]);

  const onPlaylistSelect = async (playlistId: string) => {
    await addTrackToPlaylist(playlistId, track.id);
  };

  return (
    <Modal
      width={600}
      className="upload-track-modal"
      title="Добавить в плейлист"
      open={opened}
      destroyOnClose
      okText="Готово"
      cancelText="Отмена"
      onCancel={onCancel}
      onOk={onCancel}
    >
      <Col span={24}>
        {playlists.map((playlist) => (
          <Row key={playlist.id}>
            <Checkbox
              className="checkbox"
              defaultChecked={checkedPlaylists?.some(
                (checkedPlaylist) => checkedPlaylist.id === playlist.id
              )}
              onChange={() => onPlaylistSelect(playlist.id)}
            >
              {playlist.title}
            </Checkbox>
          </Row>
        ))}
      </Col>
    </Modal>
  );
};
