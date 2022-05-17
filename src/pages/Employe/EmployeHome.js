import { React, useState, useEffect } from "react";
import { Card, Col, Row, Badge } from "antd";
import "./EmployeHome.css";
import { AiOutlinePlus } from "react-icons/ai";
import CreateProject from "./Project/CreateProject/CreateProject";
import HeaderMenu from "../../components/HeaderMenu";
import SideMenu from "../../components/SideMenu";
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
  const color=(etat)=>{
    if(etat==="todo"){
      return "#CACFD2"
    }else if(etat==="inprogress"){
      return "#5DADE2"
    }else if(etat==="test"){
      return "#F5B041"
    }else{
      return "#58D68D"
    }
  }
  return (
    <div>
      <HeaderMenu></HeaderMenu>
      <div style={{ display: "flex" }}>
        <SideMenu></SideMenu>
        <div className="Home">
          <Row>
            <Col key="0">
              <Card
                style={{marginRight:'20px'}}
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
                <div style={{marginRight:'20px'}}>  
                <Badge.Ribbon text={project.etat} color={color(project.etat)} style={{marginTop:'-10px'}}>
                  <Card
                    className="card"
                    // title={project.name}
                    bordered={true}
                    onClick={() => {
                      navigate(`/project/kanbanTable/${project.id}`);
                    }}
                  ><br />
                    <span style={{fontWeight:"bold"}}>{project.name}</span>
                  </Card>
                </Badge.Ribbon>
                </div>
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
