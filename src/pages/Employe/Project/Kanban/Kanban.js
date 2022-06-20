import { React, useEffect, useState } from "react";
import Board, { moveCard } from "@lourenci/react-kanban";
import "@lourenci/react-kanban/dist/styles.css";
import "./Kanban.css";
import { Spin, message } from "antd";
import Task from "./Task/Task";
import HeaderMenu from "../../../../components/HeaderMenu";
import SideMenu from "../../../../components/SideMenu";
import KanbanSideMenu from "./KanbanSideMenu/KanbanSideMenu";
import axios from "axios";
import { useParams } from "react-router";
import { Navigate } from "react-router-dom";
import Pusher from "pusher-js";

const Kanban = () => {
  const token = localStorage.getItem("token");
  const userID = localStorage.getItem("user_id");
  const { id } = useParams();
  let [ok, setOk] = useState(true);
  const [controlledBoard, setBoard] = useState();
  const [projectDate, setProjectDate] = useState([]);
  const [update, forceUpdate] = useState(0);
  const [statistics, setStatistics] = useState();
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/project/getProject/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setBoard(response.data);
          setOk(false);
        }
      })
      .catch(() => {
        window.history.back();
      });
    const pusher = new Pusher("b9d29c42996852d3dd6c", {
      cluster: "eu",
      encrypted: true,
    });
    const channel = pusher.subscribe(
      "channel".concat(localStorage.getItem("user_id"))
    );
    channel.bind("projectUpdate", (data) => {
      console.log(data);
      setBoard(data.message.original);
    });
    return () => pusher.unsubscribe(channel);
  }, [id, update]);

  const changeState = (id, newState) => {
    let data = {
      state: newState,
      user_id: localStorage.getItem("user_id"),
    };
    axios
      .put(`http://localhost:8000/api/task/changeState/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
        forceUpdate(Math.random());
      });
  };

  function ControlledBoard() {
    function handleCardMove(_card, source, destination) {
      const updatedBoard = moveCard(controlledBoard, source, destination);
      if (destination.toColumnId === 0) {
        _card.state = "todo";
        changeState(_card.id, "todo");
      } else if (destination.toColumnId === 1) {
        _card.state = "inprogress";
        changeState(_card.id, "inprogress");
      } else if (destination.toColumnId === 2) {
        _card.state = "test";
        changeState(_card.id, "test");
      } else if (destination.toColumnId === 3) {
        if (localStorage.getItem("role") === "2") {
          _card.state = "done";
          changeState(_card.id, "done");
        } else {
          _card.state = "test";
          changeState(_card.id, "test");
          message.error({
            content:
              "You cannot move in the finish column without the manager's approval!",
            key: "updatable",
            duration: 5,
          });
        }
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
          {
            description,
            id,
            title,
            state,
            members,
            dateD,
            dateF,
            subTache,
            comments,
            files,
          },
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
            dateD={dateD}
            dateF={dateF}
            subTache={subTache}
            projectMembers={controlledBoard.employes_projects}
            comment={comments}
            files={files}
            // dragging={dragging}
          ></Task>
        )}
      >
        {controlledBoard}
      </Board>
    );
  }

  return (
    <div>
      <HeaderMenu projectTitle={controlledBoard?.name || ""}></HeaderMenu>
      <div style={{ display: "flex" }}>
        <SideMenu></SideMenu>
        {ok ? (
          <div
            style={{ width: "100%", textAlign: "center", paddingTop: "150px" }}
          >
            <Spin size="large" />
          </div>
        ) : (
          <>
            <div className="Kanban">
              <ControlledBoard />
            </div>
            <KanbanSideMenu
              forceUpdate={forceUpdate}
              id={id}
              members={controlledBoard.employes_projects}
              controlledBoard={controlledBoard}
            ></KanbanSideMenu>
          </>
        )}
      </div>
    </div>
  );
};

export default Kanban;
