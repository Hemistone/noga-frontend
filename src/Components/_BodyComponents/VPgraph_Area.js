import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const getUserList = data => {
  var arr = [];
  data.map(VP => {
    if (!arr.includes(VP.userName)) {
      arr.push(VP.userName);
    }
  });
  return arr;
};

const ChangeData = (data, userList) => {
  var graphData = [];
  var recentDate = data[0].createdAt.split("T")[0];
  var aData = {
    date: recentDate
  };
  userList.map(user => {
    aData[user] = 0;
  });
  //console.log("Recent Date : " + recentDate);
  data.map(VP => {
    //console.log(VP.createdAt.split("T")[0]);
    if (recentDate != VP.createdAt.split("T")[0]) {
      graphData.push(aData);
      recentDate = VP.createdAt.split("T")[0];
      aData = {
        date: recentDate
      };
      userList.map(user => {
        aData[user] = 0;
      });
    }
    userList.map(user => {
      if (user == VP.userName) {
        aData[user] += VP.viewscore;
      }
    });
  });
  graphData.push(aData);
  return graphData;
};

export default data => {
  const Data = data.data;
  if (Data == null) {
    return "No data!";
  }
  const userList = getUserList(Data);
  //console.log("USER LIST: " + userList);
  const graphData = ChangeData(Data, userList);
  //console.log(graphData);
  return (
    <AreaChart
      width={1000}
      height={400}
      data={graphData}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      {userList.map(user => (
        <Area type="monotone" dataKey={user} activeDot={{ r: 6 }} />
      ))}
    </AreaChart>
  );
};
