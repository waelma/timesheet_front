import { React, useState } from "react";
import { Steps, Input, Button, Drawer } from "antd";
import { RiUserAddLine } from "react-icons/ri";
import { MdDriveFileRenameOutline, MdDoneAll } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import TagEmploye from "./TagEmploye";
import CreateBacklog from "./CreateBacklog";
import SuccessCreate from "./SuccessCreate";

const { Step } = Steps;
const CreateProject = ({ setVisible, visible }) => {
  const [current, setCurrent] = useState(0);

  const steps = [
    {
      key: 0,
      icon: <MdDriveFileRenameOutline />,
      content: (
        <div>
          <h1 style={{ fontWeight: "bold" }}>First, name your project</h1>
          <p style={{ fontSize: "16px" }}>
            Give your project a distinct, descriptive name. You can change this
            at any time.{" "}
          </p>
          <br></br>
          <div style={{ width: "50%", display: "grid" }}>
            <span style={{ fontWeight: "bold" }}>Project name</span>
            <Input
              placeholder="Project name"
              style={{ borderRadius: "4px", borderColor: "#5499C7" }}
            />
            <br />
            <Button
              onClick={() => {
                setCurrent(current + 1);
              }}
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
      ),
    },
    {
      key: 1,
      icon: <RiUserAddLine />,
      content: <TagEmploye setCurrent={setCurrent}></TagEmploye>,
    },
    {
      key: 2,
      icon: <FaTasks />,
      content: <CreateBacklog setCurrent={setCurrent}></CreateBacklog>,
    },
    {
      key: 3,
      icon: <MdDoneAll />,
      content: <SuccessCreate></SuccessCreate>,
    },
  ];
  return (
    <Drawer
      title={"Create new project"}
      placement="right"
      size={"large"}
      onClose={() => {
        setCurrent(0);
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
