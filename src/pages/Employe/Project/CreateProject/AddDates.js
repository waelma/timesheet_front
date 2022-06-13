import React from "react";
import { Button, DatePicker, Form } from "antd";
import { BsArrowReturnLeft } from "react-icons/bs";
import Item from "antd/lib/list/Item";
// import moment from 'moment';
const { RangePicker } = DatePicker;
// const dateFormat = 'YYYY-MM-DD';
const AddDates = ({ setCurrent, setDates, dates }) => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <h1 style={{ fontWeight: "bold" }}>
          Finally, add Project Start and End Dates
        </h1>
        <BsArrowReturnLeft
          style={{
            position: "absolute",
            right: "30px",
            fontSize: "20px",
            cursor: "pointer",
          }}
          onClick={() => {
            setCurrent(2);
          }}
        ></BsArrowReturnLeft>
      </div>
      <p style={{ fontSize: "16px" }}>You can change them later.</p>
      <br />
      <br />
      <div style={{ width: "50%", display: "grid" }}>
        <Form
          onFinish={(values) => {
            setCurrent(4);
          }}
        >
          <Form.Item
            name="date"
            rules={[
              {
                required: true,
                message: "Please task name!",
              },
            ]}
          >
            <RangePicker
              onChange={(value, dateString) => {
                console.log(dateString);
                setDates(dateString);
              }}
            />
          </Form.Item>
          <br />
          <Button
            htmlType="submit"
            style={{
              width: "30%",
              backgroundColor: "#5499C7",
              color: "white",
              left: "70%",
              borderRadius: "4px",
            }}
          >
            Next
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddDates;
