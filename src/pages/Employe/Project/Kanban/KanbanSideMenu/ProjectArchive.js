import React, { useEffect, useState, useCallback } from "react";
import { Drawer, Empty, List } from "antd";
import axios from "axios";
// const data = [
//   {
//     name: "Task 4",
//     email: "https://joeschmoe.io/api/v1/random",
//     description:
//       "We supply a series of design principles, practical patterns and hig",
//   },
//   {
//     name: "Task 6",
//     email: "https://joeschmoe.io/api/v1/random",
//     description:
//       "We supply a series of design principles, practical patterns and hig",
//   },
// ];
const ProjectArchive = ({ id, setVisible, visible, refresh }) => {
  const token = localStorage.getItem("token");
  let [data, setData] = useState([]);
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/task/getArchivedTask/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      });
  }, [visible]);
  return (
    <Drawer
      title={"Project archive"}
      placement="right"
      onClose={() => {
        setVisible(false);
      }}
      visible={visible}
    >
      {data && (
        <div>
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item, index) => (
              <div key={index}>
                <List.Item
                  key={index}
                  actions={[
                    <span
                      style={{ cursor: "pointer", color: "#58D68D" }}
                      onClick={() => {
                        axios
                          .get(
                            `http://localhost:8000/api/task/restoreTask/${item.id}`,
                            {
                              headers: { Authorization: `Bearer ${token}` },
                            }
                          )
                          .then((response) => {
                            refresh(Math.random());
                            setVisible(false);
                          });
                      }}
                    >
                      restore
                    </span>,
                    <span
                      style={{ cursor: "pointer", color: "#EC7063" }}
                      onClick={() => {
                        axios
                          .delete(
                            `http://localhost:8000/api/task/deleteTask/${item.id}`,
                            {
                              headers: { Authorization: `Bearer ${token}` },
                            }
                          )
                          .then((response) => {
                            setData(response.data);
                          });
                      }}
                    >
                      delete
                    </span>,
                  ]}
                >
                  <List.Item.Meta
                    title={item.name}
                    description={item.details}
                  />
                  {/* <span style={{ color: "#515A5A" }}>"ddddd"</span> */}
                </List.Item>
              </div>
            )}
          />
        </div>
      )}
    </Drawer>
  );
};

export default ProjectArchive;
