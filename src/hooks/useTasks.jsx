import { useState, useEffect } from "react";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  // Recupero iniziale dei task
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/tasks`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Errore nel fetch dei task:", err));
  }, []);

  // Funzioni placeholder
  const addTask = (newTask) => {
    // da implementare
  };

  const removeTask = (taskId) => {
    // da implementare
  };

  const updateTask = (updatedTask) => {
    // da implementare
  };

  return {
    tasks,
    addTask,
    removeTask,
    updateTask,
  };
};
