import React from "react";
import HeaderMenu from "../../../components/HeaderMenu";
import SideMenu from "../../../components/SideMenu";
const MessageBox = () => {
  return (
    <div>
      <HeaderMenu></HeaderMenu>
      <div style={{ display: "flex" }}>
        <SideMenu></SideMenu>
        <div className="messageBox"></div>
      </div>
    </div>
  );
};

export default MessageBox;
