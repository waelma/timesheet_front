import { React, useEffect, useState } from "react";
import { Drawer, Form, Button, Input, DatePicker, Select } from "antd";
import axios from "axios";
import moment from "moment";
const { RangePicker } = DatePicker;
const { Option } = Select;
const { TextArea } = Input;
const AddTask = ({ id, members, refresh, setVisible, visible }) => {
  const token = localStorage.getItem("token");
  const [form] = Form.useForm();
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
    <Drawer
      title={"Add New Task"}
      placement="right"
      onClose={() => {
        setVisible(false);
      }}
      visible={visible}
    >
      <Form
        onFinish={(values) => {
          let data = {
            name: values.name,
            details: values.description,
            dateDebut: values.date[0].format("YYYY-MM-DD"),
            dateFin: values.date[1].format("YYYY-MM-DD"),
            project_id: parseInt(id),
            members: values.members,
          };
          axios
            .post(`http://localhost:8000/api/task/createTask`, data, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
              console.log(response.data);
              setVisible(false);
              refresh();
            });
        }}
      >
        <div>
          <span style={{ fontWeight: "bold" }}>Task name</span>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please task name!",
              },
            ]}
          >
            <Input placeholder="Task name *" />
          </Form.Item>
          <span style={{ fontWeight: "bold" }}>Task description</span>
          <Form.Item name="description" rules={[]}>
            <TextArea placeholder="Task description" />
          </Form.Item>
          <span style={{ fontWeight: "bold" }}>Task start and end date</span>
          <Form.Item
            name="date"
            rules={[
              {
                required: true,
                message: "Please entre date!",
              },
            ]}
          >
            <RangePicker
              style={{ width: "100%" }}
              onChange={(value, dateString) => {
                console.log(dateString);
              }}
            />
          </Form.Item>
          <span style={{ fontWeight: "bold" }}>Select members</span>
          <Form.Item name="members">
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="select members"
              optionLabelProp="label"
            >
              {options.map((item) => (
                <Option key={item.id} value={item.id} label={item.value}>
                  {item.value}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              width: "30%",
              left: "70%",
              borderRadius: "4px",
            }}
          >
            Add Task
          </Button>
        </div>
      </Form>
    </Drawer>
  );
};

export default AddTask;
