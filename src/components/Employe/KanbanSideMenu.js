import React from "react";
import { Menu } from "antd";
import { MessageOutlined, CalendarOutlined } from "@ant-design/icons";
import { FiPaperclip } from "react-icons/fi";
import { HiOutlineUsers, HiOutlineArchive } from "react-icons/hi";
import { MdAddTask } from "react-icons/md";
import { BsKanban } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";

import "./KanbanSideMenu.css";
const KanbanSideMenu = () => {
  return (
    <div>
      <Menu
        style={{
          backgroundColor: "#F7F9F9",
          width: "60px",
          marginTop: "10px",
        }}
        mode="inline"
        inlineCollapsed={true}
      >
        <Menu.Item key="0" icon={<BsKanban />}>
          kanban table
        </Menu.Item>
        <Menu.Item key="1" icon={<MdAddTask />}>
          Add Task
        </Menu.Item>
        <Menu.Item key="2" icon={<HiOutlineUsers />}>
          Team
        </Menu.Item>
        <Menu.Item key="3" icon={<MessageOutlined />}>
          Groupe messaging
        </Menu.Item>
        <Menu.Item key="4" icon={<CalendarOutlined />}>
          Calendar
        </Menu.Item>
        <Menu.Item key="5" icon={<FiPaperclip />}>
          Project files
        </Menu.Item>
        <Menu.Item key="6" icon={<AiOutlineSetting />}>
          Setting
        </Menu.Item>
        <Menu.Item key="7" icon={<HiOutlineArchive />}>
          Archive
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default KanbanSideMenu;
