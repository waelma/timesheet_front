import { React, useState, useEffect } from "react";
import { Card, Col, Row, Tooltip } from "antd";
import "./Archive.css";
import HeaderMenu from "../../../components/HeaderMenu";
import SideMenu from "../../../components/SideMenu";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router";
import {
    DeleteOutlined,ReloadOutlined 
  } from "@ant-design/icons";
const Archive = () => {
    let navigate = useNavigate();
    let [projects, setProjects] = useState([]);
    const token = localStorage.getItem("token");
    useEffect(() => {
        axios
          .get(`http://localhost:8000/api/project/getArchiveProjects`, {
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
        <div className="Archive">
          <Row>
            {projects.map((project) => (
              <Col key={project.id}>
                <div style={{ marginRight: "20px" }}>
                    <Card
                      className="card"
                      // title={project.name}
                      bordered={true}
                      onClick={() => {
                        // navigate(`/project/kanbanTable/${project.id}`);
                      }}
                    >
                      <br />
                      <span style={{ fontWeight: "bold" }}>{project.name}</span>
                      <div >
                          <Tooltip title="Restore">
                      <ReloadOutlined 
                    className="ProjectRestore"
                    onClick={()=>{
                      axios
                      .put(`http://localhost:8000/api/project/restoreProject/${project.id}`,"body", {
                        headers: { Authorization: `Bearer ${token}` },
                      })
                      .then((response) => {
                        console.log(response.data);
                        setProjects(response.data);
                      });
                    }}
                    /></Tooltip>
                                             <Tooltip title="Delete">
                      <DeleteOutlined
                    className="ProjectDelete"
                    onClick={() => {
                      axios
                      .delete(`http://localhost:8000/api/project/deleteProject/${project.id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                      })
                      .then((response) => {
                        console.log(response.data);
                        setProjects(response.data);
                      });
                    }}
                  /></Tooltip>
                  </div>
                    </Card>

                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  )
}

export default Archive
