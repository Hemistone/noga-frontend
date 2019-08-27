import { Layout } from "antd";
import React from "react";
import NavBar from "../Components/_Header";
import Body from "../Components/_Body";
import SideBar from "../Components/_SideBar";
//import Footer from "../Components/_Footer";
//import RightSideBar from "../Components/_RightSideBar";

export default () => {
  return (
    <Layout style={{ height: "100vh" }}>
      <NavBar />
      <Layout>
        <SideBar />
        <Body />
      </Layout>
    </Layout>
  );
};
