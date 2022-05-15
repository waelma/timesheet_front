import React from "react";
import { Calendar, Drawer } from "antd";

const ProjectCalendar = ({ setVisible, visible }) => {
  return (
    <Drawer
      title={"Project calendar"}
      placement="right"
      onClose={() => {
        setVisible(false);
      }}
      visible={visible}
    >
      <Calendar fullscreen={false} />
    </Drawer>
  );
};

export default ProjectCalendar;
