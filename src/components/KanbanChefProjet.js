import { React, useState } from "react";
import Board, { moveCard } from "@lourenci/react-kanban";
import "@lourenci/react-kanban/dist/styles.css";
import "./Kanban.css";
import { Card, Avatar, Tooltip } from "antd";
import { AiOutlineClose } from 'react-icons/ai';
import { UserOutlined, AntDesignOutlined } from '@ant-design/icons';

const KanbanChefProjet = () => {
  const board = {
    columns: [
      {
        id: 1,
        title: "Backlog",
        cards: [
          {
            id: 1,
            title: "Card title 1",
            description: "Card content",
          },
          {
            id: 2,
            title: "Card title 2",
            description: "Card content",
          },
          {
            id: 3,
            title: "Card title 3",
            description: "Card content",
          },
        ],
      },
      {
        id: 2,
        title: "Doing",
        cards: [
          {
            id: 9,
            title: "Card title 9",
            description: "Card content",
          },
        ],
      },
      {
        id: 3,
        title: "Test",
        cards: [
          {
            id: 10,
            title: "Card title 10",
            description: "Card content",
          },
          {
            id: 11,
            title: "Card title 11",
            description: "Card content",
          },
        ],
      },
      {
        id: 4,
        title: "Finish",
        cards: [
          {
            id: 12,
            title: "Card title 12",
            description: "Card content",
          },
          {
            id: 13,
            title: "Card title 13",
            description: "Card content",
          },
        ],
      },
    ],
  };

  function ControlledBoard() {
    // You need to control the state yourself.
    const [controlledBoard, setBoard] = useState(board);

    function handleCardMove(_card, source, destination) {
      const updatedBoard = moveCard(controlledBoard, source, destination);
      console.log(_card);
      console.log(destination);
      setBoard(updatedBoard);
    }

    function handleCardRemove(_card) {
      console.log(_card);
    }

    return (
      <Board
        onCardDragEnd={handleCardMove}
        disableColumnDrag
        allowRemoveCard
        onCardRemove={handleCardRemove}
        renderCard={({ description, id, title }, { removeCard, dragging }) => (
          <Card
            className="task"
            dragging={dragging}
            onClick={() => {
              console.log(id);
            }}
          >
            <div className="taskTitle">
            {title}
            <AiOutlineClose style={{position:'absolute', right:'8px', paddingTop:'4px', fontSize:'16px'}}></AiOutlineClose>
            </div>
            <div>
            <span style={{paddingTop:'4px',paddingLeft:'4px', fontSize:'12px', fontWeight:'500', color:'#707B7C '}}>08/12-12/9</span>
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
        )}
      >
        {controlledBoard}
      </Board>
    );
  }

  return (
    <div>
      <ControlledBoard />
    </div>
  );
};

export default KanbanChefProjet;
