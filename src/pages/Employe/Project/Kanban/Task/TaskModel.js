import { React, useEffect, useState, useCallback } from "react";
import {
  Modal,
  Button,
  Divider,
  Input,
  Form,
  Avatar,
  Tooltip,
  Checkbox,
  Slider,
  Upload,
  DatePicker,
  Dropdown,
  Menu,
  Popconfirm,
  message,
} from "antd";
import "./TaskModel.css";
import TaskComments from "./TaskComments";
import {
  PlusOutlined,
  UploadOutlined,
  DeleteOutlined,
  EditOutlined,
  UserDeleteOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { HiOutlineArchive } from "react-icons/hi";
import moment from "moment";
import axios from "axios";
import Pusher from "pusher-js";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const formatter = (value) => {
  return `${value}%`;
};

const TaskModel = ({
  description,
  id,
  title,
  members,
  dateD,
  dateF,
  projectMembers,
  subTache,
  comment,
  files,
  visible,
  setVisible,
  forceUpdate: forceRefresh,
}) => {
  const token = localStorage.getItem("token");
  const props = {
    name: "file",
    action: `http://localhost:8000/api/project/uploadFiles/${id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },

    defaultFileList: files,
  };
  let [dates, setDates] = useState(
    dateD && dateF
      ? [
          {
            startDate: dateD,
            endDate: dateF,
          },
        ]
      : null
  );
  const isEmployee = localStorage.getItem("role") === "1";
  const [visibleAddTask, setVisibleAddTask] = useState(false);
  const [form] = Form.useForm();
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const [formDesc] = Form.useForm();
  const [desc, setDesc] = useState(description);
  const [descInput, setDescInput] = useState(true);
  const [taskTitle, setTaskTitle] = useState(title);
  const [taskTitleInput, setTaskTitleInput] = useState(false);
  let [todos, setTodos] = useState(subTache);
  const sliderVal = (todos) => {
    if (todos.length) {
      return Math.floor(
        (todos.filter((element) => {
          return element.verified === 1;
        }).length *
          100) /
          todos.length
      );
    } else {
      return 0;
    }
  };
  const menu = (
    <Menu style={{ paddingTop: "10px", paddingBottom: "5px" }}>
      {projectMembers.map((allUser) => (
        <div
          className="addMemberDropDown"
          style={{
            width: "200px",
            display: "flex",
            paddingLeft: "10px",
            paddingRight: "10px",
            marginBottom: "5px",
          }}
          key={allUser.id}
        >
          <span>{allUser.firstName}</span>
          {members.filter((element) => {
            return element.id === allUser.id;
          }).length ? (
            <Tooltip title="Delete member">
              <UserDeleteOutlined
                style={{
                  color: "red",
                  position: "absolute",
                  right: "10px",
                  marginTop: "4px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  for (var i = 0; i < members.length; i++) {
                    if (members[i].id === allUser.id) {
                      members.splice(i, 1);
                    }
                  }
                  let data = {
                    user_id: allUser.id,
                    tache_id: id,
                  };
                  axios
                    .post(`http://localhost:8000/api/task/removeMember`, data, {
                      headers: { Authorization: `Bearer ${token}` },
                    })
                    .then((response) => {
                      console.log(response.data);
                    });
                  forceUpdate();
                }}
              ></UserDeleteOutlined>
            </Tooltip>
          ) : (
            <Tooltip title="Add member">
              <UserAddOutlined
                style={{
                  color: "green",
                  position: "absolute",
                  right: "10px",
                  marginTop: "4px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  members.push(allUser);
                  let data = {
                    user_id: allUser.id,
                    tache_id: id,
                  };
                  axios
                    .post(`http://localhost:8000/api/task/addMember`, data, {
                      headers: { Authorization: `Bearer ${token}` },
                    })
                    .then((response) => {
                      console.log(response.data);
                    });
                  forceUpdate();
                }}
              ></UserAddOutlined>
            </Tooltip>
          )}
        </div>
      ))}
    </Menu>
  );
  useEffect(() => {

    description ? setDescInput(false) : setDescInput(true);
  }, []);
  return (
    <div>
      <Modal
        className="TaskModel"
        title={
          <div style={{ display: "flex" }}>
            <div>
              {taskTitleInput && !isEmployee ? (
                <Form
                  style={{ display: "flex" }}
                  // form={formDesc}
                  initialValues={{ taskTitle: taskTitle }}
                  onFinish={(values) => {
                    setTaskTitle(values.taskTitle);
                    setTaskTitleInput(false);
                    let data = {
                      title: values.taskTitle,
                    };
                    axios
                      .put(
                        `http://localhost:8000/api/task/editTitle/${id}`,
                        data,
                        {
                          headers: { Authorization: `Bearer ${token}` },
                        }
                      )
                      .then((response) => {
                        console.log(response.data);
                      });
                  }}
                >
                  <Form.Item style={{ marginBottom: "5px" }} name="taskTitle">
                    <Input
                      rows={2}
                      style={{ borderRadius: "15px", width: "100%" }}
                    />
                  </Form.Item>
                  <Button
                    style={{ marginLeft: "5px", borderRadius: "15px" }}
                    htmlType="submit"
                    type="primary"
                  >
                    Edit
                  </Button>
                </Form>
              ) : (
                <div style={{ display: "felx" }}>
                  {taskTitle}
                  {!isEmployee && (
                    <Tooltip title="Edit task Title">
                      <EditOutlined
                        className="updateDescIcon"
                        style={{
                          marginLeft: "10px",
                          cursor: "pointer",
                          fontSize: "10px",
                        }}
                        onClick={() => {
                          setTaskTitleInput(true);
                        }}
                      ></EditOutlined>
                    </Tooltip>
                  )}
                </div>
              )}
            </div>
            <div>
              <RangePicker
                disabled={isEmployee}
                style={{
                  marginLeft: "20px",
                  borderRadius: "15px",
                  width: "250px",
                }}
                defaultValue={
                  dates
                    ? [
                        moment(dates[0].startDate, "YYYY-MM-DD"),
                        moment(dates[0].endDate, "YYYY-MM-DD"),
                      ]
                    : null
                }
                allowClear={false}
                onChange={(value, dateString) => {
                  let data = {
                    dateDebut: dateString[0],
                    dateFin: dateString[1],
                  };
                  axios
                    .put(
                      `http://localhost:8000/api/task/editDate/${id}`,
                      data,
                      {
                        headers: { Authorization: `Bearer ${token}` },
                      }
                    )
                    .then((response) => {
                      console.log(response.data);
                    });
                }}
              />
            </div>
            {!isEmployee && (
              <Tooltip title="Archive task">
                <Popconfirm
                  title="Are you sure to delete this task?"
                  onConfirm={() => {
                    message.success("Task removed");
                    axios
                      .delete(
                        `http://localhost:8000/api/task/removeTask/${id}`,
                        {
                          headers: { Authorization: `Bearer ${token}` },
                        }
                      )
                      .then((response) => {
                        setVisible(false);
                        window.location.reload();
                      });
                  }}
                  okText="Yes"
                  cancelText="No"
                >
                  <div className="btn-archive">
                    <Button
                      shape="circle"
                      icon={<HiOutlineArchive style={{ marginTop: "5px" }} />}
                      style={{ marginLeft: "20px" }}
                    ></Button>
                  </div>
                </Popconfirm>
              </Tooltip>
            )}
          </div>
        }
        footer={null}
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => {
          setVisible(false);
          console.log("force refresh ");
          forceRefresh(Math.random());
        }}
        width={850}
      >
        <div style={{ display: "flex" }}>
          <div style={{ width: "60%", paddingRight: "10px" }}>
            <div>
              <h2 style={{ color: "#626567" }}>Description</h2>
              {descInput ? (
                <Form
                  form={formDesc}
                  initialValues={{ description: desc }}
                  onFinish={(values) => {
                    setDesc(values.description);
                    setDescInput(false);
                    let data = {
                      desc: values.description,
                    };
                    axios
                      .put(
                        `http://localhost:8000/api/task/editDescription/${id}`,
                        data,
                        {
                          headers: { Authorization: `Bearer ${token}` },
                        }
                      )
                      .then((response) => {
                        console.log(response.data);
                      });
                  }}
                >
                  <Form.Item style={{ marginBottom: "5px" }} name="description">
                    <TextArea rows={2} style={{ borderRadius: "15px" }} />
                  </Form.Item>
                  <Button
                    style={{
                      width: "30%",
                      marginLeft: "70%",
                      borderRadius: "15px",
                    }}
                    htmlType="submit"
                    type="primary"
                  >
                    {" "}
                    Add desciption
                  </Button>
                </Form>
              ) : (
                <div style={{ display: "felx" }}>
                  {desc}
                  {!isEmployee && (
                    <Tooltip title="Edit description">
                      <EditOutlined
                        className="updateDescIcon"
                        style={{
                          marginLeft: "10px",
                          cursor: "pointer",
                          fontSize: "10px",
                        }}
                        onClick={() => {
                          setDescInput(true);
                        }}
                      ></EditOutlined>
                    </Tooltip>
                  )}
                </div>
              )}
            </div>
            <div>
              <h2 style={{ color: "#626567", marginTop: "15px" }}>Checklist</h2>
              {todos.length ? (
                <div style={{ display: "flex" }}>
                  <Slider
                    value={sliderVal(todos)}
                    tipFormatter={formatter}
                    style={{ width: "80%", marginRight: "15px" }}
                  />
                  <p>{sliderVal(todos)}%</p>
                </div>
              ) : (
                <></>
              )}

              {todos.map((todo, index) => (
                <div
                  className="chekboxTache"
                  style={{
                    width: "100%",
                    display: "flex",
                    paddingRight: "9px",
                  }}
                  key={index}
                >
                  <Checkbox
                    key={todo.name}
                    checked={todo.verified === 1}
                    style={{ width: "100%", marginLeft: "10px" }}
                    onChange={(e) => {
                      if (todo.verified === 1) {
                        todo.verified = 0;
                        let data = {
                          verif: 0,
                          tache_id: id,
                          name: todo.name,
                        };
                        axios
                          .put(
                            `http://localhost:8000/api/task/verifiedTodo/${todo.id}`,
                            data,
                            {
                              headers: { Authorization: `Bearer ${token}` },
                            }
                          )
                          .then((response) => {
                            console.log(response.data);
                          });
                      } else {
                        todo.verified = 1;
                        let data = {
                          verif: 1,
                          tache_id: id,
                          name: todo.name,
                        };
                        axios
                          .put(
                            `http://localhost:8000/api/task/verifiedTodo/${todo.id}`,
                            data,
                            {
                              headers: { Authorization: `Bearer ${token}` },
                            }
                          )
                          .then((response) => {
                            console.log(response.data);
                          });
                      }
                      forceUpdate();
                    }}
                  >
                    {todo.name}
                  </Checkbox>
                  <DeleteOutlined
                    className="chekboxTacheDelete"
                    onClick={() => {
                      let data = {
                        name: todo.name,
                      };
                      axios
                        .post(
                          `http://localhost:8000/api/task/deleteTodo/${id}`,
                          data,
                          {
                            headers: { Authorization: `Bearer ${token}` },
                          }
                        )
                        .then((response) => {
                          console.log(response.data);
                          setTodos(
                            todos.filter((element) => {
                              return element.name !== todo.name;
                            })
                          );
                          forceUpdate();
                        });
                    }}
                  />
                </div>
              ))}
              {visibleAddTask ? (
                <Form
                  form={form}
                  onFinish={(values) => {
                    let data = {
                      name: values.todo,
                      tache_id: id,
                    };
                    axios
                      .post(`http://localhost:8000/api/task/addTodo`, data, {
                        headers: { Authorization: `Bearer ${token}` },
                      })
                      .then((response) => {
                        console.log(response.data);
                        todos.push({
                          name: values.todo,
                          verifier: false,
                        });
                        form.resetFields();
                        setVisibleAddTask(false);
                      });
                    forceUpdate();
                  }}
                  autoComplete="off"
                >
                  <div style={{ display: "flex", marginTop: "5px" }}>
                    <Form.Item
                      style={{ marginRight: "5px", width: "30%" }}
                      name="todo"
                      rules={[
                        {
                          required: true,
                          message: "Please enter a todo!",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Add ToDo"
                        style={{ borderRadius: "15px" }}
                      />
                    </Form.Item>
                    <Tooltip title="Add">
                      <Button
                        type="primary"
                        htmlType="submit"
                        shape="circle"
                        icon={<PlusOutlined style={{ marginLeft: "1px" }} />}
                      />
                    </Tooltip>
                  </div>
                </Form>
              ) : (
                <Button
                  type="dashed"
                  onClick={() => setVisibleAddTask(true)}
                  style={{
                    width: "30%",
                    borderRadius: "15px",
                    marginTop: "5px",
                  }}
                  icon={<PlusOutlined />}
                >
                  Add todo
                </Button>
              )}
            </div>
            <div>
              <h2 style={{ color: "#626567", marginTop: "15px" }}>Files</h2>
              <Upload {...props}>
                <Button
                  style={{ borderRadius: "15px" }}
                  icon={<UploadOutlined />}
                >
                  Upload
                </Button>
              </Upload>
            </div>
          </div>
          <div style={{ paddingTop: "5%" }}>
            <Divider type="vertical" plain />
          </div>
          <div style={{ width: "40%", paddingLeft: "10px" }}>
            <div>
              {members.length || !isEmployee ? (
                <h2 style={{ color: "#626567" }}>Members</h2>
              ) : (
                <></>
              )}
              {members.map((user) => (
                <Tooltip key={user.id} title={user.firstName}>
                  <Avatar
                    key={user.firstName}
                    src={user.photo}
                    style={{ marginRight: "1.5px" }}
                  />
                </Tooltip>
              ))}
              {!isEmployee && (
                <Dropdown overlay={menu} trigger={["click"]} placement="bottom">
                  <Tooltip title="add Member">
                    <Avatar
                      className="addMemberTache"
                      style={{ cursor: "pointer" }}
                    >
                      <EditOutlined />
                    </Avatar>
                  </Tooltip>
                </Dropdown>
              )}
            </div>

            <div>
              <h2 style={{ color: "#626567", marginTop: "15px" }}>Comments</h2>
              <TaskComments comment={comment} tache_id={id}></TaskComments>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TaskModel;
