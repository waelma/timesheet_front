import { React, useEffect, useState } from "react";
import { Menu } from "antd";
import {
  MessageOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  FolderOpenOutlined,
} from "@ant-design/icons";
import axios from "axios";
const token = localStorage.getItem("token");
const { SubMenu } = Menu;
const SideMenu = () => {
  let [projects, setProjects] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/chefProjet/getChefProjects`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
        setProjects(response.data);
      });
  }, []);
  return (
    <div style={{ width: "15%" }}>
      <Menu
        style={{ height: "100%", width: "100%" }}
        // defaultSelectedKeys={["1"]}
        // defaultOpenKeys={["sub1"]}
        mode={"inline"}
      >
        <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Projets">
          {projects.map((project) => (
            <Menu.Item key={project.id}>{project.name}</Menu.Item>
          ))}
        </SubMenu>
        <Menu.Item key="1" icon={<MessageOutlined />}>
          Messaging
        </Menu.Item>
        <Menu.Item key="2" icon={<CalendarOutlined />}>
          Calendar
        </Menu.Item>
        <SubMenu key="sub2" icon={<FolderOpenOutlined />} title="Shared files">
          <Menu.Item key="7">Option 7</Menu.Item>
          <Menu.Item key="8">Option 8</Menu.Item>
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  );
};

export default SideMenu;
