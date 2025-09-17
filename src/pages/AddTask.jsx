import { useState, useRef } from "react";

const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

export default function AddTask() {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const descriptionRef = useRef();
  const statusRef = useRef();

  const validateTitle = (value) => {
    if (!value.trim()) return "Il nome del task è obbligatorio.";
    for (let char of value) {
      if (symbols.includes(char))
        return "Il nome non può contenere simboli speciali.";
    }
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationError = validateTitle(title);
    if (validationError) {
      setError(validationError);
      return;
    }

    const newTask = {
      title,
      description: descriptionRef.current.value,
      status: statusRef.current.value,
      createdAt: new Date().toISOString(),
    };

    console.log("Nuovo task:", newTask);

    setError("");
    setTitle("");
    descriptionRef.current.value = "";
    statusRef.current.value = "To do";
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">📝 Aggiungi un nuovo Task</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Nome del Task
          </label>
          <input
            type="text"
            id="title"
            className={`form-control ${error ? "is-invalid" : ""}`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Inserisci il nome"
          />
          {error && <div className="invalid-feedback">{error}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Descrizione
          </label>
          <textarea
            id="description"
            className="form-control"
            ref={descriptionRef}
            placeholder="Descrizione del task"
            rows="3"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="status" className="form-label">
            Stato
          </label>
          <select
            id="status"
            className="form-select"
            ref={statusRef}
            defaultValue="To do"
          >
            <option value="To do">To do</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Aggiungi Task
        </button>
      </form>
    </div>
  );
}
