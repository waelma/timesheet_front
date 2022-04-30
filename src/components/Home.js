import { React, useState } from "react";
import { Card, Col, Row, Button, Steps } from "antd";
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
      <CreateProject setVisible={setVisible} visible={visible}></CreateProject>
    </div>
  );
};

export default Home;
