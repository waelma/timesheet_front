import { React, useState } from "react";
import { Avatar, Tooltip, Comment } from "antd";
import moment from "moment";

const Messages = () => {
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
  ]);
  return (
    <>
      <Comment
        className="messageComponent"
        avatar={<Avatar src={users[1].photo} alt="Han Solo" />}
        content={
          <div
            style={{
              width: "70%",
            }}
          >
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
              We supply heyaaa.
            </div>
          </div>
        }
        datetime={
          <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
            <span>{moment().fromNow()}</span>
          </Tooltip>
        }
      />
      <Comment
        content={
          <div
            style={{
              width: "70%",
            }}
          >
            <div
              className="message"
              style={{
                backgroundColor: "#1890ff",
                color: "white",
                padding: "5px",
                paddingLeft: "10px",
                paddingRight: "10px",
                borderRadius: "15px",
                position: "fixed",
                right: "5px",
              }}
            >
              We supply heyaaa.
            </div>
          </div>
        }
        datetime={
          <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
            <span>{moment().fromNow()}</span>
          </Tooltip>
        }
      />
    </>
  );
};

export default Messages;
