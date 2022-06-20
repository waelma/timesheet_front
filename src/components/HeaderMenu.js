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

const HeaderMenu = ({ projectTitle = "" }) => {
  const token = localStorage.getItem("token");
  const [avatar, setAvatar] = useState();
  let navigate = useNavigate();
  const [nbrCp, setNbrCp] = useState(0);
  const [notifications, setNotifcations] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/employe/userPhoto`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setAvatar(response.data);
      });
    axios
      .get(`http://localhost:8000/api/employee/employeeNotifications`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
        setNbrCp(response.data.length);
        setNotifcations(response.data);
      });
    const pusher = new Pusher("b9d29c42996852d3dd6c", {
      cluster: "eu",
      encrypted: true,
    });
    const channel = pusher.subscribe(
      "channel".concat(localStorage.getItem("user_id"))
    );
    channel.bind("notificationEvent", (data) => {
      axios
        .get(`http://localhost:8000/api/employee/employeeNotifications`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setNbrCp(response.data.length);
          setNotifcations(response.data);
        });
    });
    return () => pusher.unsubscribe(channel);
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
        notifications.map((notif, index) =>
          notif.data.content.substr(0, 4) === "sent" ? (
            <Menu.Item
              key={index}
              style={{ textAlign: "center" }}
              onClick={() => {
                navigate(`/messages/${notif.data.id}`);
              }}
            >
              <div gap={"16px"} className="notification-container">
                <div>
                  <Avatar
                    size={32}
                    style={{ cursor: "pointer" }}
                    src={notif.data.photo}
                  />
                </div>
                <div className="notification-content">
                  <h3>{`${notif.data.firstName} ${notif.data.lastName}`}</h3>
                  <p>{notif.data.content}</p>
                </div>
              </div>
              {notifications?.length > 1 && <Menu.Divider />}
            </Menu.Item>
          ) : (
            <Menu.Item
              key={index}
              style={{ textAlign: "center" }}
              onClick={() => {
                navigate(`/project/kanbanTable/${notif.data.id}`);
              }}
            >
              <div gap={"16px"} className="notification-container">
                <div>
                  <Avatar
                    size={32}
                    style={{ cursor: "pointer" }}
                    src={notif.data.photo}
                  />
                </div>
                <div className="notification-content">
                  <h3>{`${notif.data.firstName} ${notif.data.lastName}`}</h3>
                  <p>{notif.data.content}</p>
                </div>
              </div>
              {notifications?.length > 1 && <Menu.Divider />}
            </Menu.Item>
          )
        )
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
      {/* <Menu.Item key="2">
        <span>Setting</span>
        <AiOutlineSetting style={{ marginLeft: "30px" }}></AiOutlineSetting>
      </Menu.Item>
      <Menu.Divider /> */}
      {localStorage.getItem("role") === "2" && (
        <>
          <Menu.Item
            key="3"
            onClick={() => {
              navigate("/archive");
            }}
          >
            <span>Archive</span>
            <HiOutlineArchive style={{ marginLeft: "30px" }}></HiOutlineArchive>
          </Menu.Item>
          <Menu.Divider />{" "}
        </>
      )}
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
                  onClick={(e) => {
                    e.preventDefault();
                    axios.get(
                      `http://localhost:8000/api/employee/employeeNotificationMarkAsRead`,
                      {
                        headers: { Authorization: `Bearer ${token}` },
                      }
                    );
                    setNbrCp(0);
                  }}
                  trigger={["click"]}
                  placement="bottomRight"
                >
                  <Badge count={nbrCp} size="small" style={{ fontSize: "8px" }}>
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
