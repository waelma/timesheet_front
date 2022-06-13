import { React, useEffect, useState } from "react";
import { Card, Avatar } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import "./Task.css";
import TaskModel from "./TaskModel";
var months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
const Task = ({
  description,
  id,
  title,
  color,
  removeCard,
  dragging,
  members,
  dateD,
  dateF,
  subTache,
  projectMembers,
  comment,
  files,
  forceUpdate,
}) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    console.log();
  }, []);
  return (
    <>
      <Card
        className="task"
        dragging={dragging}
        onClick={() => {
          setVisible(true);
        }}
      >
        <div className="taskTitle" style={{ backgroundColor: color }}>
          {title}
        </div>
        <div>
          <span
            style={{
              paddingTop: "4px",
              paddingLeft: "4px",
              fontSize: "12px",
              fontWeight: "500",
              color: "#707B7C ",
            }}
          >
            {dateD && dateF ? (
              <>
                <BiTimeFive
                  style={{ fontSize: "15px", marginBottom: "-3px" }}
                ></BiTimeFive>{" "}
                {String(dateD).substr(8, 2) +
                  " " +
                  months[parseInt(String(dateD).substr(5, 2)) - 1] +
                  " - " +
                  String(dateF).substr(8, 2) +
                  " " +
                  months[parseInt(String(dateF).substr(5, 2)) - 1]}
              </>
            ) : (
              <></>
            )}
          </span>
          <Avatar.Group
            style={{
              position: "absolute",
              right: "8px",
              paddingTop: "4px",
              fontSize: "16px",
            }}
            maxCount={2}
            maxStyle={{
              color: "",
              backgroundColor: "#D0D3D4",
            }}
          >
            {members.map((member) => (
              <Avatar key={member.id} src={member.photo} />
            ))}
          </Avatar.Group>
        </div>
      </Card>
      <TaskModel
        description={description}
        id={id}
        title={title}
        members={members}
        dateD={dateD}
        dateF={dateF}
        projectMembers={projectMembers}
        subTache={subTache}
        comment={comment}
        files={files}
        setVisible={setVisible}
        visible={visible}
        forceUpdate={forceUpdate}
      ></TaskModel>
    </>
  );
};

export default Task;
