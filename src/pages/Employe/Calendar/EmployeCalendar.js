import React, { useState } from "react";
import moment from "moment";
import { Calendar, Badge } from "antd";
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
  function getListData(value) {
    let mounth = value.month() + 1;
    if (!calendar[mounth]) return [];
    const day = Number(value.format("DD"));

    return calendar[mounth][day] || [];
  }

  function dateCellRender(value) {
    const listData = getListData(value);
    return (
      <ul className='events'>
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div>
      <HeaderMenu></HeaderMenu>
      <div style={{ display: "flex" }}>
        <SideMenu></SideMenu>
        <div className='calendar'>
          <Calendar fullscreen dateCellRender={dateCellRender} />
        </div>
      </div>
    </div>
  );
};

export default EmployeCalendar;
