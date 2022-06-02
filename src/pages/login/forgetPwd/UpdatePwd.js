import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import "./UpdatePwd.css";
import Navbar from "../../../components/Navbar";
import { useLocation } from "react-router";
import axios from "axios";
import { useNavigate } from "react-router";

const UpdatePwd = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const pwdValidator = (pwd) => {
    const str = pwd;
    if (
      str.match(/[0-9]/g) &&
      str.match(/[A-Z]/g) &&
      str.match(/[a-z]/g) &&
      str.match(/[^a-zA-Z\d]/g) &&
      str.length >= 8
    )
      return true;
    else return false;
  };
  const onFinish = (values) => {
    console.log(values.password);
    let data = {
      email: location.state.email,
      password: values.password,
      c_password: values.c_password,
    };
    axios
      .put(
        `http://localhost:8000/api/employe/resetForgetPwd/${location.state.code}`,
        data
      )
      .then((response) => {
        if (response.data.message === "success") {
          localStorage.setItem("token", response.data.token);
          navigate("/profile");
        } else {
          alert("Invalide code");
        }
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="updatePwdPage">
      <div className="updatePwd">
        <h3>Reset your password</h3>
        <Form
          className="updatePwdForm"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!pwdValidator(value)) {
                    return Promise.reject(new Error("Invalide password !"));
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input.Password className="inp" placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="c_password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password className="inp" placeholder="Confirm Password" />
          </Form.Item>

          <Button className="updatePwdFormBtn" type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default UpdatePwd;
