import React from "react";
import { Link } from "react-router-dom";

const getStatusStyle = (status) => {
  switch (status) {
    case "To do":
      return { backgroundColor: "#f8d7da" };
    case "Doing":
      return { backgroundColor: "#fff3cd" };
    case "Done":
      return { backgroundColor: "#d4edda" };
    default:
      return {};
  }
};

const TaskRow = ({ task }) => {
  const { id, title, status, createdAt } = task;

  return (
    <tr>
      <td>
        <Link to={`/task/${id}`} className="text-decoration-none text-primary">
          {title}
        </Link>
      </td>
      <td style={getStatusStyle(status)}>{status}</td>
      <td>{new Date(createdAt).toLocaleDateString()}</td>
    </tr>
  );
};

export default React.memo(TaskRow);
