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
  uploadCoverFile,
  uploadTrack,
  uploadTrackFile,
} from "../api/tracks";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { Track } from "../types";
import { useAppSelector } from "../store/store";

interface UploadTrackModalProps {
  opened: boolean;
  setOpened: (opened: boolean) => void;
}

const { Text } = Typography;

export const UploadTrackModal = ({
  opened,
  setOpened,
}: UploadTrackModalProps) => {
  const [form] = useForm();
  const [trackFileId, setTrackFileId] = useState("");
  const [trackDefaultName, setTrackDefaultName] = useState("");
  const [uploadedPicture, setUploadedPicture] = useState<any>(null);
  const [pictureId, setPictureId] = useState<any>(null);
  const [duration, setDuration] = useState<number>(0);

  const upload = async () => {
    form.validateFields();
    const formValues = form.getFieldsValue();
    try {
      await uploadTrackFile({
        title: formValues.title,
        singerName: formValues.singerName,
        duration: Math.floor(duration),
        albumName: formValues.album,
        trackFileId: trackFileId,
        coverFileId: pictureId,
      });
      setOpened(false);
      resetModalFields();
      window.location.reload();
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
  };

  const onCoverUpload: UploadProps["onChange"] = async (
    info: UploadChangeParam<UploadFile>
  ) => {
    const formData = new FormData();
    formData.append("file", info.file.originFileObj as RcFile);
    const uploadedCover = await uploadCoverFile(formData);
    setPictureId(uploadedCover.data.id);
  };

  function dataURLtoFile(dataurl: any, filename = "file.jpeg") {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[arr.length - 1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  const onUploadTrack = async (track: any) => {
    setTrackDefaultName(track.file.name);
    const formData = new FormData();
    formData.append("file", track.file.originFileObj);

    const uploadedTrack = await uploadTrack(formData);
    const trackMeta = await getTrackMeta(uploadedTrack.data.id);
    setTrackFileId(uploadedTrack.data.id);
    form.setFieldValue("singerName", trackMeta.data.artist);
    form.setFieldValue("title", trackMeta.data.title);
    form.setFieldValue("album", trackMeta.data.album);
    trackMeta.data.duration && setDuration(trackMeta.data.duration);
    !!trackMeta.data.picture && setUploadedPicture(trackMeta.data.picture);
    if (!pictureId && trackMeta.data.picture) {
      const coverFormData = new FormData();
      const coverData = dataURLtoFile(
        `data:image/png;base64, ${trackMeta.data.picture}`
      );
      coverFormData.append("file", coverData);
      const uploadedCover = await uploadCoverFile(coverFormData);
      setPictureId(uploadedCover.data.id);
    }
  };

  const resetModalFields = () => {
    form.resetFields();
    setUploadedPicture(null);
    setTrackFileId("");
    setPictureId("");
    setOpened(!opened);
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
      onCancel={resetModalFields}
      onOk={upload}
      okButtonProps={{
        style: { backgroundColor: "#d993618f" },
        disabled: !trackFileId,
      }}
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
                <Input className="upload-track-form__input" />
              </Form.Item>
              <Form.Item
                className="upload-track-form__item"
                label="Исполнитель"
                name="singerName"
                rules={[{ required: true, message: "Введите имя исполнителя" }]}
                validateTrigger="onBlur"
              >
                <Input className="upload-track-form__input" />
              </Form.Item>
              <Form.Item
                className="upload-track-form__item"
                label="Альбом"
                name="album"
              >
                <Input className="upload-track-form__input" />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                className="upload-track-form__item"
                label="Обложка"
                name="picture"
              >
                {uploadedPicture || pictureId ? (
                  <img
                    className="upload-track-picture"
                    alt="upload"
                    src={
                      uploadedPicture
                        ? `data:image/png;base64, ${uploadedPicture}`
                        : pictureId &&
                          `http://localhost:3000/cover-files/${pictureId}`
                    }
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

          {trackFileId ? (
            <p style={{ color: "white" }}>{trackDefaultName}</p>
          ) : (
            <Upload
              type="drag"
              onChange={onUploadTrack}
              accept="audio/mp3"
              showUploadList={false}
              maxCount={1}
            >
              <Text className="drag-text">Нажмите</Text> или перетащите
              аудиофайл, чтобы загрузить
            </Upload>
          )}
        </Col>
      </Form>
    </Modal>
  );
};
