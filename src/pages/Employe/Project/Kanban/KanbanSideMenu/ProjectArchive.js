import React from "react";
import { Drawer } from "antd";
const ProjectArchive = ({ setVisible, visible }) => {
  return (
    <Drawer
      title={"Project archive"}
      placement="right"
      onClose={() => {
        setVisible(false);
      }}
      visible={visible}
    ></Drawer>
  );
};

export default ProjectArchive;
