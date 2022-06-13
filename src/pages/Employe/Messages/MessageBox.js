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
  Spin,
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
import Pusher from "pusher-js";
const { Option } = Select;
const MessageBox = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [form] = Form.useForm();
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const messagesRef = useRef();
  let [messages, setMessages] = useState([]);
  let [users, setUsers] = useState([]);
  let [searchUsers, setSearchUsers] = useState([]);
  const [avatar, setAvatar] = useState();
  const [wait, setWait] = useState(false);
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8000/api/Messages/getMessages/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setMessages(response.data);
          setWait(false);
          const messagesDiv = messagesRef.current.querySelector(
            ".infinite-scroll-component"
          );

          if (messagesDiv) messagesDiv.scrollTo(0, 100000);
        });
    }
    axios
      .get(`http://localhost:8000/api/employe/getUsers`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUsers(response.data);
        setSearchUsers(response.data);
      });
    axios
      .get(`http://localhost:8000/api/employe/userPhoto`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setAvatar(response.data);
      });

    const pusher = new Pusher("e43b09785ab7ef07b82f", {
      cluster: "eu",
      encrypted: true,
    });
    const channel = pusher.subscribe(
      "channel".concat(localStorage.getItem("user_id"))
    );
    channel.bind("messagesUpdate", (data) => {
      console.log(data.message.original);
      setMessages(data.message.original);
      const messagesDiv = messagesRef.current.querySelector(
        ".infinite-scroll-component"
      );

      if (messagesDiv) messagesDiv.scrollTo(0, 100000);
    });

    return () => pusher.unsubscribe(channel);
  }, [id]);

  return (
    <div>
      <HeaderMenu></HeaderMenu>
      <div style={{ display: "flex" }}>
        <SideMenu></SideMenu>
        {messages && avatar && users ? (
          <div className="messageBox">
            <div style={{ width: "75%" }}>
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
                  {wait ? (
                    <>
                      <div style={{ height: "82%" }}>
                        <Skeleton
                          avatar
                          active={true}
                          paragraph={{ rows: 2 }}
                        />
                        <Skeleton
                          active={true}
                          paragraph={{ rows: 2 }}
                          className="messageFromMe"
                        />
                        <Skeleton
                          avatar
                          active={true}
                          paragraph={{ rows: 2 }}
                        />
                      </div>
                    </>
                  ) : (
                    <InfiniteScroll
                      height="435px"
                      inverse
                      dataLength={messages.length}
                    >
                      {messages.map((item, index) =>
                        item.transmitter_id !==
                        parseInt(localStorage.getItem("user_id")) ? (
                          <div style={{ width: "100%" }} key={index}>
                            <Comment
                              className="messageComponent"
                              avatar={<Avatar src={item.transmitter.photo} />}
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
                                    title={moment(item.date).format(
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
                                  title={moment(item.date).format(
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
                  )}
                </div>
                <div style={{ height: "8%" }}>
                  <Form
                    form={form}
                    onFinish={(values) => {
                      let data = {
                        message: values.message,
                        date: moment().format("YYYY-MM-DD HH:mm:ss"),
                      };
                      axios
                        .post(
                          `http://localhost:8000/api/Messages/sendMessage/${id}`,
                          data,
                          {
                            headers: { Authorization: `Bearer ${token}` },
                          }
                        )
                        .then((response) => {
                          const newMessage = [...messages];
                          newMessage.push({
                            message: values.message,
                            date: moment().format("YYYY-MM-DD HH:mm:ss"),
                            transmitter_id: parseInt(
                              localStorage.getItem("user_id")
                            ),
                          });
                          setMessages(newMessage);

                          form.resetFields();

                          forceUpdate();
                          const messagesDiv = messagesRef.current.querySelector(
                            ".infinite-scroll-component"
                          );

                          messagesDiv.scrollTo(0, 100000);
                        });
                    }}
                    autoComplete="off"
                  >
                    <div style={{ display: "flex" }}>
                      <Avatar src={avatar} />
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
            </div>
            <Divider type="vertical" plain />
            <div
              style={{ width: "25%", marginTop: "5px", marginBottom: "5px" }}
            >
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
                        (
                          user.firstName +
                          " " +
                          user.lastName +
                          " " +
                          user.email
                        )
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
                  <VirtualList
                    data={searchUsers}
                    itemHeight={47}
                    itemKey="email"
                  >
                    {(item) => (
                      <div
                        className="userDiscussion"
                        onClick={() => {
                          navigate(`/messages/${item.id}`);
                          setWait(true);
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
        ) : (
          <div
            style={{ width: "100%", textAlign: "center", paddingTop: "150px" }}
          >
            <Spin size="large" />
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
