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
} from "antd";
import moment from "moment";
import { SendOutlined } from "@ant-design/icons";
import { MdAddComment } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroll-component";
const data = [
  // {
  //     author: "Han Solo",
  //     avatar: "https://joeschmoe.io/api/v1/random",
  //     content: (
  //       <p>
  //         We supply a series of design principles, practical patterns and high
  //         quality design resources (Sketch and Axure).
  //       </p>
  //     ),
  //     datetime: (
  //       <Tooltip
  //         title={moment().subtract(1, "days").format("YYYY-MM-DD HH:mm:ss")}
  //       >
  //         <span>{moment().subtract(1, "days").fromNow()}</span>
  //       </Tooltip>
  //     ),
  //   },
  {
    author: "Han Solo",
    avatar: "http://localhost:8000/uploads/users/photParDefault.jpeg",
    content: (
      <p>
        Hello team, We have an urgent meeting this afternoon to discuss the
        progress of your current work. Please be on time.
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
    avatar: "http://localhost:8000/uploads/users/photParDefault.jpeg",
    content: (
      <p>
        Hello team, We are late on the deadline please hurry up a little bit.
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
const TaskComments = () => {
  const [form] = Form.useForm();
  const [commentHeight, setCommentHeight] = useState();
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  // useEffect(()=>{
  // setCommentHeight(document.getElementById('commentsId').clientHeight-10);
  // },[])
  return (
    <div style={{ height: "90%" }}>
      <div id="commentsId" style={{ height: "300px" }}>
        {data.length ? (
          <InfiniteScroll
            inverse={true}
            height="290px"
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
          <Empty description={"No comment"} />
        )}
      </div>
      <div style={{ position: "revert", bottom: "10px" }}>
        <Form
          form={form}
          onFinish={(values) => {
            console.log(values.comment);
            data.push({
              author: "Han Solo",
              avatar: "https://joeschmoe.io/api/v1/random",
              content: <p>{values.comment}</p>,
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
            <Avatar src="http://localhost:8000/uploads/users/photParDefault.jpeg" />
            <Form.Item
              style={{ marginLeft: "10px", marginRight: "5px", width: "100%" }}
              name="comment"
              rules={[
                {
                  required: true,
                  message: "Please enter a comment!",
                },
              ]}
            >
              <Input
                placeholder="Comment..."
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
  );
};

export default TaskComments;
