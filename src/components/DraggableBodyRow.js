import React from "react";
import "antd/dist/antd.css";
import { Table } from "antd";
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from "react-sortable-hoc";
import { MenuOutlined } from "@ant-design/icons";

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    index: 0,
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    index: 1,
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    index: 2,
  },
  {
    key: "4",
    name: "4",
    age: 32,
    address: "New York No. 1 Lake Park",
    index: 3,
  },
  {
    key: "5",
    name: "5",
    age: 42,
    address: "London No. 1 Lake Park",
    index: 4,
  },
  {
    key: "6",
    name: "6",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    index: 5,
  },
];

const DragHandle = sortableHandle(({ active }) => (
  <MenuOutlined style={{ cursor: "grab", color: active ? "blue" : "#999" }} />
));

const SortableItem = sortableElement((props) => <tr {...props} />);
const SortableContainer = sortableContainer((props) => <tbody {...props} />);

export function SortableTable() {
  const [dataSource, setDataSource] = React.useState(data);
  const [selectedItems, setSelectedItems] = React.useState([]);

  const getColumns = () => {
    return [
      {
        title: "Sort",
        dataIndex: "",
        width: 30,
        className: "drag-visible",
        render: (d, dd, i) => (
          <>
            <DragHandle active={selectedItems.includes(i)} />
          </>
        ),
      },
      {
        title: "Name",
        dataIndex: "name",
        className: "drag-visible",
      },
      {
        title: "Age",
        dataIndex: "age",
      },
      {
        title: "Address",
        dataIndex: "address",
      },
    ];
  };
  const merge = (a, b, i = 0) => {
    let aa = [...a];
    return [...a.slice(0, i), ...b, ...aa.slice(i, aa.length)];
  };
  const onSortEnd = ({ oldIndex, newIndex }) => {
    let tempDataSource = dataSource;

    if (oldIndex !== newIndex) {
      if (!selectedItems.length) {
        let movingItem = tempDataSource[oldIndex];
        tempDataSource.splice(oldIndex, 1);
        tempDataSource = merge(tempDataSource, [movingItem], newIndex);
      } else {
        let filteredItems = [];
        selectedItems.forEach((d) => {
          filteredItems.push(tempDataSource[d]);
        });
        let newData = [];
        tempDataSource.forEach((d, i) => {
          if (!selectedItems.includes(i)) {
            newData.push(d);
          }
        });
        tempDataSource = [...newData];
        tempDataSource = merge(tempDataSource, filteredItems, newIndex);
      }
      setDataSource(tempDataSource);
      setSelectedItems([]);
    }
  };

  const DraggableContainer = (props) => (
    <SortableContainer
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      {...props}
    />
  );

  const DraggableBodyRow = ({ className, style, ...restProps }) => {
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = dataSource.findIndex(
      (x) => x.index === restProps["data-row-key"]
    );
    return (
      <SortableItem
        index={index}
        {...restProps}
        selected={selectedItems.length}
        onClick={(e) => {
          if (e.ctrlKey || e.metaKey) {
            selectedItems.includes(index)
              ? selectedItems.splice(selectedItems.indexOf(index), 1)
              : selectedItems.push(index);
            setSelectedItems(selectedItems);
          } else {
            setSelectedItems([]);
          }
        }}
      />
    );
  };

  return (
    <>
      <h3>"CNTRL + Click" to select multiple items</h3>

      <Table
        pagination={false}
        dataSource={dataSource}
        columns={getColumns()}
        rowKey="index"
        components={{
          body: {
            wrapper: DraggableContainer,
            row: DraggableBodyRow,
          },
        }}
      />
      {selectedItems.length ? <>{selectedItems.length} items selected </> : ""}
    </>
  );
}
