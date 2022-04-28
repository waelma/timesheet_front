import { React, useState } from "react";
import Navbar from "../../../components/Navbar";
import { Input, Button, Form } from "antd";
import "./ForgetPwdCodeConfirmation.css";
import { useLocation } from "react-router";
import axios from "axios";
import { useNavigate } from "react-router";
const CodeConfirmation = () => {
  let navigate = useNavigate();
  const [code, setCode] = useState("");
  const location = useLocation();
  const onFinish = () => {
    axios
      .get(
        `http://localhost:8000/api/employe/resetForgetPwd/verifCode/${code}`,
        {
          params: {
            email: location.state.email,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        if (response.data === "true") {
          navigate("/updatePwd", {
            state: {
              email: location.state.email,
              code: code,
            },
          });
        } else {
          alert("Invalid code");
        }
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <Navbar />
      <div className="codeConf">
        <div className="code">
          <h3>
            a message has been sent to your phone number {location.state.phone}
          </h3>
          <div className="inpBtn">
            <Form
              className="formCodeConfirmationForgetPwd"
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                className="inputCode"
                name="code"
                rules={[
                  {
                    required: true,
                    message: "Please input the code!",
                  },
                ]}
              >
                <Input
                  className="inp"
                  onBlur={(e) => {
                    setCode(e.target.defaultValue);
                  }}
                />
              </Form.Item>

              <Button htmlType="submit" type="primary" size="middle">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeConfirmation;
