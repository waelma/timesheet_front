import React from "react";
import { Drawer, Statistic, Progress, Timeline, Card } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import "./Statistics.css";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

const Statistics = ({ setVisible, visible }) => {
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
      <div style={{ display: "flex", marginBottom: "50px" }}>
        <div style={{ width: "50%", textAlign: "center" }}>
          <span style={{ fontWeight: "bold" }}>Days left</span>
          <Progress
            width={100}
            type="circle"
            percent={50}
            strokeColor={getColor(50)}
            format={() => `42 Days`}
            style={{ marginTop: "10px" }}
          />
        </div>
        <div style={{ width: "50%", textAlign: "center" }}>
          <span style={{ fontWeight: "bold" }}>Project progress</span>
          <Progress
            width={100}
            type="circle"
            percent={80}
            strokeColor={getColor(80)}
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
              value={11.28}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </div>
        <div style={{ width: "50%", textAlign: "center" }}>
          <span style={{ fontWeight: "bold" }}>Estimated remaining days</span>
          <Card className="statCard">
            <Statistic
              value={28}
              valueStyle={{ color: "#3f8600" }}
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
          <Timeline.Item color="green" label="2022-02-25">
            Create project
          </Timeline.Item>
          <Timeline.Item color="green" label="2022-02-27">
            launch Task 1
          </Timeline.Item>
          <Timeline.Item color="green" label="2022-03-01">
            launch Task 2
          </Timeline.Item>
          <Timeline.Item color="green" label="2022-03-10">
            Task 1 completed
          </Timeline.Item>
          <Timeline.Item color="#00CCFF">Task 2 in progress</Timeline.Item>
        </Timeline>
      </div>
    </Drawer>
  );
};

export default Statistics;
