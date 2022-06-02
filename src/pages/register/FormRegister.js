import React from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, notification } from "antd";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import "./FormRegister.css";
import axios from "axios";
import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";

const FormRegister = ({ form, setx, setCurrent }) => {
  let navigate = useNavigate();
  const openNotification = () => {
    notification.open({
      message: "Email already used!",
      placement: "top",
      duration: 3,
    });
  };
  const onFinish = (values) => {
    setx(values);
    axios
      .get(`http://localhost:8000/api/employe/confirmAcc`, {
        params: {
          email: values.email,
        },
      })
      .then((res) => {
        console.log(res.data);
        setCurrent(1);
      })
      .catch(() => {
        openNotification();
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

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
  const phoneValidator = (number) => {
    if (number > 9999999 && number <= 99999999) return true;
    else return false;
  };

  const responseGoogle = (response) => {
    console.log(response.profileObj);
    let data = {
      email: response.profileObj.email,
      lastName: response.profileObj.familyName,
      firstName: response.profileObj.givenName,
      photo: response.profileObj.imageUrl,
    };
    axios
      .post(`http://localhost:8000/api/login/google`, data)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user_id", response.data.user_id);
          localStorage.setItem("role", response.data.role);
          localStorage.setItem("verifier", response.data.email_verified_at);
          navigate("/profile");
          // setCurrent(2);
        }
      });
  };

  return (
    <div className="cont">
      <div className="content">
        <div className="btn">
          <GoogleLogin
            className="Google"
            clientId="454166173619-s076fdpbdcj06psli2h9o067vg5eh434.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                icon={<FcGoogle />}
                className="Google"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <span className="btnText">Continue with Google</span>
              </Button>
            )}
            buttonText="Continue with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
          {/* <Button icon={<AiFillGithub/>} className="GitHub" ><span className="btnText">Continue with GitHub</span></Button> */}
        </div>
        <div id="ligne">
          <hr className="x left" />
          <span>OR</span>
          <hr className="x right" />
        </div>
        <Form
          className="form"
          scrollToFirstError
          form={form}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            className="form-item"
            // label="LastName"
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please input your LastName!",
              },
            ]}
          >
            <Input className="inputRegF" placeholder="LastName *" />
          </Form.Item>

          <Form.Item
            className="form-item"
            // label="FirsName"
            name="firsName"
            rules={[
              {
                required: true,
                message: "Please input your FirsName!",
              },
            ]}
          >
            <Input className="inputRegF" placeholder="FirsName *" />
          </Form.Item>

          <Form.Item
            className="form-item"
            name="email"
            // label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input className="inputRegF" placeholder="E-mail *" />
          </Form.Item>

          <Form.Item
            className="form-item"
            // label="Password"
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
            <Input.Password className="inputRegF" placeholder="Password *" />
          </Form.Item>

          <Form.Item
            className="form-item"
            name="confirm"
            // label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
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
            <Input.Password
              className="inputRegF"
              placeholder="Confirm Password *"
            />
          </Form.Item>

          <Form.Item
            className="form-item"
            name="phone"
            // label="Phone Number"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!phoneValidator(value)) {
                    return Promise.reject(new Error("Invalide phone number !"));
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input
              className="inputRegF"
              placeholder="Phone Number *"
              prefix="+216 "
            />
          </Form.Item>

          {/* <Form.Item
            className="form-item"
            name="speciality"
            // label="Speciality"
            rules={[
              {
                required: true,
                message: "Please input your phone speciality!",
              },
            ]}
          >
            <Input className="inputRegF" placeholder="Speciality *" />
          </Form.Item> */}
          <Button className="btnRg" type="primary" htmlType="submit">
            Next
          </Button>
          <div
            style={{
              marginTop: "10px",
              width: "100%",
              textAlign: "center",
              color: "#808080",
            }}
          >
            Already have an account?<a href="/login"> Log In </a>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default FormRegister;
