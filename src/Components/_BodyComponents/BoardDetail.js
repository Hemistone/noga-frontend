import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import "antd/dist/antd.css";
import { Icon, Typography, Row, Col, Card, Divider } from "antd";
import Lobby from "./Lobby";
import VPgraph from "./VPgraph";
import VPgraph_Area from "./VPgraph_Area";

const { Title } = Typography;

const GET_ADBOARD = gql`
  query getADboard($id: String!) {
    getADboard(id: $id) {
      id
      ADboardName
      ADboardImage
      description
      IngameImages
      viewpointList {
        userName
        viewscore
        createdAt
      }
    }
  }
`;

const getTodayDate = () => {
  var today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  const date = yyyy + "-" + mm + "-" + dd;
  return date;
};

const getTotalViewscores = (viewpointList, today) => {
  var ViewscoreToday = 0;
  var ViewscoreTotal = 0;
  viewpointList.map(VP => {
    const VPdate = VP.createdAt.split("T")[0];
    ViewscoreTotal += VP.viewscore;
    if (VPdate == today) {
      ViewscoreToday += VP.viewscore;
    }
  });
  return { ViewscoreToday, ViewscoreTotal };
};

const getTotalExtraImpression = () => {
  return;
};

export default ({ ID }) => {
  if (ID === "1") {
    return <Lobby />;
  } else {
    const { data, error, loading } = useQuery(GET_ADBOARD, {
      variables: { id: ID }
    });
    if (loading) {
      return (
        <>
          <Title level={2}>
            <Icon type="loading" />
            <div>Loading...</div>
          </Title>
        </>
      );
    } else if (error) {
      return <Title level={2}>Error! {error.message}</Title>;
    } else {
      const ADboardName = data.getADboard.ADboardName;
      const ADimageURL = data.getADboard.ADboardImage;
      const viewpointList = data.getADboard.viewpointList;
      if (viewpointList == null) {
        return (
          <>
            <Title level={1} type="primary">
              {ADboardName}
            </Title>
            <Divider />
            <Title level={5} type="secondary">
              No viewpoints Yet! Bring players to let view your advertisement!
            </Title>
          </>
        );
      }
      const date = getTodayDate();
      //console.log("today date is", date);
      const { ViewscoreToday, ViewscoreTotal } = getTotalViewscores(
        viewpointList,
        date
      );
      return (
        <>
          <Title level={1} type="primary">
            {ADboardName}
          </Title>
          <Divider />
          <Row gutter={16}>
            <Col span={6}>
              <img
                style={{ borderRadius: "2px", border: "1px solid #ddd" }}
                src={ADimageURL}
                width="100%"
                alt="AD board in the game"
              />
              <Card
                title="오늘 수집된 임프레션 팩터"
                style={{ margin: "12px 0px 0px 0px" }}
                type="inner"
              >
                {ViewscoreToday}
              </Card>
              <Card
                title="전체 임프레션 팩터"
                style={{ margin: "12px 0px 0px 0px" }}
                type="inner"
              >
                {ViewscoreTotal}
              </Card>
              <Card
                title="스폐셜 임팩트 스코어"
                style={{ margin: "12px 0px 0px 0px" }}
                type="inner"
              >
                Content
              </Card>
            </Col>
            <Col span={18}>
              <VPgraph data={viewpointList} />
              <VPgraph_Area data={viewpointList} />
            </Col>
          </Row>
        </>
      );
    }
  }
};

/*
<td>
        {data.getADboardList.map(ADboard => (
          <tr key={ADboard.id}>
            <h1>{ADboard.ADboardName}</h1>
            <ul>
              {ADboard.viewpointList.map(VP => (
                <li>
                  {VP.viewscore} / {VP.createdAt}
                </li>
              ))}
            </ul>
          </tr>
        ))}
      </td>
    */
