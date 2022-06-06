import { React, useEffect, useState } from "react";
import { PageHeader, Affix, Avatar, Dropdown, Menu, Badge } from "antd";
import { IoMdNotificationsOutline } from "react-icons/io";
import { HiOutlineLogout, HiOutlineArchive } from "react-icons/hi";
import { AiOutlineSetting } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import "./HeaderMenu.css";
import axios from "axios";
import { useNavigate } from "react-router";

const HeaderMenu = () => {
  const token = localStorage.getItem("token");
  const [avatar, setAvatar] = useState();
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://8dcd-197-244-176-194.eu.ngrok.io/api/employe/userPhoto`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setAvatar(response.data);
      });
  }, []);

  const logout = () => {
    axios
      .delete(`https://8dcd-197-244-176-194.eu.ngrok.io/api/employe/logout`, {
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
      <Menu.Item key='1' style={{ textAlign: "center" }}>
        {" "}
        No notifications{" "}
      </Menu.Item>
    </Menu>
  );
  const menu = (
    <Menu>
      <Menu.Item
        key='1'
        onClick={() => {
          navigate("/profile");
        }}>
        <span>Profile</span>
        <CgProfile style={{ marginLeft: "34.5px" }}></CgProfile>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key='2'>
        <span>Setting</span>
        <AiOutlineSetting style={{ marginLeft: "30px" }}></AiOutlineSetting>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key='3'>
        <span>Archive</span>
        <HiOutlineArchive style={{ marginLeft: "30px" }}></HiOutlineArchive>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item onClick={logout} key='4' danger>
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
      }}>
      <Affix>
        <PageHeader
          className='site-page-header'
          onBack={() => window.history.back()}
          title={
            <a href='/home' style={{ cursor: "pointer" }}>
              PoinTâche
            </a>
          }
          subTitle='This is a subtitle'
          extra={[
            <div key='1' style={{ display: "flex" }}>
              <div key='1' style={{ marginTop: "3px", marginRight: "40px" }}>
                <Dropdown
                  overlay={notif}
                  trigger={["click"]}
                  placement='bottomRight'>
                  <Badge count={1} size='small' style={{ fontSize: "8px" }}>
                    <IoMdNotificationsOutline
                      style={{
                        fontSize: "25px",
                        color: "black",
                        cursor: "pointer",
                      }}></IoMdNotificationsOutline>
                  </Badge>
                </Dropdown>
              </div>
              <div key='2'>
                <Dropdown
                  overlay={menu}
                  trigger={["click"]}
                  placement='bottomRight'>
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
