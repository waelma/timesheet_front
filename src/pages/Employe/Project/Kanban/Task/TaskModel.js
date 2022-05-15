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

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const formatter = (value) => {
  return `${value}%`;
};
const props = {
  onChange({ file }) {
    console.log(file);
  },

  defaultFileList: [
    {
      uid: "1",
      name: "xxx.png",
      status: "done",
      response: "Server Error 500", // custom error message to show
      url: "http://www.baidu.com/xxx.png",
    },
    {
      uid: "2",
      name: "yyy.png",
      status: "done",
      url: "http://www.baidu.com/yyy.png",
    },
    {
      uid: "3",
      name: "zzz.png",
      status: "done",
      response: "Server Error 500", // custom error message to show
      url: "http://www.baidu.com/zzz.png",
    },
  ],
};
const allUsers = [
  {
    id: 0,
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_d3SP2vKOeGFVESn5rk6xnPiQ0naW2e-ldA&usqp=CAU",
    firstName: "Wael machlouch",
  },
  {
    id: 1,
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUDnkndWV6_6v_dks3oYlvJZwW6CQiCsV6Uw&usqp=CAU",
    firstName: "Firas machlouch",
  },
  {
    id: 2,
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&usqp=CAU",
    firstName: "Zahri atoui",
  },
  {
    id: 4,
    photo: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    firstName: "Rabeb machlouch",
  },
  {
    id: 5,
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&usqp=CAU",
    firstName: "Yassmin tlemsani",
  },
];
let users = [
  {
    id: 0,
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_d3SP2vKOeGFVESn5rk6xnPiQ0naW2e-ldA&usqp=CAU",
    firstName: "Wael machlouch",
  },
  {
    id: 1,
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUDnkndWV6_6v_dks3oYlvJZwW6CQiCsV6Uw&usqp=CAU",
    firstName: "Firas machlouch",
  },
  {
    id: 2,
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&usqp=CAU",
    firstName: "Zahri atoui",
  },
];
let todos = [
  {
    name: "sous tache 1",
    verifier: true,
  },
  {
    name: "sous tache 2",
    verifier: true,
  },
  {
    name: "sous tache 3",
    verifier: false,
  },
];

const TaskModel = ({ visible, setVisible }) => {
  let [dates, setDates] = useState([
    {
      startDate: "2022-05-01",
      endDate: "2022-06-30",
    },
  ]);
  const [visibleAddTask, setVisibleAddTask] = useState(false);
  const [form] = Form.useForm();
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const [formDesc] = Form.useForm();
  const [description, setDescription] = useState("in this task we will...");
  const [descInput, setDescInput] = useState(true);
  const [taskTitle, setTaskTitle] = useState("Task title");
  const [taskTitleInput, setTaskTitleInput] = useState(false);
  const sliderVal = (todos) => {
    return Math.floor(
      (todos.filter((element) => {
        return element.verifier === true;
      }).length *
        100) /
        todos.length
    );
  };
  const menu = (
    <Menu style={{ paddingTop: "10px", paddingBottom: "5px" }}>
      {allUsers.map((allUser) => (
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
          {users.filter((element) => {
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
                  console.log(users);
                  users = users.filter((element) => {
                    return element.id !== allUser.id;
                  });
                  console.log(users);
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
                  console.log(users);
                  users.push(allUser);
                  console.log(users);
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
              {taskTitleInput ? (
                <Form
                  style={{ display: "flex" }}
                  // form={formDesc}
                  initialValues={{ taskTitle: taskTitle }}
                  onFinish={(values) => {
                    setTaskTitle(values.taskTitle);
                    setTaskTitleInput(false);
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
                </div>
              )}
            </div>
            <div>
              <RangePicker
                style={{
                  marginLeft: "20px",
                  borderRadius: "15px",
                  width: "250px",
                }}
                defaultValue={[
                  moment(dates[0].startDate, "YYYY-MM-DD"),
                  moment(dates[0].endDate, "YYYY-MM-DD"),
                ]}
                allowClear={false}
                onChange={(value, dateString) => {
                  console.log(dateString);
                }}
              />
            </div>
            <Tooltip title="Archive task">
              <Button
                shape="circle"
                icon={<HiOutlineArchive style={{ marginTop: "5px" }} />}
                style={{ marginLeft: "20px" }}
              ></Button>
            </Tooltip>
          </div>
        }
        footer={null}
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={850}
      >
        <div style={{ display: "flex" }}>
          <div style={{ width: "60%", paddingRight: "10px" }}>
            <div>
              <h2 style={{ color: "#626567" }}>Description</h2>
              {descInput ? (
                <Form
                  form={formDesc}
                  initialValues={{ description: description }}
                  onFinish={(values) => {
                    setDescription(values.description);
                    setDescInput(false);
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
                  {description}
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

              {todos.map((todo) => (
                <div
                  className="chekboxTache"
                  style={{
                    width: "100%",
                    display: "flex",
                    paddingRight: "9px",
                  }}
                >
                  <Checkbox
                    key={todo.name}
                    checked={todo.verifier}
                    style={{ width: "100%", marginLeft: "10px" }}
                    onChange={(e) => {
                      todo.verifier = !todo.verifier;
                      forceUpdate();
                    }}
                  >
                    {todo.name}
                  </Checkbox>
                  <DeleteOutlined
                    className="chekboxTacheDelete"
                    onClick={() => {
                      todos = todos.filter((element) => {
                        return element.name !== todo.name;
                      });
                      forceUpdate();
                      console.log(todos);
                    }}
                  />
                </div>
              ))}
              {visibleAddTask ? (
                <Form
                  form={form}
                  onFinish={(values) => {
                    console.log(values);
                    todos.push({
                      name: values.todo,
                      verifier: false,
                    });
                    form.resetFields();
                    setVisibleAddTask(false);
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
              <h2 style={{ color: "#626567" }}>Members</h2>
              {users.map((user) => (
                <Tooltip title={user.firstName}>
                  <Avatar
                    key={user.firstName}
                    src={user.photo}
                    style={{ marginRight: "1.5px" }}
                  />
                </Tooltip>
              ))}
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
            </div>

            <div>
              <h2 style={{ color: "#626567", marginTop: "15px" }}>Comments</h2>
              <TaskComments></TaskComments>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TaskModel;
