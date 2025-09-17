import React from "react";

const getStatusStyle = (status) => {
  switch (status) {
    case "To do":
      return { backgroundColor: "#f8d7da" }; // rosso chiaro
    case "Doing":
      return { backgroundColor: "#fff3cd" }; // giallo chiaro
    case "Done":
      return { backgroundColor: "#d4edda" }; // verde chiaro
    default:
      return {};
  }
};

const TaskRow = ({ task }) => {
  const { title, status, createdAt } = task;

  return (
    <tr>
      <td>{title}</td>
      <td style={getStatusStyle(status)}>{status}</td>
      <td>{new Date(createdAt).toLocaleDateString()}</td>
    </tr>
  );
};

export default React.memo(TaskRow);
