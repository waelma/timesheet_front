import React from "react";
import { Layout } from "antd";
import SideMenu from "./SideMenu";
import HeaderMenu from "./HeaderMenu";
import Profile from "../pages/profile/Profile";
import Home from "./Home";
import KanbanChefProjet from "./KanbanChefProjet";
const { Header, Sider, Content } = Layout;
const EmployeLayout = () => {
  return (
    <div>
      <HeaderMenu></HeaderMenu>
      <div style={{ display: "flex" }}>
        <SideMenu></SideMenu>
        {/* <Home></Home> */}
        <KanbanChefProjet></KanbanChefProjet>
      </div>
    </div>
  );
};

export default EmployeLayout;
