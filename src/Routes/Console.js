import { Layout } from "antd";
import React, { useState } from "react";
import NavBar from "../Components/_Header";
import Body from "../Components/_Body";
import SideBar from "../Components/_SideBar";
//import Footer from "../Components/_Footer";

export default () => {
  const [BoardID, setBoardID] = useState("1");
  return (
    <Layout style={{ height: "100vh" }}>
      <NavBar />
      <Layout>
        <SideBar setBoardID={setBoardID} />
        <Body boardID={BoardID} />
      </Layout>
    </Layout>
  );
};
