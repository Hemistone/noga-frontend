import { Layout, Menu } from "antd";
import React from "react";
import styled from "styled-components";
import { Icon } from "antd";
import nogalogo from "../Icons/NogaAdLogo-01.png";

const { Header } = Layout;

const Logo = styled.div`
  margin-right: 10px;
  float: left;
`;

export default () => {
  return (
    <Header className="header" style={{ paddingLeft: "16px" }}>
      <Logo>
        <img src={nogalogo} height="40" />
      </Logo>

      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        style={{ lineHeight: "64px" }}
      >
        <Menu.Item key="1">소개</Menu.Item>
        <Menu.Item key="2">광고대행사용</Menu.Item>
        <Menu.Item key="3">개발자용</Menu.Item>
      </Menu>
    </Header>
  );
};
