import React from "react";
import { Result, Button } from "antd";
import axios from "axios";
import { BsArrowReturnLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const token = localStorage.getItem("token");

const SuccessCreate = ({ title, tags, backlog, dates, setCurrent }) => {
  let navigate = useNavigate();
  return (
    <div>
      <BsArrowReturnLeft
        style={{
          position: "absolute",
          right: "30px",
          fontSize: "20px",
          cursor: "pointer",
        }}
        onClick={() => {
          setCurrent(3);
        }}
      ></BsArrowReturnLeft>
      <Result
        status="success"
        title="Project created successfully"
        extra={[
          <Button
            type="primary"
            key="console"
            onClick={() => {
              let data = {
                title: title,
                tags: tags,
                backlog: backlog,
                dateDebut: dates[0],
                dateFin: dates[1],
              };
              axios
                .post(
                  `http://localhost:8000/api/chefProjet/createProject`,
                  data,
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  }
                )
                .then((response) => {
                  console.log(response.data);
                  navigate("/project/kanbanTable");
                });
            }}
          >
            project access
          </Button>,
        ]}
      />
    </div>
  );
};

export default SuccessCreate;
