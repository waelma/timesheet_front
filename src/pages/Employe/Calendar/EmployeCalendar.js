import React, { useState, useEffect } from "react";
import moment from "moment";
import { Calendar, Badge, Tooltip } from "antd";
import axios from "axios";
import HeaderMenu from "../../../components/HeaderMenu";
import SideMenu from "../../../components/SideMenu";
import "./EmployeCalendar.css";

const calendar = {
  1: {},
  2: {},
  3: {},
  4: {},
  5: {},
  6: {
    1: [
      { type: "warning", content: "This is warning event." },
      { type: "success", content: "This is usual event." },
    ],
    2: [
      { type: "warning", content: "This is warning event." },
      { type: "success", content: "This is usual event." },
    ],
    3: [
      { type: "warning", content: "This is warning event." },
      { type: "success", content: "This is usual event." },
    ],
    4: [
      { type: "warning", content: "This is warning event." },
      { type: "success", content: "This is usual event." },
    ],
  },
  7: {},
  8: {},
};

const EmployeCalendar = () => {
  // const [mounth, setMounth] = useState(Number(moment().format("MM")));
  const [data, setData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8000/api/employe/getEmployeCalendar", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function getListData(value) {
    let mounth = value.month() + 1;
    if (!data[mounth]) return [];
    const day = Number(value.format("DD"));

    return data[mounth][day] || [];
  }

  function dateCellRender(value) {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item, index) => (
          <Tooltip
            key={index}
            placement="topLeft"
            title={`Deadline of task : ${item}`}
          >
            <Badge status={"success"} text={item} />
          </Tooltip>
        ))}
      </ul>
    );
  }

  return (
    <div>
      <HeaderMenu></HeaderMenu>
      <div style={{ display: "flex" }}>
        <SideMenu></SideMenu>
        <div className="calendar">
          <Calendar fullscreen dateCellRender={dateCellRender} />
        </div>
      </div>
    </div>
  );
};

export default EmployeCalendar;
