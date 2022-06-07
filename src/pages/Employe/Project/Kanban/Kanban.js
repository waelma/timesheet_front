import { React, useEffect, useState } from "react";
import Board, { moveCard } from "@lourenci/react-kanban";
import "@lourenci/react-kanban/dist/styles.css";
import "./Kanban.css";
import { Card, Avatar, Tooltip } from "antd";
import Task from "./Task/Task";
import HeaderMenu from "../../../../components/HeaderMenu";
import SideMenu from "../../../../components/SideMenu";
import KanbanSideMenu from "./KanbanSideMenu/KanbanSideMenu";
import axios from "axios";
import { useParams } from "react-router";

const token = localStorage.getItem("token");

const Kanban = () => {
  const { id } = useParams();
  const [, forceUpdate] = useState(0);
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
            state: "todo",
            members: [
              {
                photo:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUDnkndWV6_6v_dks3oYlvJZwW6CQiCsV6Uw&usqp=CAU",
              },
              {
                photo:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_d3SP2vKOeGFVESn5rk6xnPiQ0naW2e-ldA&usqp=CAU",
              },
            ],
          },
          {
            id: 2,
            title: "Card title 2",
            description: "Card content",
            state: "todo",
            members: [
              {
                photo:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUDnkndWV6_6v_dks3oYlvJZwW6CQiCsV6Uw&usqp=CAU",
              },
              {
                photo:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_d3SP2vKOeGFVESn5rk6xnPiQ0naW2e-ldA&usqp=CAU",
              },
              {
                photo:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&usqp=CAU",
              },
            ],
          },
          {
            id: 3,
            title: "Card title 3",
            description: "Card content",
            state: "todo",
            members: [
              {
                photo:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUDnkndWV6_6v_dks3oYlvJZwW6CQiCsV6Uw&usqp=CAU",
              },
              {
                photo:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_d3SP2vKOeGFVESn5rk6xnPiQ0naW2e-ldA&usqp=CAU",
              },
            ],
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
            state: "inprogress",
            members: [
              {
                photo:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUDnkndWV6_6v_dks3oYlvJZwW6CQiCsV6Uw&usqp=CAU",
              },
              {
                photo:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&usqp=CAU",
              },
            ],
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
            state: "test",
            members: [
              {
                photo:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_d3SP2vKOeGFVESn5rk6xnPiQ0naW2e-ldA&usqp=CAU",
              },
              {
                photo:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&usqp=CAU",
              },
            ],
          },
          {
            id: 11,
            title: "Card title 11",
            description: "Card content",
            state: "test",
            members: [
              {
                photo:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUDnkndWV6_6v_dks3oYlvJZwW6CQiCsV6Uw&usqp=CAU",
              },
              {
                photo:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&usqp=CAU",
              },
            ],
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
            state: "done",
            members: [
              {
                photo:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUDnkndWV6_6v_dks3oYlvJZwW6CQiCsV6Uw&usqp=CAU",
              },
            ],
          },
          {
            id: 13,
            title: "Card title 13",
            description: "Card content",
            state: "done",
            members: [
              {
                photo:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUDnkndWV6_6v_dks3oYlvJZwW6CQiCsV6Uw&usqp=CAU",
              },
              {
                photo:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_d3SP2vKOeGFVESn5rk6xnPiQ0naW2e-ldA&usqp=CAU",
              },
            ],
          },
        ],
      },
    ],
  };
  // let [ok, setOk] = useState(true);
  const [controlledBoard, setBoard] = useState(board);
  useEffect(() => {
    axios
      .get(
        `https://8dcd-197-244-176-194.eu.ngrok.io/api/project/getProject/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response.data);
        // setBoard(response.data);
        // setTimeout(() => {
        //   setOk(false);
        // }, timeout);
      });
  }, [id]);

  function ControlledBoard() {
    function handleCardMove(_card, source, destination) {
      const updatedBoard = moveCard(controlledBoard, source, destination);
      console.log(_card);
      console.log(destination.toColumnId);
      if (destination.toColumnId === 1) {
        _card.state = "todo";
      } else if (destination.toColumnId === 2) {
        _card.state = "inprogress";
      } else if (destination.toColumnId === 3) {
        _card.state = "test";
      } else if (destination.toColumnId === 4) {
        _card.state = "done";
      }
      setBoard(updatedBoard);
    }

    function handleCardRemove(_card) {
      console.log(_card);
    }

    const color = (etat) => {
      if (etat === "todo") {
        return "#CACFD2";
      } else if (etat === "inprogress") {
        return "#5DADE2";
      } else if (etat === "test") {
        return "#F5B041";
      } else {
        return "#58D68D";
      }
    };

    return (
      <Board
        onCardDragEnd={handleCardMove}
        disableColumnDrag
        allowRemoveCard
        onCardRemove={handleCardRemove}
        renderCard={(
          { description, id, title, state, members },
          { removeCard, dragging }
        ) => (
          <Task
            forceUpdate={forceUpdate}
            key={id}
            description={description}
            id={id}
            title={title}
            color={color(state)}
            members={members}
            removeCard={removeCard}
            // dragging={dragging}
          ></Task>
        )}>
        {controlledBoard}
      </Board>
    );
  }

  return (
    <div>
      <HeaderMenu></HeaderMenu>
      <div style={{ display: "flex" }}>
        <SideMenu></SideMenu>
        <div className='Kanban'>
          <ControlledBoard />
        </div>
        <KanbanSideMenu></KanbanSideMenu>
      </div>
    </div>
  );
};

export default Kanban;
