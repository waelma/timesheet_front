import { React, useState } from "react";
import { Card, Col, Row, Drawer, Button, Steps } from "antd";
import "./Home.css";
import { AiOutlinePlus } from "react-icons/ai";

import CreateProject from "./CreateProject";


const Home = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="site-card-wrapper">
      <Row gutter={16}>
        <Col span={8}>
          <Card
            className="card"
            bordered={true}
            onClick={() => {
              setVisible(true);
            }}
          >
            <AiOutlinePlus></AiOutlinePlus>
            <br></br>
            <span> Create new project</span>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="card" title="Project title" bordered={true}>
            Card content
          </Card>
        </Col>
        <Col span={8}>
          <Card className="card" title="Project title" bordered={true}>
            Card content
          </Card>
        </Col>
      </Row>
      <Drawer
        title={"Create new project"}
        placement="right"
        size={"large"}
        onClose={() => {
          setVisible(false);
        }}
        visible={visible}
      >
        <CreateProject></CreateProject>
      </Drawer>
    </div>
  );
};

export default Home;
