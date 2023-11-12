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
import { loginUser, me, registerUser } from "../../api/login";
import { useForm } from "antd/es/form/Form";

const { Link } = Typography;

export const LoginPage = () => {
  const [authType, setAuthType] = useState<"register" | "auth">("register");
  const [passwordIsDifferent, setPasswordIsDifferent] = useState(false);
  const [form] = useForm();

  const register = () => {
    const formValues = form.getFieldsValue();
    if (formValues.password === formValues.repeat_password) {
      passwordIsDifferent && setPasswordIsDifferent(false);
      registerUser({
        username: formValues.username,
        password: formValues.password,
      })
        .then(() => localStorage.setItem("isUserLogged", "true"))
        .then(setUserName)
        .then(() => window.location.reload());
    } else {
      setPasswordIsDifferent(true);
    }
  };

  const setUserName = () => {
    me().then((resp) => console.log("me, resp"));
  };

  const login = () => {
    const formValues = form.getFieldsValue();

    loginUser({
      username: formValues.username,
      password: formValues.password,
    })
      .then(setUserName)
      .then(() => localStorage.setItem("isUserLogged", "true"))
      .then(() => window.location.reload());
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
              <Form
                form={form}
                name="register"
                layout="vertical"
                className="register-form"
              >
                <Form.Item label="Логин" name="username">
                  <Input placeholder="Логин" />
                </Form.Item>
                <Form.Item label="Пароль" name="password">
                  <Input placeholder="Пароль" type="password" />
                </Form.Item>
                <Form.Item
                  label="Повторите пароль"
                  name="repeat_password"
                  validateStatus={passwordIsDifferent ? "error" : ""}
                  hasFeedback
                  help={passwordIsDifferent && "Пароли не совпадают"}
                >
                  <Input placeholder="Пароль" type="password" />
                </Form.Item>
              </Form>
            ) : (
              <Form
                form={form}
                name="auth"
                layout="vertical"
                className="login-form"
              >
                <Form.Item label="Логин" name="username">
                  <Input placeholder="Логин" />
                </Form.Item>
                <Form.Item label="Пароль" name="password">
                  <Input placeholder="Пароль" />
                </Form.Item>
                {/* <Row justify="center">
                  <Link className="forgot-password-link">Забыли пароль?</Link>
                </Row> */}
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
