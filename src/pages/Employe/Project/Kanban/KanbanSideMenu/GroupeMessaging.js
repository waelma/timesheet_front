import { React, useState, useCallback, useEffect } from "react";
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
const data = [
  {
    author: "Han Solo",
    avatar: "https://joeschmoe.io/api/v1/random",
    content: (
      <p>
        We supply a series of design principles, practical patterns and high
        quality design resources (Sketch and Axure).
      </p>
    ),
    datetime: (
      <Tooltip
        title={moment().subtract(1, "days").format("YYYY-MM-DD HH:mm:ss")}
      >
        <span>{moment().subtract(1, "days").fromNow()}</span>
      </Tooltip>
    ),
  },
  {
    author: "Han Solo",
    avatar: "https://joeschmoe.io/api/v1/random",
    content: (
      <p>
        We supply a series of design principles, practical patterns and high
        quality design resources (Sketch and Axure).
      </p>
    ),
    datetime: (
      <Tooltip
        title={moment().subtract(1, "days").format("YYYY-MM-DD HH:mm:ss")}
      >
        <span>{moment().subtract(1, "days").fromNow()}</span>
      </Tooltip>
    ),
  },
  {
    author: "Han Solo",
    avatar: "https://joeschmoe.io/api/v1/random",
    content: (
      <p>
        We supply a series of design principles, practical patterns and high
        quality design resources (Sketch and Axure).
      </p>
    ),
    datetime: (
      <Tooltip
        title={moment().subtract(2, "days").format("YYYY-MM-DD HH:mm:ss")}
      >
        <span>{moment().subtract(2, "days").fromNow()}</span>
      </Tooltip>
    ),
  },
];
const GroupeMessaging = ({ setVisible, visible }) => {
  const [form] = Form.useForm();
  const [commentHeight, setCommentHeight] = useState();
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  // useEffect(()=>{
  // setCommentHeight(document.getElementById('commentsId').clientHeight-10);
  // },[])
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
        <div>
          {data.length ? (
            <InfiniteScroll
              inverse={true}
              height="480px"
              dataLength={data.length}
            >
              <List
                //   header={`${data.length} replies`}
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item) => (
                  <li>
                    <Comment
                      actions={item.actions}
                      author={item.author}
                      avatar={item.avatar}
                      content={item.content}
                      datetime={item.datetime}
                    />
                  </li>
                )}
              />
            </InfiniteScroll>
          ) : (
            <Empty description={"No message"} />
          )}
        </div>
        <div style={{ position: "revert", bottom: "10px", marginTop: "5px" }}>
          <Form
            form={form}
            onFinish={(values) => {
              console.log(values.comment);
              data.push({
                author: "Han Solo",
                avatar: "https://joeschmoe.io/api/v1/random",
                content: <p>{values.message}</p>,
                datetime: (
                  <Tooltip
                    title={moment()
                      .subtract(1, "days")
                      .format("YYYY-MM-DD HH:mm:ss")}
                  >
                    <span>{moment().subtract(1, "days").fromNow()}</span>
                  </Tooltip>
                ),
              });
              form.resetFields();
              forceUpdate();
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
