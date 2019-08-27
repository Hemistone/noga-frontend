import { Layout, Menu, Breadcrumb, Icon, Divider } from "antd";
import React from "react";
import styled from "styled-components";
import BoardDetail from "./_BodyComponents/BoardDetail";

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

const Hr = styled.div`
  padding: 0px 15px;
`;

export default () => {
  return (
    <Layout style={{ padding: "0 24px 24px" }}>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <Content
        style={{
          background: "#fff",
          padding: 24,
          margin: 0,
          minHeight: 280
        }}
      >
        <BoardDetail />
      </Content>
    </Layout>
  );
};
