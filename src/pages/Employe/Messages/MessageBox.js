import { React, useState, useEffect, useRef, useCallback } from "react";
import HeaderMenu from "../../../components/HeaderMenu";
import SideMenu from "../../../components/SideMenu";
import "./MessageBox.css";
import {
  Badge,
  Form,
  Button,
  Divider,
  List,
  Avatar,
  Select,
  Skeleton,
  Tooltip,
  Input,
  Comment,
} from "antd";
import { SendOutlined } from "@ant-design/icons";
import axios from "axios";
import { SearchOutlined } from "@ant-design/icons";
import MenuDivider from "antd/lib/menu/MenuDivider";
import VirtualList from "rc-virtual-list";
import InfiniteScroll from "react-infinite-scroll-component";
import moment from "moment";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
const { Option } = Select;
const MessageBox = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [form] = Form.useForm();
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  let [options, setOptions] = useState([]);
  const messagesRef = useRef();
  let [messages, setMessages] = useState([
    {
      id: 0,
      transmitter: "50",
      receiver: 35,
      transmitter_photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUDnkndWV6_6v_dks3oYlvJZwW6CQiCsV6Uw&usqp=CAU",
      message: "Ahla wnk cv chaamil",
      dateSend: "2022-05-09 01:34:12",
    },
    {
      id: 1,
      transmitter: "35",
      receiver: 50,
      transmitter_photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_d3SP2vKOeGFVESn5rk6xnPiQ0naW2e-ldA&usqp=CAU",
      message:
        "Ahlin, cv hmdl hni 5adem ghatess chwey el periode hedhi elkol wnk inta chaandek jdid dgfdfd gfdgfdgfd dfgdgfdg fdgdg",
      dateSend: "2022-05-09 01:35:12",
    },
    // {
    //   id: 2,
    //   transmitter: "50",
    //   receiver: 35,
    //   transmitter_photo:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUDnkndWV6_6v_dks3oYlvJZwW6CQiCsV6Uw&usqp=CAU",
    //   message:
    //     "Ahlc rypted -tbn0.gstati  c.co m/im ages?q=  tbn:ANd9Gc T_d3SP2vKO.eGFVESn5rk6 xnPiQ0naW2e-ldA&usqp=l",
    //   dateSend: "2022-05-09 01:36:12",
    // },
    {
      id: 3,
      transmitter: "50",
      receiver: 35,
      transmitter_photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUDnkndWV6_6v_dks3oYlvJZwW6CQiCsV6Uw&usqp=CAU",
      message:
        "Ahla wnk cv chcrypted- tbn0.gstatic. com/images?q  =tbn:ANd9Gc T_d3SP2vK OeGFVES n5rk6xnP iQ0naW2 e-ldA&usqp=a amil",
      dateSend: "2022-05-09 01:40:12",
    },
    {
      id: 4,
      transmitter: "35",
      receiver: 50,
      transmitter_photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUDnkndWV6_6v_dks3oYlvJZwW6CQiCsV6Uw&usqp=CAU",
      message:
        "Ahla wnk cv chcrypted- tbn0.gstatic. com/images?q  =tbn:ANd9Gc T_d3SP2vK OeGFVES n5rk6xnP iQ0naW2 e-ldA&usqp=a amil",
      dateSend: "2022-05-09 01:42:12",
    },
    {
      id: 5,
      transmitter: "50",
      receiver: 35,
      transmitter_photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUDnkndWV6_6v_dks3oYlvJZwW6CQiCsV6Uw&usqp=CAU",
      message:
        "Ahla wnk cv chcrypted- tbn0.gstatic. com/images?q  =tbn:ANd9Gc T_d3SP2vK OeGFVES n5rk6xnP iQ0naW2 e-ldA&usqp=a amil",
      dateSend: "2022-05-09 01:44:12",
    },
  ]);
  let [users, setUsers] = useState([
    {
      id: 0,
      email: "waelma@gmail.com",
      photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_d3SP2vKOeGFVESn5rk6xnPiQ0naW2e-ldA&usqp=CAU",
      firstName: "Wael",
      lastName: "Machlouch",
    },
    {
      id: 1,
      email: "firsama@gmail.com",
      photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUDnkndWV6_6v_dks3oYlvJZwW6CQiCsV6Uw&usqp=CAU",
      firstName: "Firas",
      lastName: "Machlouch",
    },
    {
      id: 2,
      email: "atzahri@gmail.com",
      photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&usqp=CAU",
      firstName: "Zahri",
      lastName: "Atoui",
    },
    {
      id: 3,
      email: "aaaatzahri@gmail.com",
      photo:
        "https://media.istockphoto.com/photos/shot-of-a-young-man-using-his-smartphone-to-send-text-messages-picture-id1358205700?b=1&k=20&m=1358205700&s=170667a&w=0&h=9pXGgsARkOerFs8_XloUCdGhsQXYKyMntJlgDliOEtY=",
      firstName: "Wassef",
      lastName: "Talbi",
    },
    {
      id: 4,
      email: "sdfsdf@gmail.com",
      photo: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      firstName: "Mohamed",
      lastName: "Helmi",
    },
  ]);
  let [searchUsers, setSearchUsers] = useState(users);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/employe/getEmployes`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setOptions(response.data);
      });
    if (messagesRef.current) {
      const messagesDiv = messagesRef.current.querySelector(
        ".infinite-scroll-component"
      );
      if (messagesDiv) messagesDiv.scrollTo(0, 100000);
    }
    console.log("hey");
  }, [id]);

  return (
    <div>
      <HeaderMenu></HeaderMenu>
      <div style={{ display: "flex" }}>
        <SideMenu></SideMenu>
        <div className="messageBox">
          <div style={{ width: "75%" }}>
            {id ? (
              <>
                <div style={{ height: "8%" }}>
                  <Avatar
                    size={40}
                    src={
                      users.filter((item) => item.id === parseInt(id))[0].photo
                    }
                  />
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: "480",
                      marginLeft: "15px",
                    }}
                  >
                    {users.filter((item) => item.id === parseInt(id))[0]
                      .firstName +
                      " " +
                      users.filter((item) => item.id === parseInt(id))[0]
                        .lastName}
                  </span>
                </div>
                <Divider />
                <div style={{ height: "82%" }} ref={messagesRef}>
                  <InfiniteScroll
                    height="435px"
                    inverse
                    dataLength={messages.length}
                  >
                    {messages.map((item, index) =>
                      item.transmitter !== localStorage.getItem("user_id") ? (
                        <div style={{ width: "100%" }} key={index}>
                          <Comment
                            className="messageComponent"
                            avatar={
                              <Avatar
                                src={
                                  users.filter(
                                    (item) => item.id === parseInt(id)
                                  )[0].photo
                                }
                              />
                            }
                            content={
                              <div
                                className="message"
                                style={{
                                  backgroundColor: "#ECF0F1 ",
                                  padding: "5px",
                                  paddingLeft: "10px",
                                  paddingRight: "10px",
                                  borderRadius: "15px",
                                }}
                              >
                                <Tooltip
                                  title={moment(item.dateSend).format(
                                    "YYYY-MM-DD HH:mm:ss"
                                  )}
                                >
                                  {item.message}
                                </Tooltip>
                              </div>
                            }
                          />
                        </div>
                      ) : (
                        <Comment
                          key={index}
                          className="myMessageComponent"
                          content={
                            <div
                              className="message"
                              style={{
                                backgroundColor: "#1890ff",
                                color: "white",
                                padding: "5px",
                                paddingLeft: "10px",
                                paddingRight: "10px",
                                borderRadius: "15px",
                                float: "right",
                                marginRight: "3px",
                              }}
                            >
                              <Tooltip
                                title={moment(item.dateSend).format(
                                  "YYYY-MM-DD HH:mm:ss"
                                )}
                              >
                                {item.message}
                              </Tooltip>
                            </div>
                          }
                        />
                      )
                    )}
                  </InfiniteScroll>
                </div>
                <div style={{ height: "8%" }}>
                  <Form
                    form={form}
                    onFinish={(values) => {
                      messages.push({
                        id: 3,
                        transmitter: localStorage.getItem("user_id"),
                        receiver: 50,
                        message: values.message,
                        dateSend: moment().format("YYYY-MM-DD HH:mm:ss"),
                      });
                      form.resetFields();

                      forceUpdate();
                      const messagesDiv = messagesRef.current.querySelector(
                        ".infinite-scroll-component"
                      );

                      messagesDiv.scrollTo(0, 100000);
                    }}
                    autoComplete="off"
                  >
                    <div style={{ display: "flex" }}>
                      <Avatar src="https://joeschmoe.io/api/v1/random" />
                      <Form.Item
                        style={{
                          marginLeft: "10px",
                          marginRight: "5px",
                          width: "100%",
                        }}
                        name="message"
                        rules={[
                          {
                            required: true,
                            message: "Please enter a message!",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Message..."
                          style={{ borderRadius: "15px" }}
                        />
                      </Form.Item>
                      <Tooltip title="send">
                        <Button
                          type="primary"
                          htmlType="submit"
                          shape="circle"
                          icon={<SendOutlined style={{ marginLeft: "2px" }} />}
                        />
                      </Tooltip>
                    </div>
                  </Form>
                </div>
              </>
            ) : (
              <>
                <div style={{ height: "8%" }}>
                  <Skeleton.Avatar active={true} size="large" shape="circle" />
                  <Skeleton.Input active={true} className="skeletonUserName" />
                </div>
                <Divider />
                <div style={{ height: "82%" }}>
                  <Skeleton avatar active={true} paragraph={{ rows: 2 }} />
                  <Skeleton
                    active={true}
                    paragraph={{ rows: 2 }}
                    className="messageFromMe"
                  />
                  <Skeleton avatar active={true} paragraph={{ rows: 2 }} />
                  <Skeleton
                    active={true}
                    paragraph={{ rows: 2 }}
                    className="messageFromMe"
                  />
                </div>
              </>
            )}
          </div>
          <Divider type="vertical" plain />
          <div style={{ width: "25%", marginTop: "5px", marginBottom: "5px" }}>
            <Input
              suffix={<SearchOutlined />}
              placeholder="Search"
              style={{
                width: "90%",
                marginLeft: "5px",
                marginBottom: "5px",
                borderRadius: "15px",
              }}
              onChange={(e) => {
                setSearchUsers(
                  users.filter((user) => {
                    if (
                      (user.firstName + " " + user.lastName + " " + user.email)
                        .toUpperCase()
                        .search(e.target.value.toUpperCase()) === -1
                    ) {
                      return false;
                    }
                    return true;
                  })
                );
              }}
            />
            <InfiniteScroll height="75vh" dataLength={users.length}>
              <List>
                <VirtualList data={searchUsers} itemHeight={47} itemKey="email">
                  {(item) => (
                    <div
                      className="userDiscussion"
                      onClick={() => {
                        navigate(`/messages/${item.id}`);
                      }}
                    >
                      <List.Item key={item.email}>
                        <List.Item.Meta
                          avatar={
                            <Avatar
                              src={item.photo}
                              style={{ marginLeft: "10px", marginTop: "8px" }}
                            />
                          }
                          title={item.lastName + " " + item.firstName}
                          description={item.email}
                        />
                      </List.Item>
                    </div>
                  )}
                </VirtualList>
              </List>
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
