import { Col, Form, Input, Modal, Row, Typography, Upload } from "antd";
import { UploadIcon } from "../assets/icons";

import "./upload-track-modal.scss";

interface UploadTrackModalProps {
  opened: boolean;
  setOpened: (opened: boolean) => void;
}

const { Text } = Typography;

export const UploadTrackModal = ({
  opened,
  setOpened,
}: UploadTrackModalProps) => {
  const upload = () => {};

  return (
    <Modal
      width={600}
      className="upload-track-modal"
      title="Загрузка трека"
      open={opened}
      destroyOnClose
      okText="Загрузить"
      cancelText="Отмена"
      onCancel={() => setOpened(!opened)}
      onOk={upload}
      okButtonProps={{ style: { backgroundColor: "#d993618f" } }}
    >
      <Form layout="vertical" className="upload-track-form">
        <Col>
          <Row justify="space-between">
            <Col>
              <Form.Item className="upload-track-form__item" label="Название">
                <Input className="upload-track-form__input" />
              </Form.Item>
              <Form.Item
                className="upload-track-form__item"
                label="Исполнитель"
              >
                <Input className="upload-track-form__input" />
              </Form.Item>
              <Form.Item className="upload-track-form__item" label="Альбом">
                <Input className="upload-track-form__input" />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item className="upload-track-form__item" label="Обложка">
                <Upload
                  className="upload-track-form__cover"
                  type="select"
                  listType="picture-card"
                  showUploadList={false}
                >
                  <img alt="upload" src={UploadIcon} />
                </Upload>
              </Form.Item>
            </Col>
          </Row>
          <Upload type="drag">
            <Text className="drag-text">Нажмите</Text> или перетащите аудиофайл,
            чтобы загрузить
          </Upload>
        </Col>
      </Form>
    </Modal>
  );
};
