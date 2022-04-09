import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Card, Menu, Dropdown, Image, Badge } from "antd";
import ComptesToApprouve from "./comptesToApprouve/ComptesToApprouve";
import ComptesList from "./comptesList/ComptesList";
import "./AdminDashbord.css";
import { AiOutlineDown, AiOutlineSetting } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { HiOutlineLogout } from "react-icons/hi";
import axios from "axios";
import { useNavigate } from "react-router";
import Notifications from "./notifications/Notifications";
import Pusher from "pusher-js";

const AdminNavbar = () => {
  let navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [nbrCp, setNbrCp] = useState(0);
  const [refresh, setRefresh] = useState(0);
  const [activeTabKey2, setActiveTabKey2] = useState("Comptes_List");

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
    }
    axios
      .get(`http://localhost:8000/api/admin/comptesToApprouve`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setNbrCp(response.data.length);
      });

    const pusher = new Pusher("e43b09785ab7ef07b82f", {
      cluster: "eu",
      encrypted: true,
    });
    const channel = pusher.subscribe("my-channel");
    channel.bind("my-event", (data) => {
      console.log(data);
      setRefresh(refresh + 2);
    });
    return () => pusher.unsubscribe("my-channel");
  }, [refresh]);

  const tabListNoTitle = [
    {
      key: "Comptes_List",
      tab: "Comptes List",
    },
    {
      key: "Comptes_To_Approuve",
      tab: "Comptes To Approuve",
    },
    {
      key: "project",
      tab: "project",
    },
  ];

  const contentListNoTitle = {
    Comptes_List: (
      <ComptesList refresh={refresh} setRefresh={setRefresh}></ComptesList>
    ),
    Comptes_To_Approuve: (
      <ComptesToApprouve
        refresh={refresh}
        setRefresh={setRefresh}
      ></ComptesToApprouve>
    ),
    project: <p>project content</p>,
  };

  const adminMenu = (
    <Menu>
      <Menu.Item key="0">
        <a href>
          <span>Setting</span>
          <AiOutlineSetting style={{ marginLeft: "30px" }}></AiOutlineSetting>
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2">
        <a
          href
          onClick={() => {
            axios
              .delete(`http://localhost:8000/api/admin/logout`, {
                headers: { Authorization: `Bearer ${token}` },
              })
              .then((response) => {
                console.log(response.data);
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                navigate("/admin/login");
              });
          }}
        >
          <span>Logout</span>
          <HiOutlineLogout style={{ marginLeft: "30px" }}></HiOutlineLogout>
        </a>
      </Menu.Item>
    </Menu>
  );

  const notificationMenu = nbrCp ? (
    <Menu style={{ width: "300px" }}>
      <Menu.Item hidden></Menu.Item>
      <Notifications
        setActiveTabKey2={setActiveTabKey2}
        refresh={refresh}
        setRefresh={setRefresh}
      ></Notifications>
    </Menu>
  ) : (
    <Menu style={{ width: "300px" }}>
      <Menu.Item style={{ textAlign: "center" }}> No notifications </Menu.Item>
    </Menu>
  );

  const onTab2Change = (key) => {
    setActiveTabKey2(key);
  };

  return (
    <div style={{ display: "flex" }}>
      <Card
        style={{ width: "100%" }}
        tabList={tabListNoTitle}
        activeTabKey={activeTabKey2}
        tabBarExtraContent={
          <div style={{ display: "flex" }}>
            <div style={{ marginRight: "50px" }}>
              <Dropdown
                overlay={notificationMenu}
                trigger={["click"]}
                placement="bottomRight"
              >
                <a href onClick={(e) => e.preventDefault()}>
                  <Badge count={nbrCp} size="small" style={{ fontSize: "8px" }}>
                    <IoMdNotificationsOutline
                      style={{ fontSize: "23px", color: "black" }}
                    ></IoMdNotificationsOutline>
                  </Badge>
                </a>
              </Dropdown>
            </div>
            <Dropdown overlay={adminMenu} trigger={["click"]}>
              <a
                href
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                Admin{" "}
                <AiOutlineDown style={{ paddingTop: "5px" }}></AiOutlineDown>
              </a>
            </Dropdown>
          </div>
        }
        onTabChange={(key) => {
          onTab2Change(key);
        }}
      >
        {contentListNoTitle[activeTabKey2]}
      </Card>
    </div>
  );
};

export default AdminNavbar;
