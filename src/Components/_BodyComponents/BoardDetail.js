import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import "antd/dist/antd.css";
import styled from "styled-components";
import { Icon, Typography, Row, Col, Card, Divider } from "antd";
import Lobby from "./Lobby";
import VPgraph_Area from "./VPgraph_Area";

import screenShot from "../../Icons/IngameImages.png";

const { Title } = Typography;
const { Meta } = Card;

const Padding = styled.div`
  padding: 8px 0px;
`;

const GET_ADBOARD = gql`
  query getADboard($id: String!) {
    getADboard(id: $id) {
      id
      game {
        name
        coverImage
      }
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
      if (typeof viewpointList == "undefined" || viewpointList.length == 0) {
        console.log("Passed Null!");
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

      const description = data.getADboard.description;
      const game = data.getADboard.game.name;
      const gameCoverimage = data.getADboard.game.coverImage;
      const ingameImages = data.getADboard.IngameImages;

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
              <Card
                cover={
                  <img
                    src={ADimageURL}
                    width="100%"
                    alt="AD board in the game"
                  />
                }
              >
                <Meta
                  avatar={<Icon type="bank" theme="twoTone" />}
                  title="광고대행사 (주)애드미"
                  description={description}
                />
              </Card>
              <Row gutter={16}>
                <Col span={12}>
                  <Card
                    title="오늘 광고효과"
                    style={{ margin: "12px 0px 0px 0px" }}
                    type="inner"
                  >
                    <Title level={3} type="primary">
                      {ViewscoreToday}
                    </Title>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card
                    title="전체 광고효과"
                    style={{ margin: "12px 0px 0px 0px" }}
                    type="inner"
                  >
                    <Title level={3} type="primary">
                      {ViewscoreTotal}
                    </Title>
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col span={17}>
              <Row gutter={16} type="flex">
                <Col>
                  <Card>
                    <Meta
                      avatar={<img src={gameCoverimage} height="102px" />}
                      title={game}
                      description="이 광고가 삽입되어있는 게임"
                    />
                  </Card>
                </Col>
                <Col>
                  <img src={screenShot} alt="Description of Images" />
                </Col>
                {ingameImages.map(image => (
                  <Col>
                    <img
                      src={image}
                      height="148px"
                      style={{
                        borderRadius: "2px",
                        border: "1px solid #e8e8e8"
                      }}
                      alt="Ingame Images of AD"
                    />
                  </Col>
                ))}
              </Row>
              <Padding />
              <Card>
                <VPgraph_Area data={viewpointList} />
              </Card>
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
