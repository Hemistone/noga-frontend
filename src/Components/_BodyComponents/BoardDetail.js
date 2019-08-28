import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import "antd/dist/antd.css";
import { Icon, Typography, Row, Col, Card, Divider } from "antd";
import Lobby from "./Lobby";

const { Title } = Typography;

const GET_ADBOARD = gql`
  query getADboard($id: String!) {
    getADboard(id: $id) {
      id
      ADboardName
      ADboardImage
      viewpointList {
        viewscore
        createdAt
      }
    }
  }
`;

const getTodayDate = () => {
  var today = new Date();
  const dd = String(today.getDate() - 1).padStart(2, "0");
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
      const viewpointList = data.getADboard.viewpointList;
      const date = getTodayDate();
      //console.log("today date is", date);
      const { ViewscoreToday, ViewscoreTotal } = getTotalViewscores(
        viewpointList,
        date
      );
      const ADimageURL = data.getADboard.ADboardImage;
      return (
        <>
          <Title level={1} type="primary">
            {data.getADboard.ADboardName}
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
                title="Total Viewscore / Today"
                style={{ margin: "12px 0px 0px 0px" }}
                type="inner"
              >
                Content
              </Card>
            </Col>
            <Col span={18}></Col>
          </Row>

          <div>
            {viewpointList.map(VP => (
              <p>
                {VP.viewscore} / {VP.createdAt}
              </p>
            ))}
          </div>
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
