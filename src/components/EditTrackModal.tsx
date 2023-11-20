import {
  Col,
  Form,
  Input,
  Modal,
  Row,
  Typography,
  Upload,
  UploadProps,
  message,
} from "antd";
import { UploadIcon } from "../assets/icons";

import "./upload-track-modal.scss";
import { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";
import {
  getTrackMeta,
  updateTrack,
  uploadCoverFile,
  uploadTrack,
  uploadTrackFile,
} from "../api/tracks";
import { useCallback, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  addTrackToPlaylist as addTrackToPlaylistRequest,
  getTracksFromPlaylist,
} from "../api/playlists";
import { Track } from "../types";
import { setTracksFromPlaylist } from "../store/playlistSlice";

interface EditTrackModalProps {
  opened: boolean;
  setOpened: (opened: boolean) => void;
  track: Track;
}

export const EditTrackModal = ({
  opened,
  setOpened,
  track,
}: EditTrackModalProps) => {
  const [form] = useForm();
  const [uploadedPictureId, setUploadedPictureId] = useState<any>();
  const dispatch = useAppDispatch();

  const currentPlaylist = useAppSelector(
    (state) => state.playlist.currentPlaylist
  );

  const editTrack = useCallback(async () => {
    const formValues = form.getFieldsValue();
    try {
      await updateTrack(track.id, formValues);
      currentPlaylist &&
        getTracksFromPlaylist(currentPlaylist?.id).then((resp) =>
          dispatch(setTracksFromPlaylist(resp.data.items))
        );

      setOpened(!opened);
    } catch (e) {
      if (!formValues.title) {
        message.error("Введите название песни");
      }
      if (!formValues.singerName) {
        message.error("Введите название исполнителя");
      } else {
        message.error("Возникла ошибка, попробуйте еще раз");
      }
    }
  }, [currentPlaylist, dispatch, form, opened, setOpened, track.id]);

  const resetModalFields = () => {
    form.resetFields();
  };

  const onCancel = () => {
    resetModalFields();
    setOpened(!opened);
  };

  const onCoverUpload: UploadProps["onChange"] = async (
    info: UploadChangeParam<UploadFile>
  ) => {
    const formData = new FormData();
    formData.append("file", info.file.originFileObj as RcFile);
    const uploadedCover = await uploadCoverFile(formData);
    setUploadedPictureId(uploadedCover.data.id);
  };

  return (
    <Modal
      width={600}
      className="upload-track-modal"
      title="Загрузка трека"
      open={opened}
      destroyOnClose
      okText="Загрузить"
      cancelText="Отмена"
      onCancel={onCancel}
      onOk={editTrack}
    >
      <Form form={form} layout="vertical" className="upload-track-form">
        <Col>
          <Row justify="space-between">
            <Col>
              <Form.Item
                className="upload-track-form__item"
                label="Название"
                name="title"
                rules={[{ required: true, message: "Введите название песни" }]}
                validateTrigger="onBlur"
              >
                <Input
                  className="upload-track-form__input"
                  defaultValue={track.title}
                />
              </Form.Item>
              <Form.Item
                className="upload-track-form__item"
                label="Исполнитель"
                name="singerName"
                rules={[{ required: true, message: "Введите имя исполнителя" }]}
                validateTrigger="onBlur"
              >
                <Input
                  className="upload-track-form__input"
                  defaultValue={track.singerName}
                />
              </Form.Item>
              <Form.Item
                className="upload-track-form__item"
                label="Альбом"
                name="album"
              >
                <Input
                  className="upload-track-form__input"
                  defaultValue={track.albumName}
                />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                className="upload-track-form__item"
                label="Обложка"
                name="picture"
              >
                {track.coverFileId || uploadedPictureId ? (
                  <img
                    className="upload-track-picture"
                    alt="upload"
                    src={`http://localhost:3000/cover-files/${
                      track.coverFileId || uploadedPictureId
                    }`}
                  />
                ) : (
                  <Upload
                    className="upload-track-form__cover"
                    type="select"
                    listType="picture-card"
                    showUploadList={false}
                    onChange={onCoverUpload}
                  >
                    <img alt="upload" src={UploadIcon} />
                  </Upload>
                )}
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Form>
    </Modal>
  );
};
