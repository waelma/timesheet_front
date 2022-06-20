import { React, useState, useCallback, useRef, useEffect } from "react";
import {
  Comment,
  Tooltip,
  List,
  Input,
  Button,
  Avatar,
  Empty,
  Form,
  Drawer,
} from "antd";
import moment from "moment";
import { SendOutlined } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import Pusher from "pusher-js";
const GroupeMessaging = ({ id, setVisible, visible }) => {
  const token = localStorage.getItem("token");
  const [form] = Form.useForm();
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const messagesRef = useRef();
  const [messages, setMessages] = useState([]);
  const [avatar, setAvatar] = useState();
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/project/groupeMessage/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setMessages(response.data);
        const messagesDiv = messagesRef.current.querySelector(
          ".infinite-scroll-component"
        );
        messagesDiv.scrollTo(0, 100000);
      });
    axios
      .get(`http://localhost:8000/api/employe/userPhoto`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setAvatar(response.data);
      });

    const pusher = new Pusher("b9d29c42996852d3dd6c", {
      cluster: "eu",
      encrypted: true,
    });
    const channel = pusher.subscribe(
      "channel".concat(localStorage.getItem("user_id"))
    );
    channel.bind("updateGroupeMessage", (data) => {
      setMessages(data.message.original);
      const messagesDiv = messagesRef.current.querySelector(
        ".infinite-scroll-component"
      );
      messagesDiv.scrollTo(0, 100000);
    });
  }, []);
  return (
    <Drawer
      title={"Group Messaging"}
      placement="right"
      onClose={() => {
        setVisible(false);
      }}
      visible={visible}
    >
      <div style={{ height: "90%", marginRight: "-10px" }}>
        <div ref={messagesRef}>
          {messages.length ? (
            <InfiniteScroll
              inverse={true}
              height="480px"
              dataLength={messages.length}
            >
              <List
                //   header={`${data.length} replies`}
                itemLayout="horizontal"
                dataSource={messages}
                renderItem={(item) => (
                  <li>
                    <Comment
                      // actions={item.actions}
                      author={
                        item.user[0].firstName + " " + item.user[0].lastName
                      }
                      avatar={item.user[0].photo}
                      content={item.message}
                      datetime={
                        <Tooltip
                          title={moment(item.date).format(
                            "YYYY-MM-DD HH:mm:ss"
                          )}
                        >
                          <span>{moment(item.date).fromNow()}</span>
                        </Tooltip>
                      }
                    />
                  </li>
                )}
              />
            </InfiniteScroll>
          ) : (
            <Empty
              description={"No message"}
              style={{ height: "480px", paddingTop: "100px" }}
            />
          )}
        </div>
        <div style={{ position: "revert", bottom: "10px", marginTop: "5px" }}>
          <Form
            form={form}
            onFinish={(values) => {
              let data = {
                message: values.message,
                project_id: id,
                user_id: localStorage.getItem("user_id"),
                date: moment().format("YYYY-MM-DD HH:mm:ss"),
              };
              axios
                .post(
                  `http://localhost:8000/api/project/addGroupeMessage`,
                  data,
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  }
                )
                .then((response) => {
                  const newMessage = [...messages];
                  newMessage.push({
                    user: [
                      {
                        firstName: response.data.firstName,
                        lastName: response.data.lastName,
                        photo: response.data.photo,
                      },
                    ],
                    message: values.message,
                  });
                  setMessages(newMessage);

                  form.resetFields();
                  forceUpdate();
                  if (!messagesRef.current) return;
                  const messagesDiv = messagesRef.current.querySelector(
                    ".infinite-scroll-component"
                  );
                  if (!messagesDiv) return;
                  messagesDiv.scrollTo(0, 1000000);
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
                  icon={<SendOutlined style={{ marginLeft: "1px" }} />}
                />
              </Tooltip>
            </div>
          </Form>
        </div>
      </div>
    </Drawer>
  );
};

export default GroupeMessaging;
