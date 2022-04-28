import { React, useState } from "react";
import "antd/dist/antd.css";
import {
  Form,
  Input,
  Button,
  Tooltip,
  Typography,
  Space,
  notification,
} from "antd";
import "./Login.css";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { GoogleLogin } from "react-google-login";

const Login = () => {
  const [email, setEmail] = useState("");
  let navigate = useNavigate();

  const openNotification = () => {
    notification.open({
      message: "Email or password incorrect",
      placement: "top",
      duration: 3,
    });
  };
  const onFinish = (values) => {
    let data = {
      email: values.email,
      password: values.password,
    };
    axios
      .post(`http://localhost:8000/api/employe/login`, data)
      .then((response) => {
        console.log(response.status);
        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("role", response.data.role);
          localStorage.setItem("user_id", response.data.user_id);
          localStorage.setItem("verifier", response.data.email_verified_at);
          navigate("/profile");
        }
      })
      .catch(() => {
        openNotification("error");
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("user_id", response.data.user_id);
        localStorage.setItem("verifier", response.data.email_verified_at);
        if (response.status === 200 || response.status === 201) {
          navigate("/profile");
        }
      });
  };

  return (
    <div>
      <Navbar />
      <div className="loginForm">
        <h1 className="login-page-new__main-form-title"> Log in </h1>

        <div className="oauht2">
          <GoogleLogin
            className="Google"
            clientId="454166173619-s076fdpbdcj06psli2h9o067vg5eh434.apps.googleusercontent.com"
            //  uxMode="redirect"
            //  redirectUri={'http://localhost:3000/profile'}
            render={(renderProps) => (
              <Button
                icon={<FcGoogle />}
                className="loginbtn"
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
          {/* <Button icon={<AiFillGithub/>} className="loginbtn"><span className="btntxt">Login with GitHub</span></Button> */}
        </div>
        <div className="or oauht2">
          <hr className="lig" />
          <span>OR</span>
          <hr className="lig" />
        </div>
        <Form
          className="loginform"
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "This E-mail is not valid!",
              },
              {
                required: true,
                message: "Please enter your E-mail!",
              },
            ]}
          >
            <Input
              placeholder="Enter Email"
              onBlur={(e) => {
                setEmail(e.target.defaultValue);
              }}
            />
          </Form.Item>

          <Form.Item>
            <Space className="pwd">
              <Form.Item
                className="forgetpwd"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please enter your password!",
                  },
                ]}
              >
                <Input.Password placeholder="Enter Password" />
              </Form.Item>

              <Tooltip>
                <Typography.Link
                  onClick={() => {
                    if (email === "") {
                      alert("please input your email");
                    } else {
                      axios
                        .get(
                          `http://localhost:8000/api/employe/forgetPwdMessage`,
                          {
                            params: {
                              email: email,
                            },
                          }
                        )
                        .then((response) => {
                          console.log(response.data);
                          if (response.data.message === "success") {
                            navigate("/ForgetPwdCodeConfirmation", {
                              state: {
                                email: email,
                                phone: response.data.phone,
                              },
                            });
                          }
                        });
                    }
                  }}
                >
                  Forget password ?
                </Typography.Link>
              </Tooltip>
            </Space>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="submitbtn">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
