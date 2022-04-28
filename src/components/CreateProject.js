import React from "react";
import { Steps } from "antd";
import { RiUserAddLine } from 'react-icons/ri';
import { MdDriveFileRenameOutline, MdDoneAll} from 'react-icons/md';
import { FaTasks } from 'react-icons/fa';

const { Step } = Steps;
const CreateProject = () => {
const steps = [
    {
      icon: <MdDriveFileRenameOutline />,
      content:  <div>
      <h1 style={{ fontWeight: "bold" }}>First, name your project</h1>
      <p style={{ fontSize: "16px" }}>
        Give your project a distinct, descriptive name. You can change this at
        any time.{" "}
      </p>
      </div>,
      status: "finish"
    },
    {
      icon:<RiUserAddLine />,
      content: 'Second-content',
      status: "process"
    },
    {
        icon:<FaTasks />,
      content: 'Last-content',
      status: "error"
    },
    {
        icon:<MdDoneAll />,
      content: 'Last-content',
      status: "wait"
    },
  ];
  return <div>
      <div>{steps[0].content}</div>
        <Steps current={3} style={{textAlign:"center", position:"absolute", bottom:"40px", width:"80%"}}>
        {steps.map(item => (
          <Step  key={item.title} icon={item.icon}  />
        ))}
      </Steps>
  </div>;
};

export default CreateProject;
