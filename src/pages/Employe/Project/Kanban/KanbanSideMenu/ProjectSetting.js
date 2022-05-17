import React from "react";
import { Drawer, Form, Input, Button, DatePicker, Popconfirm } from "antd";
import { HiOutlineArchive } from "react-icons/hi";
import './ProjectSetting.css';
const { RangePicker } = DatePicker;
const ProjectSetting = ({ setVisible, visible }) => {
  return (
    <Drawer
      title={"Project setting"}
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
        <span style={{ fontWeight: "bold" }}>Edit project Title</span>
        <div style={{ display:"flex" }}>
        <Form.Item name="title" rules={[
          {
            required: true,
            message: "Please enter a title !",
          }
        ]}
          style={{width:"80%"}}
         >
          <Input placeholder="New title" />
        </Form.Item>
        <Button
            type="primary"
            htmlType="submit"
            style={{
              width: "20%"
            }}
          >
            Edit
          </Button>
        </div>
      </Form>
      <Form
        onFinish={(values) => {
          console.log(values);
        }}
      >
        <span style={{ fontWeight: "bold" }}>Edit project date</span>
        <div style={{ display:"flex" }}>
        <Form.Item name="date" rules={[
          {
            required: true,
            message: "Please enter a date !",
          }
        ]}
          style={{width:"80%"}}
         >
           <RangePicker
              style={{ width: "100%" }}
              onChange={(value, dateString) => {
                console.log(dateString);
              }}
            />
        </Form.Item>
        <Button
            type="primary"
            htmlType="submit"
            style={{
              width: "20%"
            }}
          >
            Edit
          </Button>
        </div>
      </Form>
      <Popconfirm
        title="Are you sure to delete this project?"
        onConfirm={()=>{
        }}
        onCancel={()=>{}}
        okText="Yes"
        cancelText="No"
        placement="bottom"
      >
      <div className="archiveTheProject" >
      <span style={{ fontWeight: "bold" }}>Archive the project</span>
      <div><HiOutlineArchive style={{ marginLeft:'10px', fontSize:"20px" }}></HiOutlineArchive></div>
      </div>
      </Popconfirm>
    </Drawer>
  );
};

export default ProjectSetting;
