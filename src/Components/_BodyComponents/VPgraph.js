import React from "react";
import {
  LineChart,
  Line,
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
  console.log(Data);
  const userList = getUserList(Data);
  console.log("USER LIST: " + userList);
  const graphData = ChangeData(Data, userList);
  console.log(graphData);
  return (
    <LineChart
      width={1000}
      height={200}
      data={graphData}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <XAxis dataKey="date" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      {userList.map(user => (
        <Line type="monotone" dataKey={user} activeDot={{ r: 6 }} />
      ))}
    </LineChart>
  );
};
