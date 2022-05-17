import { React, useState, useEffect, useCallback } from "react";
import HeaderMenu from "../../../components/HeaderMenu";
import SideMenu from "../../../components/SideMenu";
import "./MessageBox.css";
import { AutoComplete, Form, Button, Divider, Input } from "antd";
import axios from "axios";
import { SearchOutlined } from '@ant-design/icons';

const MessageBox = () => {
  const token = localStorage.getItem("token");
  const [form] = Form.useForm();
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  let [options, setOptions] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/employe/getEmployes`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setOptions(response.data);
      });
  }, []);
  return (
    <div>
      <HeaderMenu></HeaderMenu>
      <div style={{ display: "flex" }}>
        <SideMenu></SideMenu>
        <div className="messageBox">
          <div style={{ width: "75%" }}>
            <div style={{ height: "10%" }}></div>
            <div style={{ height: "80%" }}></div>
            <div style={{ height: "10%" }}></div>
          </div>
          <Divider type="vertical" plain/>
          <div style={{ width: "25%"}}>
            <div style={{display:"flex"}}>
            <AutoComplete
              style={{ width: "85%", borderRadius: "15px" }}
              options={options}
              placeholder="Employe"
            />
            <Button
            type="primary"
            htmlType="submit"
              style={{
                width: "15%",
                textAlign:'center'
              }}
            >
              <SearchOutlined />
            </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
