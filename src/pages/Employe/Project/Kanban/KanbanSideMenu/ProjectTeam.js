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
const ProjectTeam = ({ setVisible, visible }) => {
  const token = localStorage.getItem("token");
  const [form] = Form.useForm();
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  let [options, setOptions] = useState([]);
  let [name, setName] = useState("");
  let [users, setUsers] = useState([
    {
      id: 0,
      email: "waelma@gmail.com",
      photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_d3SP2vKOeGFVESn5rk6xnPiQ0naW2e-ldA&usqp=CAU",
      firstName: "Wael",
      lastName: "machlouch",
    },
    {
      id: 1,
      email: "firsama@gmail.com",
      photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUDnkndWV6_6v_dks3oYlvJZwW6CQiCsV6Uw&usqp=CAU",
      firstName: "Firas",
      lastName: "machlouch",
    },
    {
      id: 2,
      email: "atzahri@gmail.com",
      photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&usqp=CAU",
      firstName: "Zahri",
      lastName: "atoui",
    },
    {
      id: 3,
      email: "aaaatzahri@gmail.com",
      photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&usqp=CAU",
      firstName: "aaaaaZahri",
      lastName: "aaaatoui",
    },
    {
      id: 4,
      email: "sdfsdf@gmail.com",
      photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&usqp=CAU",
      firstName: "Zsfdsdfahri",
      lastName: "atofsdui",
    },
  ]);
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
      }}
      visible={visible}
    >
      <Form
        form={form}
        onFinish={(values) => {
          setUsers((oldArray) => [
            ...oldArray,
            {
              id: 5,
              email: "zzzzz@gmail.com",
              photo:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&usqp=CAU",
              firstName: values.selectEmploye,
              // lastName:"atofsdui"
            },
          ]);
          form.resetFields();
          forceUpdate();
        }}
      >
        <span style={{ fontWeight: "bold" }}>Add employe</span>
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
                  <div style={{ marginBottom: "22px", marginRight: "10px" }}>
                    <Tooltip title="Delete member">
                      <UserDeleteOutlined
                        style={{
                          color: "red",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          console.log(users);
                          setUsers(
                            users.filter((element) => {
                              return element.id !== item.id;
                            })
                          );
                          forceUpdate();
                        }}
                      />
                    </Tooltip>
                  </div>
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
