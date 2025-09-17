import { useState, useRef } from "react";
import Modal from "./Modal";

const EditTaskModal = ({ show, onClose, task, onSave }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);
  const editFormRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = {
      ...task,
      title,
      description,
      status,
    };
    onSave(updatedTask);
  };

  return (
    <Modal
      title="Modifica Task"
      show={show}
      onClose={onClose}
      confirmText="Salva"
      onConfirm={() => editFormRef.current?.requestSubmit()}
      content={
        <form ref={editFormRef} onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nome</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Descrizione</label>
            <textarea
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Stato</label>
            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="To do">To do</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>
          </div>
        </form>
      }
    />
  );
};

export default EditTaskModal;
