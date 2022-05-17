import React from "react";
import { Drawer, Empty, List } from "antd";
const data = [
  {
    name: "Task 4",
    email: "https://joeschmoe.io/api/v1/random",
    description:
      "We supply a series of design principles, practical patterns and hig",
  },
  {
    name: "Task 6",
    email: "https://joeschmoe.io/api/v1/random",
    description:
      "We supply a series of design principles, practical patterns and hig",
  },
];
const ProjectArchive = ({ setVisible, visible }) => {
  return (
    <Drawer
      title={"Project archive"}
      placement="right"
      onClose={() => {
        setVisible(false);
      }}
      visible={visible}
    >
      {data.length ? (
        <div>
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
              <div key={item.email}>
                <List.Item
                  key={item.email}
                  actions={[
                    <span style={{ cursor: "pointer", color: "#58D68D" }}>
                      restore
                    </span>,
                    <span style={{ cursor: "pointer", color: "#EC7063" }}>
                      delete
                    </span>,
                  ]}
                >
                  <List.Item.Meta
                    title={item.name}
                    description={item.description}
                  />
                  {/* <span style={{ color: "#515A5A" }}>"ddddd"</span> */}
                </List.Item>
              </div>
            )}
          />
        </div>
      ) : (
        <Empty description={"No data"} style={{ marginTop: "100px" }} />
      )}
    </Drawer>
  );
};

export default ProjectArchive;
