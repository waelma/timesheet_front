import React, { useState } from "react";
import moment from "moment";
import { Drawer, Form, Input, Button, DatePicker, Popconfirm } from "antd";
import { HiOutlineArchive } from "react-icons/hi";
import "./ProjectSetting.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const { RangePicker } = DatePicker;
const ProjectSetting = ({
  setVisible,
  visible,
  controlledBoard,
  forceUpdate,
}) => {
  const token = localStorage.getItem("token");
  let navigate = useNavigate();
  let [date, setDate] = useState([
    controlledBoard.dateDebut,
    controlledBoard.dateFin,
  ]);
  return (
    <Drawer
      title={"Project setting"}
      placement="right"
      onClose={() => {
        setVisible(false);
        forceUpdate(Math.random());
      }}
      visible={visible}
    >
      <Form
        initialValues={{
          title: controlledBoard?.name,
        }}
        onFinish={(values) => {
          let data = {
            title: values.title,
          };
          axios
            .put(
              `http://localhost:8000/api/project/editTitle/${controlledBoard.id}`,
              data,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            )
            .then((response) => {});
        }}
      >
        <span style={{ fontWeight: "bold" }}>Edit project Title</span>
        <div style={{ display: "flex" }}>
          <Form.Item
            name="title"
            rules={[
              {
                required: true,
                message: "Please enter a title !",
              },
            ]}
            style={{ width: "80%" }}
          >
            <Input placeholder="New title" />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              width: "20%",
            }}
          >
            Edit
          </Button>
        </div>
      </Form>
      <Form
        initialValues={{
          date: controlledBoard?.dateDebut
            ? [
                moment(controlledBoard?.dateDebut, "YYYY-MM-DD"),
                moment(controlledBoard?.dateFin, "YYYY-MM-DD"),
              ]
            : null,
        }}
        onFinish={(values) => {
          let data = {
            dateDebut: date[0],
            dateFin: date[1],
          };
          console.log(data);
          axios
            .put(
              `http://localhost:8000/api/project/editDate/${controlledBoard.id}`,
              data,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            )
            .then((response) => {
              console.log(response.data);
            });
        }}
      >
        <span style={{ fontWeight: "bold" }}>Edit project date</span>
        <div style={{ display: "flex" }}>
          <Form.Item
            name="date"
            rules={[
              {
                required: true,
                message: "Please enter a date !",
              },
            ]}
            style={{ width: "80%" }}
          >
            <RangePicker
              style={{ width: "100%" }}
              onChange={(value, dateString) => {
                setDate([dateString[0], dateString[1]]);
              }}
            />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              width: "20%",
            }}
          >
            Edit
          </Button>
        </div>
      </Form>
      <Popconfirm
        title="Are you sure to archive this project?"
        onConfirm={() => {
          axios
            .delete(
              `http://localhost:8000/api/project/archiveProject/${controlledBoard.id}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            )
            .then((response) => {
              if (response.status === 204) {
                navigate("/home");
              }
            });
        }}
        onCancel={() => {}}
        okText="Yes"
        cancelText="No"
        placement="bottom"
      >
        <div className="archiveTheProject">
          <span style={{ fontWeight: "bold" }}>Archive the project</span>
          <div>
            <HiOutlineArchive
              style={{ marginLeft: "10px", fontSize: "20px" }}
            ></HiOutlineArchive>
          </div>
        </div>
      </Popconfirm>
    </Drawer>
  );
};

export default ProjectSetting;
