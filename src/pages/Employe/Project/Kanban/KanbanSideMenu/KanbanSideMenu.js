import { React, useState } from "react";
import { Menu, Badge, Statistic } from "antd";
import { MessageOutlined, CalendarOutlined } from "@ant-design/icons";
import { HiOutlineUsers, HiOutlineArchive } from "react-icons/hi";
import { MdAddTask } from "react-icons/md";
import { BsKanban } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";
import { ImStatsBars } from "react-icons/im";
import GroupeMessaging from "./GroupeMessaging";
import ProjectCalendar from "./ProjectCalendar";
import ProjectTeam from "./ProjectTeam";
import AddTask from "./AddTask";
import ProjectSetting from "./ProjectSetting";
import ProjectArchive from "./ProjectArchive";
import Statistics from "./Statistics";

const KanbanSideMenu = ({ forceUpdate, id, members, controlledBoard }) => {
  const [groupeMessaging, setGroupeMessaging] = useState(false);
  const [projectCalendar, setProjectCalendar] = useState(false);
  const [projectTeam, setProjectTeam] = useState(false);
  const [addTask, setAddTask] = useState(false);
  const [projectSetting, setProjectSetting] = useState(false);
  const [projectArchive, setProjectArchive] = useState(false);
  const [statistics, setStatistics] = useState(false);
  const isEmployee = localStorage.getItem("role") === "1";
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
        {!isEmployee && (
          <Menu.Item
            key="1"
            icon={<MdAddTask />}
            onClick={() => {
              setAddTask(true);
            }}
          >
            Add Task
          </Menu.Item>
        )}
        <Menu.Item
          key="2"
          icon={<HiOutlineUsers />}
          onClick={() => {
            setProjectTeam(true);
          }}
        >
          Project Team
        </Menu.Item>
        <Menu.Item
          key="3"
          icon={
            <Badge
              count={5}
              size="small"
              style={{ fontSize: "8px", marginTop: "7px" }}
            >
              <MessageOutlined />
            </Badge>
          }
          onClick={() => {
            setGroupeMessaging(true);
          }}
        >
          Groupe messaging
        </Menu.Item>
        <Menu.Item
          key="4"
          icon={<ImStatsBars />}
          onClick={() => {
            setStatistics(true);
          }}
        >
          Project statistics
        </Menu.Item>
        <Menu.Item
          key="5"
          icon={<CalendarOutlined />}
          onClick={() => {
            setProjectCalendar(true);
          }}
        >
          Project Calendar
        </Menu.Item>
        {!isEmployee && (
          <Menu.Item
            key="6"
            icon={<AiOutlineSetting />}
            onClick={() => {
              setProjectSetting(true);
            }}
          >
            Project Setting
          </Menu.Item>
        )}
        <Menu.Item
          key="7"
          icon={<HiOutlineArchive />}
          onClick={() => {
            setProjectArchive(true);
          }}
        >
          Project Archive
        </Menu.Item>
      </Menu>
      <GroupeMessaging
        id={id}
        setVisible={setGroupeMessaging}
        visible={groupeMessaging}
      ></GroupeMessaging>
      <ProjectCalendar
        setVisible={setProjectCalendar}
        visible={projectCalendar}
      ></ProjectCalendar>
      <ProjectTeam
        project_id={id}
        members={members}
        setVisible={setProjectTeam}
        visible={projectTeam}
        refresh={forceUpdate}
      ></ProjectTeam>
      <AddTask id={id} setVisible={setAddTask} visible={addTask}></AddTask>
      <ProjectSetting
        setVisible={setProjectSetting}
        visible={projectSetting}
        controlledBoard={controlledBoard}
        forceUpdate={forceUpdate}
      ></ProjectSetting>
      <ProjectArchive
        setVisible={setProjectArchive}
        visible={projectArchive}
      ></ProjectArchive>
      <Statistics
        id={id}
        setVisible={setStatistics}
        visible={statistics}
        controlledBoard={controlledBoard}
      ></Statistics>
    </div>
  );
};

export default KanbanSideMenu;
