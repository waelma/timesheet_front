import React, { useEffect, useState } from "react";
import { Drawer, Statistic, Progress, Timeline, Card, Tooltip } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import "./Statistics.css";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import axios from "axios";
import moment from "moment";
const Statistics = ({ id, setVisible, visible, controlledBoard }) => {
  let [stat, setStat] = useState();
  const getColor = (percent) => {
    if (percent >= 90) {
      return "#52BE80";
    } else if (percent >= 70) {
      return "#58D68D";
    } else if (percent >= 50) {
      return "#F4D03F";
    } else if (percent >= 30) {
      return "#F5B041";
    } else if (percent >= 15) {
      return "#EC7063";
    } else {
      return "#E74C3C";
    }
  };
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/project/getStatistcs/${id}`)
      .then((response) => {
        setStat(response.data);
      });
  }, [controlledBoard]);
  return (
    <Drawer
      // size={"large"}
      title={"Project statistics"}
      placement="right"
      onClose={() => {
        setVisible(false);
      }}
      visible={visible}
      className="Statistics"
    >
      {stat && (
        <>
          <div style={{ display: "flex", marginBottom: "50px" }}>
            <div style={{ width: "50%", textAlign: "center", display: "grid" }}>
              <span style={{ fontWeight: "bold" }}>Days left</span>
              <Progress
                width={100}
                type="circle"
                percent={parseInt(stat.daysLeftPercent)}
                strokeColor={getColor(stat.daysLeftPercent)}
                format={() => `${stat.daysLeft} Days`}
                style={{ marginTop: "10px" }}
              />
            </div>
            <div style={{ width: "50%", textAlign: "center" }}>
              <span style={{ fontWeight: "bold" }}>Project progress</span>
              <Progress
                width={100}
                type="circle"
                percent={parseInt(stat.progress)}
                strokeColor={getColor(stat.progress)}
                style={{ marginTop: "10px" }}
              />
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%", textAlign: "center" }}>
              <span style={{ fontWeight: "bold" }}>Advance</span>
              <Card className="statCard">
                <Statistic
                  title="Active"
                  value={Math.abs(stat.advance)}
                  precision={2}
                  valueStyle={
                    stat.advance >= 0
                      ? { color: "#3f8600" }
                      : { color: "#E74C3C" }
                  }
                  prefix={
                    stat.advance >= 0 ? (
                      <ArrowUpOutlined />
                    ) : (
                      <ArrowDownOutlined />
                    )
                  }
                  suffix="%"
                />
              </Card>
            </div>
            <div style={{ width: "50%", textAlign: "center" }}>
              <span style={{ fontWeight: "bold" }}>
                Estimated remaining days
              </span>
              <Card className="statCard">
                <Statistic
                  value={parseInt(stat.estimatedDays)}
                  valueStyle={
                    stat.estimatedDays <= stat.daysLeft
                      ? { color: "#3f8600" }
                      : { color: "#E74C3C" }
                  }
                  suffix="days"
                />
              </Card>
            </div>
          </div>
          <div>
            <span style={{ fontWeight: "bold" }}>project timeline </span>
            <Timeline
              mode="left"
              style={{ textAlign: "center", marginTop: "10px" }}
            >
              {stat.history.map((element, index) => (
                <Timeline.Item
                  key={index}
                  color="green"
                  label={
                    <Tooltip
                      title={moment(element.date).format("YYYY-MM-DD HH:mm:ss")}
                    >
                      {moment(element.date).format("YYYY-MM-DD")}
                    </Tooltip>
                  }
                >
                  {element.name}
                </Timeline.Item>
              ))}

              {/* <Timeline.Item color="green" label="2022-02-27">
                launch Task 1
              </Timeline.Item>
              <Timeline.Item color="green" label="2022-03-01">
                launch Task 2
              </Timeline.Item>
              <Timeline.Item color="green" label="2022-03-10">
                Task 1 completed
              </Timeline.Item>
              <Timeline.Item color="#00CCFF">Task 2 in progress</Timeline.Item> */}
            </Timeline>
          </div>
        </>
      )}
    </Drawer>
  );
};

export default Statistics;
