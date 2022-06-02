import { React, useState, useCallback } from "react";
import { Input, Button, Tag, Form } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { BsArrowReturnLeft } from "react-icons/bs";

const CreateBacklog = ({ setCurrent, backlog, setBacklog }) => {
  const [form] = Form.useForm();
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  return (
    <div>
      <div>
        <div style={{ display: "flex" }}>
          <h1 style={{ fontWeight: "bold" }}>Create project backlog</h1>
          <BsArrowReturnLeft
            style={{
              position: "absolute",
              right: "30px",
              fontSize: "20px",
              cursor: "pointer",
            }}
            onClick={() => {
              setCurrent(1);
            }}
          ></BsArrowReturnLeft>
        </div>
        <p style={{ fontSize: "16px" }}>
          Enter your project's main tasks. You can change these and add more
          later.
        </p>
        <br></br>
        <div style={{ width: "50%", display: "grid" }}>
          <span style={{ fontWeight: "bold" }}>Task name</span>
          <Form
            form={form}
            onFinish={(values) => {
              if (
                values.task &&
                backlog.findIndex(
                  (x) =>
                    x.toUpperCase().split(" ").join("") ===
                    values.task.toUpperCase().split(" ").join("")
                ) === -1
              ) {
                backlog.push(values.task);
                form.resetFields();
                forceUpdate();
              }
            }}
          >
            <Form.Item
              name="task"
              style={{
                marginBottom: "0px",
              }}
            >
              <Input
                placeholder="Task name"
                style={{ borderRadius: "4px", borderColor: "#5499C7" }}
              />
            </Form.Item>
            <br />
            <div>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  width: "30%",
                  backgroundColor: "#28B463",
                  color: "white",
                  borderRadius: "4px",
                  left: "40%",
                  borderColor: "white",
                }}
              >
                Add
              </Button>
              <Button
                onClick={() => {
                  setCurrent(3);
                }}
                style={{
                  width: "30%",
                  backgroundColor: "#5499C7",
                  color: "white",
                  borderRadius: "4px",
                  left: "40%",
                }}
              >
                Next
              </Button>
            </div>
          </Form>
          <br />
          <InfiniteScroll height={"160px"} dataLength={backlog.length}>
            {backlog.map((t) => (
              <Tag
                key={t}
                closable
                visible={true}
                onClose={() => {
                  setBacklog(backlog.filter((x) => x !== t));
                  forceUpdate();
                }}
                style={{
                  marginBottom: "4px",
                  width: "97%",
                  height: "25px",
                  borderRadius: "5px",
                  backgroundColor: "#D0D3D4",
                }}
              >
                {t}
              </Tag>
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default CreateBacklog;
