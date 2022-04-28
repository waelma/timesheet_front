import React from "react";
import { Layout } from "antd";
import SideMenu from "./SideMenu";
import HeaderMenu from "./HeaderMenu";
import Profile from "../pages/profile/Profile";
import Home from "./Home";
const { Header, Sider, Content } = Layout;
const EmployeLayout = () => {
  return (
    <div>
      <HeaderMenu></HeaderMenu>
      <div style={{ display: "flex" }}>
        <SideMenu></SideMenu>
        <Home></Home>
      </div>
    </div>
  );
};

export default EmployeLayout;
