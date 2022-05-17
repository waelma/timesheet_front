import { React, useEffect, useState } from "react";
import { Drawer, Form, Button, Input, DatePicker, Select } from "antd";
import axios from "axios";
const { RangePicker } = DatePicker;
const { Option } = Select;
const { TextArea } = Input;
const AddTask = ({ setVisible, visible }) => {
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
          console.log(values);
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
          <span style={{ fontWeight: "bold" }}>Task begin and end date</span>
          <Form.Item
            name="dates"
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
