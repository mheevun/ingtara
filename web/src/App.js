import React from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

const ALL_LIFTS_QUERY = gql`
  query {
    allLifts {
      id
      name
      status
    }
  }
`;
const MUTATION = gql`
  mutation SetLiftStatus($id: ID!, $status: LiftStatus!) {
    setLiftStatus(id: $id, status: $status) {
      id
      status
    }
  }
`;

// function App() {
//   return (
//     <div className="App">
//       <Signup />
//     </div>
//   );
// }
// export default App;

export default function App() {
  const { loading, data } = useQuery(ALL_LIFTS_QUERY);
  const [setLiftStatus] = useMutation(MUTATION);

  if (loading) return <p>loading lifts</p>;
  return (
    <section>
      <h1>Snowtooth Lift Status</h1>
      <table>
        <thead>
          <tr>
            <th>Lift Name</th>
            <th>Current Status</th>
          </tr>
        </thead>
        <tbody>
          {data.allLifts.map(lift => (
            <tr key={lift.id}>
              <td>{lift.name}</td>
              <td>
                {lift.status}
                <StatusIndicator
                  status={lift.status}
                  onChange={status => {
                    const variables = { id: lift.id, status };
                    setLiftStatus({ variables });
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

const StatusIndicator = ({ status = "CLOSED", onChange = f => f }) => (
  <>
    <Circle
      color="green"
      selected={status === "OPEN"}
      onClick={() => onChange("OPEN")}
    />
    <Circle
      color="yellow"
      selected={status === "HOLD"}
      onClick={() => onChange("HOLD")}
    />
    <Circle
      color="red"
      selected={status === "CLOSED"}
      onClick={() => onChange("CLOSED")}
    />
  </>
);
const Circle = styled.div`
  border-radius: 50%;
  background-color: ${({ color, selected }) =>
    selected ? color : "transparent"};
  border: solid 2px ${({ color }) => color};
  border-width: ${({ selected }) => (selected ? "0" : "2")};
  width: 20px;
  height: 20px;
  float: left;
  cursor: pointer;
  margin: 0 4px;
`;
