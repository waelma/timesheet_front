import { React, useEffect, useState } from "react";
import { PageHeader, Affix, Avatar, Dropdown, Menu, Badge } from "antd";
import { IoMdNotificationsOutline } from "react-icons/io";
import { HiOutlineLogout, HiOutlineArchive } from "react-icons/hi";
import { AiOutlineSetting } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import "./HeaderMenu.css";
import axios from "axios";
import { useNavigate } from "react-router";
import Pusher from "pusher-js";

const notifications = [
  {
    lastName: "Ma",
    firstName: "Rabeb",
    photo:
      "http://localhost:8000/uploads/users/1654377674Screenshot_20220421_010800.jpg",
    content: "you send a message",
  },
  {
    lastName: "Tlemsani",
    firstName: "Yass",
    photo:
      "https://lh3.googleusercontent.com/a-/AOh14GiKBVnzlLGk7ulbVO2s5-OpJwkldnofA9a4NuVemg=s96-c",
    content: "moved task xxxx to test column",
  },
  {
    lastName: "Ma",
    firstName: "Wael",
    photo:
      "http://localhost:8000/uploads/users/1652462116Screenshot_20220421_012359.jpg",
    content: "assigned you to task xxxx",
  },
];

const HeaderMenu = ({ projectTitle = "" }) => {
  const token = localStorage.getItem("token");
  const [avatar, setAvatar] = useState();
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/employe/userPhoto`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setAvatar(response.data);
      });
    // const pusher = new Pusher("e43b09785ab7ef07b82f", {
    //   cluster: "eu",
    //   encrypted: true,
    // });
    // const channel = pusher.subscribe(
    //   "channel".concat(localStorage.getItem("user_id"))
    // );
    // channel.bind("projectUpdate", (data) => {
    //   console.log(data);
    // });
    // return () => pusher.unsubscribe(channel);
  }, []);

  const logout = () => {
    axios
      .delete(`http://localhost:8000/api/employe/logout`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("verifier");
        localStorage.removeItem("user_id");
        navigate("/");
      });
  };

  const notif = (
    <Menu style={{ width: "300px" }}>
      {notifications?.length > 0 ? (
        notifications.map((notif, index) => (
          <Menu.Item key={index} style={{ textAlign: "center" }}>
            <div gap={"16px"} className="notification-container">
              <div>
                <Avatar
                  size={32}
                  style={{ cursor: "pointer" }}
                  src={notif.photo}
                />
              </div>
              <div className="notification-content">
                <h3>{`${notif.firstName} ${notif.lastName}`}</h3>
                <p>{notif.content}</p>
              </div>
            </div>
            {notifications?.length > 1 && <Menu.Divider />}
          </Menu.Item>
        ))
      ) : (
        <Menu.Item key={"1"} style={{ textAlign: "center" }}>
          <p className="notifcations-empty">No notifcations</p>
        </Menu.Item>
      )}
    </Menu>
  );
  const menu = (
    <Menu>
      <Menu.Item
        key="1"
        onClick={() => {
          navigate("/profile");
        }}
      >
        <span>Profile</span>
        <CgProfile style={{ marginLeft: "34.5px" }}></CgProfile>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2">
        <span>Setting</span>
        <AiOutlineSetting style={{ marginLeft: "30px" }}></AiOutlineSetting>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">
        <span>Archive</span>
        <HiOutlineArchive style={{ marginLeft: "30px" }}></HiOutlineArchive>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item onClick={logout} key="4" danger>
        {" "}
        <span>Logout</span>
        <HiOutlineLogout style={{ marginLeft: "31px" }}></HiOutlineLogout>
      </Menu.Item>
    </Menu>
  );
  return (
    <div
      style={{
        borderBottomColor: "#f3f3f3",
        borderBottomStyle: "solid",
        borderWidth: "1px",
        // backgroundColor: "#F7F9F9",
      }}
    >
      <Affix>
        <PageHeader
          className="site-page-header"
          onBack={() => window.history.back()}
          title={
            <a href="/home" style={{ cursor: "pointer" }}>
              PoinTâche
            </a>
          }
          subTitle={projectTitle}
          extra={[
            <div key="1" style={{ display: "flex" }}>
              <div key="1" style={{ marginTop: "3px", marginRight: "40px" }}>
                <Dropdown
                  overlay={notif}
                  trigger={["click"]}
                  placement="bottomRight"
                >
                  <Badge count={1} size="small" style={{ fontSize: "8px" }}>
                    <IoMdNotificationsOutline
                      style={{
                        fontSize: "25px",
                        color: "black",
                        cursor: "pointer",
                      }}
                    ></IoMdNotificationsOutline>
                  </Badge>
                </Dropdown>
              </div>
              <div key="2">
                <Dropdown
                  overlay={menu}
                  trigger={["click"]}
                  placement="bottomRight"
                >
                  <Avatar
                    size={32}
                    style={{ cursor: "pointer" }}
                    src={avatar}
                  />
                </Dropdown>
              </div>
            </div>,
          ]}
        />
      </Affix>
    </div>
  );
};

export default HeaderMenu;
