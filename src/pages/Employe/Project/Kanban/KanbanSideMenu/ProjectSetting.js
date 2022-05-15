import React from "react";
import { Drawer } from "antd";
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
  </Drawer>
  );
};

export default ProjectSetting;
