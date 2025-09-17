import { useContext } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

const TaskDetail = () => {
  const { id } = useParams();
  const { tasks } = useContext(GlobalContext);

  const task = tasks.find((t) => String(t.id) === String(id));

  if (!task) {
    return (
      <div className="container mt-4">
        <h3>❌ Task non trovata</h3>
      </div>
    );
  }

  const handleDelete = () => {
    console.log("Elimino task:", task.id);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">📋 Dettagli Task</h2>
      <div className="card p-4 shadow-sm">
        <p>
          <strong>Nome:</strong> {task.title}
        </p>
        <p>
          <strong>Descrizione:</strong> {task.description}
        </p>
        <p>
          <strong>Stato:</strong> {task.status}
        </p>
        <p>
          <strong>Creato il:</strong>{" "}
          {new Date(task.createdAt).toLocaleDateString()}
        </p>
        <button className="btn btn-danger mt-3" onClick={handleDelete}>
          Elimina Task
        </button>
      </div>
    </div>
  );
};

export default TaskDetail;
