import { Layout, Menu, Icon, Divider, Typography } from "antd";
import React from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
//import { blue } from "@ant-design/colors";

const { SubMenu } = Menu;
const { Sider } = Layout;
const { Title, Text } = Typography;

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

const QUERY = gql`
  {
    getGameList {
      id
      name
      ADboardList {
        id
        ADboardName
      }
    }
  }
`;

export default ({ setBoardID }) => {
  const handleClick = event => {
    //console.log(typeof event.key);
    setBoardID(event.key);
  };
  const { data, error, loading } = useQuery(QUERY);
  if (loading) {
    return (
      <Sider width={250} style={{ background: "#fff" }}>
        <Padding>
          <Icon type="loading" fontsize="10em" />
          <h1>GameList Loading...</h1>
        </Padding>
      </Sider>
    );
  }
  if (error) {
    return <div>Error! {error.message}</div>;
  }
  return (
    <Sider width={250} style={{ background: "#fff" }}>
      <Padding />
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        style={{ borderRight: 0 }}
        onClick={handleClick}
      >
        <Menu.Item key="0" disabled="true">
          <Icon type="user" />
          유저 프로필
        </Menu.Item>
        <Menu.Item key="0" disabled="true">
          <Icon type="bulb" />
          시작하기
        </Menu.Item>
        <Menu.Item key="1">
          <Icon type="home" />
          홈화면
        </Menu.Item>
        <Hr>
          <Divider />
        </Hr>
        <Menu.Item key="0" disabled="true">
          <Icon type="database" />
          게임 목록
        </Menu.Item>

        {data.getGameList.map(Game => (
          <SubMenu
            key={Game.id}
            title={
              <span>
                <Icon type="area-chart" />
                {Game.name}
              </span>
            }
          >
            {Game.ADboardList.map(ADboard => (
              <Menu.Item key={ADboard.id} className={ADboard.ADboardName}>
                {ADboard.ADboardName}
              </Menu.Item>
            ))}
          </SubMenu>
        ))}
      </Menu>
    </Sider>
  );
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
