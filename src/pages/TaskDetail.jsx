import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import Modal from "../components/Modal";
import EditTaskModal from "../components/EditTaskModal";

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, removeTask, updateTask } = useContext(GlobalContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const task = tasks.find((t) => String(t.id) === String(id));
  if (!task)
    return (
      <div className="container mt-4">
        <h3>❌ Task non trovata</h3>
      </div>
    );

  const handleDelete = async () => {
    try {
      await removeTask(task.id);
      alert("✅ Task eliminata con successo!");
      navigate("/");
    } catch (err) {
      alert(`❌ Errore: ${err.message}`);
    }
  };

  const handleUpdate = async (updatedTask) => {
    try {
      await updateTask(updatedTask);
      alert("✅ Task modificata con successo!");
      setShowEditModal(false);
    } catch (err) {
      alert(`❌ Errore: ${err.message}`);
    }
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
        <div className="d-flex gap-2 mt-3">
          <button
            className="btn btn-warning"
            onClick={() => setShowEditModal(true)}
          >
            Modifica Task
          </button>
          <button
            className="btn btn-danger"
            onClick={() => setShowDeleteModal(true)}
          >
            Elimina Task
          </button>
        </div>
      </div>

      <Modal
        title="Conferma Eliminazione"
        content={`Sei sicuro di voler eliminare il task "${task.title}"?`}
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        confirmText="Elimina"
      />

      <EditTaskModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        task={task}
        onSave={handleUpdate}
      />
    </div>
  );
};

export default TaskDetail;
