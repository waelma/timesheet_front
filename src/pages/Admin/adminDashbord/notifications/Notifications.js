import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { List, Avatar, Menu } from "antd";
import VirtualList from "rc-virtual-list";
import "./Notifications.css";
import axios from "axios";

const Notifications = ({ setActiveTabKey2, refresh, setRefresh, data }) => {
  const token = localStorage.getItem("token");
  const calculTime = (date) => {
    const date1 = new Date(date);
    const date2 = new Date();
    const diff = ~~((date2 - date1) / 60000) - 60;
    if (diff < 1) {
      return "Now";
    } else if (diff < 59) {
      return diff + " minutes";
    } else if (diff < 1439) {
      return ~~(diff / 60) + " hours";
    } else {
      return ~~(diff / 1440) + " days";
    }
  };
  useEffect(() => {
    // console.log(data[0].created_at);
    console.log(calculTime());
  }, []);
  return data.length ? (
    <div className="notifcation">
      <List>
        <VirtualList data={data} itemHeight={47} itemKey="email">
          {(item) => (
            <a
              className="notifLink"
              href
              onClick={() => {
                window.dispatchEvent(
                  new KeyboardEvent("keydown", {
                    altKey: false,
                    code: "Escape",
                    ctrlKey: false,
                    isComposing: false,
                    key: "Escape",
                    location: 0,
                    metaKey: false,
                    repeat: false,
                    shiftKey: false,
                    which: 27,
                    charCode: 0,
                    keyCode: 27,
                  })
                );
                setActiveTabKey2("Comptes_To_Approuve");
              }}
            >
              <List.Item key={item.email}>
                <List.Item.Meta
                  avatar={
                    <Avatar src={item.photo} style={{ marginLeft: "10px" }} />
                  }
                  title={item.lastName + " " + item.firstName}
                  description={item.email}
                />
                <div
                  className="notifApprouve"
                  style={{ marginBottom: "22px", marginRight: "10px" }}
                >
                  <span style={{ color: "#515A5A" }}>
                    {calculTime(item.created_at)}
                  </span>
                </div>
              </List.Item>
            </a>
          )}
        </VirtualList>
      </List>
    </div>
  ) : (
    <Menu style={{ width: "300px" }}>
      <Menu.Item style={{ textAlign: "center" }}> No notifications </Menu.Item>
    </Menu>
  );
};

export default Notifications;
