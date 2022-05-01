import React, { useEffect } from "react";
import { Result, Button } from "antd";

const SuccessCreate = ({ title, tags, backlog }) => {
  useEffect(() => {
    console.log(title);
    console.log(tags);
    console.log(backlog);
  }, []);
  return (
    <div>
      <Result
        status="success"
        title="Project created successfully"
        extra={[
          <Button type="primary" key="console">
            project access
          </Button>,
        ]}
      />
    </div>
  );
};

export default SuccessCreate;
