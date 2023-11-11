import { Col, Form, Input, Modal, Row, Typography, Upload } from "antd";
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
    >
      <Form layout="vertical" className="upload-track-form">
        <Col>
          <Row justify="space-between">
            <Col>
              <Form.Item label="Название">
                <Input className="upload-track-form__item" />
              </Form.Item>
              <Form.Item label="Исполнитель">
                <Input className="upload-track-form__item" />
              </Form.Item>
              <Form.Item label="Альбом">
                <Input className="upload-track-form__item" />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="Обложка">
                <Upload
                  className="upload-track-form__cover"
                  type="select"
                  listType="picture-card"
                  showUploadList={false}
                >
                  Upload
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
