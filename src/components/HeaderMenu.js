import { React, useEffect, useState } from "react";
import { PageHeader, Affix, Avatar, Dropdown, Menu, Badge } from "antd";
import { IoMdNotificationsOutline } from "react-icons/io";
import { HiOutlineLogout } from "react-icons/hi";
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
      .get(`http://localhost:8000/api/employe/userPhoto`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setAvatar(response.data);
      });
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
      <Menu.Item onClick={logout} key="3" danger>
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
          title="PoinTache"
          subTitle="This is a subtitle"
          extra={[
            <div style={{ display: "flex" }}>
              <div style={{ marginTop: "3px", marginRight: "40px" }}>
                <Dropdown
                  overlay={menu}
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
              <div>
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
