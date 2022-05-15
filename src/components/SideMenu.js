import { React, useEffect, useState } from "react";
import { Menu } from "antd";
import {
  MessageOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  FolderOpenOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router";
const token = localStorage.getItem("token");
const { SubMenu } = Menu;

const SideMenu = () => {
  let navigate = useNavigate();
  let [projects, setProjects] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/chefProjet/getChefProjects`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
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
            <Menu.Item
              key={project.id}
              onClick={() => {
                navigate(`/project/kanbanTable/${project.id}`);
              }}
            >
              {project.name}
            </Menu.Item>
          ))}
        </SubMenu>
        <Menu.Item key="1" icon={<MessageOutlined />}>
          Messaging
        </Menu.Item>
        <Menu.Item
          key="2"
          icon={<CalendarOutlined />}
          onClick={() => {
            navigate(`/calendar`);
          }}
        >
          Calendar
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default SideMenu;
