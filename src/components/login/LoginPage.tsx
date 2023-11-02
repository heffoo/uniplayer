import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Space,
  Typography,
} from "antd";

import "./loginPage.scss";
import { useState } from "react";
import classNames from "classnames";

const { Text, Link } = Typography;

export const LoginPage = () => {
  const [authType, setAuthType] = useState<"register" | "auth">("register");

  const register = () => {
    return;
  };

  const login = () => {
    return;
  };

  return (
    <Col className="login-page">
      <Row justify="center" align="middle" className="login-page__row">
        <Space direction="vertical" size={24}>
          <Row justify="center">
            <img alt="Uniplayer" src=".\assets\uniplayer-logo.png" />
          </Row>
          <Col span={24}>
            <Row justify="center">
              <p className="welcome-text">
                Представьтесь, чтобы зарегистрироваться или авторизоваться в
                системе
              </p>
            </Row>
          </Col>
          <Row className="login-buttons-block">
            <Link
              className={classNames("login-button", {
                active: authType === "register",
              })}
              onClick={() => setAuthType("register")}
            >
              Регистрация
            </Link>
            <Divider className="login-divider" type="vertical" />
            <Link
              className={classNames("login-button", {
                active: authType === "auth",
              })}
              onClick={() => setAuthType("auth")}
            >
              Войти
            </Link>
          </Row>
          <Row justify="center">
            {authType === "register" ? (
              <Form name="register" layout="vertical" className="register-form">
                <Form.Item label="Логин" name="username">
                  <Input placeholder="Логин" />
                </Form.Item>
                <Form.Item label="Пароль" name="password">
                  <Input placeholder="Пароль" />
                </Form.Item>
                <Form.Item label="Повторите пароль" name="repeat-password">
                  <Input placeholder="Пароль" />
                </Form.Item>
              </Form>
            ) : (
              <Form name="auth" layout="vertical" className="login-form">
                <Form.Item label="Логин" name="username">
                  <Input placeholder="Логин" />
                </Form.Item>
                <Form.Item label="Пароль" name="password">
                  <Input placeholder="Пароль" />
                </Form.Item>
                <Row justify="center">
                  <Link className="forgot-password-link">Забыли пароль?</Link>
                </Row>
              </Form>
            )}
          </Row>
          <Row justify="center">
            <Button
              className="login-button"
              size="large"
              onClick={authType === "register" ? register : login}
            >
              {authType === "register" ? "Зарегистрироваться" : "Войти"}
            </Button>
          </Row>
        </Space>
      </Row>
    </Col>
  );
};
