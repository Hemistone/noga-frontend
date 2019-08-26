import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import "antd/dist/antd.css";

const QUERY = gql`
  {
    getADboardList {
      id
      ADboardName
      viewpointList {
        viewscore
      }
    }
  }
`;

export default () => {
  const { data, error, loading } = useQuery(QUERY);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error! {error.message}</div>;
  }

  return (
    <td>
      {data.getADboardList.map(ADboard => (
        <tr key={ADboard.id}>
          <h1>{ADboard.ADboardName}</h1>
          <ul>
            {ADboard.viewpointList.map(VP => (
              <li>{VP.viewscore}</li>
            ))}
          </ul>
        </tr>
      ))}
    </td>
  );
};
