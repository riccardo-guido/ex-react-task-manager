import { useContext, useState, useMemo, useCallback } from "react";
import { GlobalContext } from "../context/GlobalContext";
import TaskRow from "../components/TaskRow";

const TaskList = () => {
  const { tasks } = useContext(GlobalContext);

  // Ordinamento
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState(1);

  //  Ricerca con debounce
  const [searchQuery, setSearchQuery] = useState("");

  // Funzione debounce
  const debounce = (func, delay = 500) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  // 🧠 useCallback per evitare ricreazioni inutili
  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchQuery(value);
    }, 500),
    []
  );

  const handleInputChange = (e) => {
    debouncedSearch(e.target.value);
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder((prev) => -prev);
    } else {
      setSortBy(column);
      setSortOrder(1);
    }
  };

  // useMemo per filtrare e ordinare
  const statusOrder = { "To do": 0, Doing: 1, Done: 2 };

  const filteredAndSortedTasks = useMemo(() => {
    return [...tasks]
      .filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        let result = 0;

        if (sortBy === "title") {
          result = a.title.localeCompare(b.title);
        } else if (sortBy === "status") {
          result = statusOrder[a.status] - statusOrder[b.status];
        } else if (sortBy === "createdAt") {
          result =
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }

        return result * sortOrder;
      });
  }, [tasks, searchQuery, sortBy, sortOrder]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">📋 Lista dei Task</h2>

      {/* 🔍 Campo di ricerca */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="🔍 Cerca per nome..."
          onChange={handleInputChange}
        />
      </div>

      {/*  Tabella ordinabile */}
      <table className="table table-hover">
        <thead>
          <tr>
            <th
              onClick={() => handleSort("title")}
              style={{ cursor: "pointer" }}
            >
              Nome {sortBy === "title" && (sortOrder === 1 ? "↑" : "↓")}
            </th>
            <th
              onClick={() => handleSort("status")}
              style={{ cursor: "pointer" }}
            >
              Stato {sortBy === "status" && (sortOrder === 1 ? "↑" : "↓")}
            </th>
            <th
              onClick={() => handleSort("createdAt")}
              style={{ cursor: "pointer" }}
            >
              Creato il{" "}
              {sortBy === "createdAt" && (sortOrder === 1 ? "↑" : "↓")}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedTasks.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
