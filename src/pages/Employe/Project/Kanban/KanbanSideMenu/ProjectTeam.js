import { React, useEffect, useState, useCallback } from "react";
import {
  Drawer,
  Button,
  AutoComplete,
  List,
  Avatar,
  Form,
  Tooltip,
} from "antd";
import axios from "axios";
import VirtualList from "rc-virtual-list";
import { UserDeleteOutlined } from "@ant-design/icons";
const ProjectTeam = ({ project_id, members, setVisible, visible, refresh }) => {
  const token = localStorage.getItem("token");
  const isEmployee = localStorage.getItem("role") === "1";
  const [form] = Form.useForm();
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  let [options, setOptions] = useState([]);
  let [name, setName] = useState("");
  let [users, setUsers] = useState(members);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/employe/getEmployes`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setOptions(response.data);
      });
    console.log(users);
  }, []);
  return (
    <Drawer
      title={"Project team"}
      placement="right"
      onClose={() => {
        setVisible(false);
        refresh(Math.random());
      }}
      visible={visible}
    >
      {!isEmployee && (
        <Form
          form={form}
          onFinish={(values) => {
            let newItem = options.filter(
              (item) => item.value === values.selectEmploye
            )[0];
            if (
              newItem &&
              members.findIndex((x) => x.id === newItem.id) === -1
            ) {
              let data = {
                user_id: newItem.id,
                project_id: project_id,
              };
              axios
                .post(`http://localhost:8000/api/project/addMember`, data, {
                  headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                  setUsers((oldArray) => [
                    ...oldArray,
                    {
                      id: newItem.id,
                      email: newItem.email,
                      photo: newItem.photo,
                      firstName: newItem.first,
                      lastName: newItem.last,
                    },
                  ]);
                  form.resetFields();
                  forceUpdate();
                });
            }
          }}
        >
          <span style={{ fontWeight: "bold" }}>Add employee</span>
          <div style={{ display: "flex" }}>
            <Form.Item
              name="selectEmploye"
              style={{
                width: "80%",
              }}
              rules={[
                {
                  required: true,
                  message: "Please select member!",
                },
              ]}
            >
              <AutoComplete options={options} placeholder="Employe" />
            </Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              style={{
                width: "20%",
              }}
            >
              Add
            </Button>
          </div>
        </Form>
      )}
      <div style={{ marginTop: "20px" }}>
        <span style={{ fontWeight: "bold" }}>Project team</span>
        <List>
          <VirtualList data={users} itemHeight={47} itemKey="email">
            {(item) => (
              <div>
                <List.Item key={item.email}>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={item.photo}
                        style={{ marginLeft: "10px", marginTop: "8px" }}
                      />
                    }
                    title={item.lastName + " " + item.firstName}
                    description={item.email}
                  />
                  {!isEmployee && (
                    <div style={{ marginBottom: "22px", marginRight: "10px" }}>
                      <Tooltip title="Delete member">
                        <UserDeleteOutlined
                          style={{
                            color: "red",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            console.log(users);
                            let data = {
                              user_id: item.id,
                              project_id: project_id,
                            };
                            axios
                              .post(
                                `http://localhost:8000/api/project/removeMember`,
                                data,
                                {
                                  headers: { Authorization: `Bearer ${token}` },
                                }
                              )
                              .then((response) => {
                                setUsers(
                                  users.filter((element) => {
                                    return element.id !== item.id;
                                  })
                                );
                              });

                            forceUpdate();
                          }}
                        />
                      </Tooltip>
                    </div>
                  )}
                </List.Item>
              </div>
            )}
          </VirtualList>
        </List>
      </div>
    </Drawer>
  );
};

export default ProjectTeam;
