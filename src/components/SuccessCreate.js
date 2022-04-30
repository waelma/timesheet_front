import React from "react";
import { Result, Button } from 'antd';

const SuccessCreate = () => {
  return <div>
        <Result
    status="success"
    title="Project created successfully"
    subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
    extra={[
      <Button type="primary" key="console">
        Done
      </Button>
    ]}
  />
  </div>;
};

export default SuccessCreate;
