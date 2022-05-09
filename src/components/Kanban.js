import { React, useState } from "react";
import Board, { moveCard } from "@lourenci/react-kanban";
import "@lourenci/react-kanban/dist/styles.css";
import "./Kanban.css";
import { Card, Avatar, Tooltip } from "antd";
import Task from "./Task";
import HeaderMenu from "./HeaderMenu";
import SideMenu from "./SideMenu";
import KanbanSideMenu from "./KanbanSideMenu";

const Kanban = () => {
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
            state: "Backlog",
          },
          {
            id: 2,
            title: "Card title 2",
            description: "Card content",
            state: "Backlog",
          },
          {
            id: 3,
            title: "Card title 3",
            description: "Card content",
            state: "Backlog",
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
            state: "Doing",
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
            state: "Test",
          },
          {
            id: 11,
            title: "Card title 11",
            description: "Card content",
            state: "Test",
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
            state: "Finish",
          },
          {
            id: 13,
            title: "Card title 13",
            description: "Card content",
            state: "Finish",
          },
        ],
      },
    ],
  };

  function ControlledBoard() {
    const [controlledBoard, setBoard] = useState(board);

    function handleCardMove(_card, source, destination) {
      const updatedBoard = moveCard(controlledBoard, source, destination);
      console.log(_card);
      console.log(destination.toColumnId);
      if (destination.toColumnId === 1) {
        _card.state = "Backlog";
      } else if (destination.toColumnId === 2) {
        _card.state = "Doing";
      } else if (destination.toColumnId === 3) {
        _card.state = "Test";
      } else if (destination.toColumnId === 4) {
        _card.state = "Finish";
      }
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
        renderCard={(
          { description, id, title, state },
          { removeCard, dragging }
        ) =>
          state === "Backlog" ? (
            <Task
              description={description}
              id={id}
              title={title}
              color={"#CACFD2 "}
              removeCard={removeCard}
              dragging={dragging}
            ></Task>
          ) : state === "Doing" ? (
            <Task
              description={description}
              id={id}
              title={title}
              color={"#58D68D"}
              removeCard={removeCard}
              dragging={dragging}
            ></Task>
          ) : state === "Test" ? (
            <Task
              description={description}
              id={id}
              title={title}
              color={"#F5B041"}
              removeCard={removeCard}
              dragging={dragging}
            ></Task>
          ) : (
            <Task
              description={description}
              id={id}
              title={title}
              color={"#5DADE2"}
              removeCard={removeCard}
              dragging={dragging}
            ></Task>
          )
        }
      >
        {controlledBoard}
      </Board>
    );
  }

  return (
    <div>
      <HeaderMenu></HeaderMenu>
      <div style={{ display: "flex" }}>
        <SideMenu></SideMenu>
        <div className="Kanban">
          <ControlledBoard />
        </div>
        <KanbanSideMenu></KanbanSideMenu>
      </div>
    </div>
  );
};

export default Kanban;
