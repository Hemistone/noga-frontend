import { Layout, Menu, Breadcrumb, Icon, Divider } from "antd";
import React from "react";
import styled from "styled-components";
//import { blue } from "@ant-design/colors";

const { SubMenu } = Menu;
const { Sider } = Layout;

const Hr = styled.div`
  padding: 0px 15px;
`;
const Padding = styled.div`
  padding: 20px 22px;
`;

/*
const UserInfo = () => {
  return (
    <Padding style={{ backgroundColor: blue.primary }}>
      <Icon type="user" style={{ fontsize: "32px" }} />
      <h3>Developer A</h3>
    </Padding>
  );
};
*/

export default () => {
  return (
    <Sider width={250} style={{ background: "#fff" }}>
      <Padding />
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{ borderRight: 0 }}
      >
        <Menu.Item key="0">
          <Icon type="bulb" />
          Getting Started
        </Menu.Item>
        <Menu.Item key="1">
          <Icon type="home" />
          Lobby
        </Menu.Item>
        <Hr>
          <Divider />
        </Hr>
        <SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="laptop" />
              subnav 2
            </span>
          }
        >
          <Menu.Item key="5">option5</Menu.Item>
          <Menu.Item key="6">option6</Menu.Item>
          <Menu.Item key="7">option7</Menu.Item>
          <Menu.Item key="8">option8</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub3"
          title={
            <span>
              <Icon type="notification" />
              subnav 3
            </span>
          }
        >
          <Menu.Item key="9">option9</Menu.Item>
          <Menu.Item key="10">option10</Menu.Item>
          <Menu.Item key="11">option11</Menu.Item>
          <Menu.Item key="12">option12</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
};
