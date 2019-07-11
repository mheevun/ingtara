import React, { useState } from "react";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
// Import Hamoni Sync
import Hamoni from "hamoni-sync";

const handleChange = (state, setState) => event => {
  if (event.target.name === "firstName")
    setState({ firstName: event.target.value });
  if (event.target.name === "lastName")
    setState({ lastName: event.target.value });
};

const handleSubmit = event => {
  event.preventDefault();
};

const renderEditable = (state, setState) => cellInfo => {
  return (
    <div
      style={{ backgroundColor: "#fafafa" }}
      contentEditable
      suppressContentEditableWarning
      onBlur={e => {
        const data = [...state.data];
        data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
        setState({ data });
      }}
      dangerouslySetInnerHTML={{
        __html: state.data[cellInfo.index][cellInfo.column.id]
      }}
    />
  );
};

const InsertForm = (state, handlerChange) => (
  <form onSubmit={handleSubmit}>
    <h3>Add new record</h3>
    <label>
      FirstName:
      <input
        type="text"
        name="firstName"
        value={state.firstName}
        onChange={handleChange}
      />
    </label>{" "}
    <label>
      LastName:
      <input
        type="text"
        name="lastName"
        value={state.lastName}
        onChange={handleChange}
      />
    </label>
    <input type="submit" value="Add" />
  </form>
);

const SummaryTable = () => {
  const roomInitialState = {
    data: [],
    firstName: "",
    lastName: ""
  };

  const [room, setRoom] = useState(roomInitialState);
  const contentEditable = renderEditable(room, setRoom);

  const columns = [
    {
      Header: "First Name",
      accessor: "firstName",
      Cell: contentEditable
    },
    {
      Header: "Last Name",
      accessor: "lastName",
      Cell: contentEditable
    },
    {
      Header: "Full Name",
      id: "full",
      accessor: d => (
        <div
          dangerouslySetInnerHTML={{
            __html: d.firstName + " " + d.lastName
          }}
        />
      )
    }
  ];

  return (
    <div>
      <ReactTable
        data={room}
        columns={columns}
        defaultPageSize={10}
        className="-striped -highlight"
      />
    </div>
  );
};
export default SummaryTable;
