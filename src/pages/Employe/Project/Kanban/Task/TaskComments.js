import { React, useState, useCallback, useEffect, useRef } from "react";
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
import axios from "axios";
const TaskComments = ({ comment, tache_id }) => {
  const [form] = Form.useForm();
  const commentsRef = useRef();
  const [commentHeight, setCommentHeight] = useState();
  const [comments, setComments] = useState(comment);
  const [avatar, setAvatar] = useState();
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/employe/userPhoto`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setAvatar(response.data);
      });
    if (comments.length) {
      const commentsDiv = commentsRef.current.querySelector(
        ".infinite-scroll-component"
      );

      commentsDiv.scrollTo(0, 100000);
    }
    // setCommentHeight(document.getElementById('commentsId').clientHeight-10);
  }, []);
  return (
    <div style={{ height: "90%" }}>
      <div id="commentsId" ref={commentsRef} style={{ height: "300px" }}>
        {comments.length ? (
          <InfiniteScroll
            inverse={true}
            height="290px"
            dataLength={comments.length}
          >
            <List
              //   header={`${data.length} replies`}
              itemLayout="horizontal"
              dataSource={comments}
              renderItem={(item) => (
                <li>
                  <Comment
                    actions={item.actions}
                    author={
                      item.user[0].firstName + " " + item.user[0].lastName
                    }
                    avatar={item.user[0].photo}
                    content={item.comment}
                    // datetime={item.datetime}
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
            let data = {
              comment: values.comment,
              tache_id: tache_id,
              user_id: localStorage.getItem("user_id"),
            };
            axios
              .post(`http://localhost:8000/api/task/addComment`, data, {
                headers: { Authorization: `Bearer ${token}` },
              })
              .then((response) => {
                console.log(response.data);
                const newComments = [...comments];
                newComments.push({
                  user: [
                    {
                      firstName: response.data.firstName,
                      lastName: response.data.lastName,
                      photo: response.data.photo,
                    },
                  ],
                  comment: values.comment,
                });
                setComments(newComments);

                form.resetFields();
                forceUpdate();

                const commentsDiv = commentsRef.current.querySelector(
                  ".infinite-scroll-component"
                );

                commentsDiv.scrollTo(0, 100000);
              });
          }}
          autoComplete="off"
        >
          <div style={{ display: "flex" }}>
            <Avatar src={avatar} />
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
