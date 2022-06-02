import { React, useEffect, useState, useCallback } from "react";
import { Button, AutoComplete, Tag, Form } from "antd";
import { BsArrowReturnLeft } from "react-icons/bs";
import axios from "axios";
const TagEmploye = ({ setCurrent, tags, setTags }) => {
  const [form] = Form.useForm();
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  let [options, setOptions] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/employe/getEmployes`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setOptions(response.data);
      });
  }, []);
  return (
    <div>
      <div>
        <div style={{ display: "flex" }}>
          <h1 style={{ fontWeight: "bold" }}>Invite your team</h1>
          <BsArrowReturnLeft
            style={{
              position: "absolute",
              right: "30px",
              fontSize: "20px",
              cursor: "pointer",
            }}
            onClick={() => {
              setCurrent(0);
            }}
          ></BsArrowReturnLeft>
        </div>
        <p style={{ fontSize: "16px" }}>
          Build your team. You can edit him and add more later.
        </p>
        <br></br>

        <div style={{ width: "50%", display: "grid" }}>
          <span style={{ fontWeight: "bold" }}>Add employe</span>
          <Form
            form={form}
            onFinish={(values) => {
              let newItem = options.filter(
                (item) => item.value === values.member
              )[0];
              if (
                newItem &&
                tags.findIndex((x) => x.id === newItem.id) === -1
              ) {
                tags.push(newItem);
                form.resetFields();
                forceUpdate();
              }
            }}
          >
            <Form.Item
              name="member"
              style={{
                marginBottom: "0px",
              }}
            >
              <AutoComplete
                style={{
                  width: "100%",
                }}
                options={options}
                placeholder="Employe"
                filterOption={(inputValue, option) =>
                  option.value
                    .toUpperCase()
                    .indexOf(inputValue.toUpperCase()) !== -1
                }
              />
            </Form.Item>
            <br />
            <div>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  width: "30%",
                  backgroundColor: "#28B463",
                  color: "white",
                  borderRadius: "4px",
                  left: "40%",
                  borderColor: "white",
                }}
              >
                Add
              </Button>
              <Button
                onClick={() => {
                  setCurrent(2);
                }}
                style={{
                  width: "30%",
                  backgroundColor: "#5499C7",
                  color: "white",
                  borderRadius: "4px",
                  left: "40%",
                }}
              >
                Next
              </Button>
            </div>
          </Form>
          <br />
          <br />
          <div id="tags">
            {tags.map((emp) => (
              <Tag
                key={emp.id}
                closable
                visible={true}
                onClose={() => {
                  setTags(tags.filter((item) => item.id !== emp.id));
                  forceUpdate();
                }}
                style={{ marginBottom: "4px" }}
              >
                {emp.value}
              </Tag>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagEmploye;
