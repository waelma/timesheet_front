import { React, useState } from "react";
import { Steps, Input, Button, Drawer, Form } from "antd";
import { RiUserAddLine } from "react-icons/ri";
import { MdDriveFileRenameOutline, MdDoneAll } from "react-icons/md";
import { IoIosTimer } from "react-icons/io";
import { FaTasks } from "react-icons/fa";
import TagEmploye from "./TagEmploye";
import CreateBacklog from "./CreateBacklog";
import SuccessCreate from "./SuccessCreate";
import AddDates from "./AddDates";

const { Step } = Steps;
const CreateProject = ({ setVisible, visible }) => {
  const [current, setCurrent] = useState(0);
  const [title, setTitle] = useState("");
  let [tags, setTags] = useState([]);
  let [backlog, setBacklog] = useState([]);
  let [dates, setDates] = useState([]);

  const onFinish = () => {
    setCurrent(current + 1);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const steps = [
    {
      key: 0,
      icon: <MdDriveFileRenameOutline />,
      content: (
        <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <div>
            <h1 style={{ fontWeight: "bold" }}>First, name your project</h1>
            <p style={{ fontSize: "16px" }}>
              Give your project a distinct, descriptive name. You can change
              this at any time.{" "}
            </p>
            <br></br>
            <div style={{ width: "50%", display: "grid" }}>
              <span style={{ fontWeight: "bold" }}>Project name</span>
              <Form.Item
                name="Title"
                rules={[
                  () => ({
                    validator() {
                      if (!title) {
                        return Promise.reject(
                          new Error("Please enter your project title !")
                        );
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <Input
                  defaultValue={title}
                  placeholder="Project name"
                  style={{ borderRadius: "4px", borderColor: "#5499C7" }}
                  onBlur={(e) => {
                    setTitle(e.target.defaultValue);
                  }}
                />
              </Form.Item>
              <br />
              <Button
                htmlType="submit"
                style={{
                  width: "30%",
                  backgroundColor: "#5499C7",
                  color: "white",
                  left: "70%",
                  borderRadius: "4px",
                }}
              >
                Next
              </Button>
            </div>
          </div>
        </Form>
      ),
    },
    {
      key: 1,
      icon: <RiUserAddLine />,
      content: (
        <TagEmploye
          setCurrent={setCurrent}
          tags={tags}
          setTags={setTags}
        ></TagEmploye>
      ),
    },
    {
      key: 2,
      icon: <FaTasks />,
      content: (
        <CreateBacklog
          setCurrent={setCurrent}
          backlog={backlog}
          setBacklog={setBacklog}
        ></CreateBacklog>
      ),
    },
    {
      key: 3,
      icon: <IoIosTimer />,
      content: (
        <AddDates
          setCurrent={setCurrent}
          setDates={setDates}
          dates={dates}
        ></AddDates>
      ),
    },
    {
      key: 4,
      icon: <MdDoneAll />,
      content: (
        <SuccessCreate
          setCurrent={setCurrent}
          title={title}
          tags={tags}
          backlog={backlog}
          dates={dates}
        ></SuccessCreate>
      ),
    },
  ];
  return (
    <Drawer
      title={"Create new project"}
      placement="right"
      size={"large"}
      onClose={() => {
        setCurrent(0);
        setTitle("");
        setTags([]);
        setBacklog([]);
        setVisible(false);
      }}
      visible={visible}
    >
      <div>
        <div>{steps[current].content}</div>
        <Steps
          current={current}
          style={{ position: "absolute", bottom: "40px", width: "90%" }}
        >
          {steps.map((item) => (
            <Step key={item.title} icon={item.icon} />
          ))}
        </Steps>
      </div>
    </Drawer>
  );
};

export default CreateProject;
