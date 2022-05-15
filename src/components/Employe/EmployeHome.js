import { React, useState, useEffect } from "react";
import { Card, Col, Row } from "antd";
import "./EmployeHome.css";
import { AiOutlinePlus } from "react-icons/ai";
import CreateProject from "../../pages/ChefProjet/CreateProject/CreateProject";
import HeaderMenu from "../HeaderMenu";
import SideMenu from "../SideMenu";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router";

const token = localStorage.getItem("token");

const EmployeHome = () => {
  let navigate = useNavigate();
  let [projects, setProjects] = useState([]);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/chefProjet/getChefProjects`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
        setProjects(response.data);
      });
  }, []);

  return (
    <div>
      <HeaderMenu></HeaderMenu>
      <div style={{ display: "flex" }}>
        <SideMenu></SideMenu>
        <div className="Home">
          <Row>
            <Col key="0">
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
            {projects.map((project) => (
              <Col key={project.id}>
                <Card
                  className="card"
                  title={project.name}
                  bordered={true}
                  onClick={() => {
                    navigate(`/project/kanbanTable/${project.id}`);
                  }}
                >
                  {project.etat}
                </Card>
              </Col>
            ))}
          </Row>
          <CreateProject
            setVisible={setVisible}
            visible={visible}
          ></CreateProject>
        </div>
      </div>
    </div>
  );
};

export default EmployeHome;
