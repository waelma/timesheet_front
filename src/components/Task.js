import React from "react";
import { Card, Avatar } from "antd";
import { AiOutlineClose } from 'react-icons/ai';
import { BiTimeFive } from 'react-icons/bi';
import "./Task.css";

const Task = ({ description, id, title, color, removeCard, dragging }) => {
  return <Card
  className="task"
  dragging={dragging}
  onClick={() => {
    console.log(id);
  }}
>
  <div className="taskTitle" style={{backgroundColor:color}}>
  {title}
  <AiOutlineClose style={{position:'absolute', right:'8px', paddingTop:'4px', fontSize:'16px'}}></AiOutlineClose>
  </div>
  <div>
  <span style={{paddingTop:'4px',paddingLeft:'4px', fontSize:'12px', fontWeight:'500', color:'#707B7C '}}><BiTimeFive style={{ fontSize:'15px',marginBottom:'-3px'}}></BiTimeFive> 08 apr - 12 dec</span>
  <Avatar.Group
    style={{position:'absolute', right:'8px', paddingTop:'4px', fontSize:'16px'}}
    maxCount={2}
    maxStyle={{
      color: '',
      backgroundColor: '#D0D3D4',
    }}
  >
    <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUDnkndWV6_6v_dks3oYlvJZwW6CQiCsV6Uw&usqp=CAU" />
    <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_d3SP2vKOeGFVESn5rk6xnPiQ0naW2e-ldA&usqp=CAU" />
    <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&usqp=CAU" />
  </Avatar.Group>
  </div>
</Card>
};

export default Task;
