import React from "react";
import { Menu } from 'antd';
import {
    MailOutlined,
    CalendarOutlined,
    AppstoreOutlined,
    SettingOutlined,
    FolderOpenOutlined
  } from '@ant-design/icons';

const { SubMenu } = Menu;
const SideMenu = () => {
  return <div  style={{width:'20%'}}>
<Menu
        style={{ height: '100%', width:'100%'}}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode={'inline'}
      >
                <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Projets">
          <Menu.Item key="3">Option 3</Menu.Item>
          <Menu.Item key="4">Option 4</Menu.Item>
          <SubMenu key="sub1-2" title="Submenu">
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
          </SubMenu>
        </SubMenu>
        <Menu.Item key="1" icon={<MailOutlined />}>
          Messaging
        </Menu.Item>
        <Menu.Item key="2" icon={<CalendarOutlined />}>
          Calendar
        </Menu.Item>
        <SubMenu key="sub2" icon={<FolderOpenOutlined />} title="Shared files">
          <Menu.Item key="7">Option 7</Menu.Item>
          <Menu.Item key="8">Option 8</Menu.Item>
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
        </SubMenu>
      </Menu>
  </div>;
};

export default SideMenu;
