import { Layout, Breadcrumb } from "antd";
import React from "react";
import BoardDetail from "./_BodyComponents/BoardDetail";

const { Content } = Layout;

export default ({ boardID }) => {
  return (
    <Layout style={{ padding: "0 24px 24px" }}>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>FPSArena</Breadcrumb.Item>
        <Breadcrumb.Item>{boardID}</Breadcrumb.Item>
      </Breadcrumb>
      <Content
        style={{
          background: "#fff",
          padding: 24,
          margin: 0,
          minHeight: 280
        }}
      >
        <BoardDetail ID={boardID} />
      </Content>
    </Layout>
  );
};
