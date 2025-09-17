import { useState, useEffect } from "react";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/tasks`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Errore nel fetch:", err));
  }, []);

  const addTask = async ({ title, description, status }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, status }),
      });

      const result = await response.json();

      if (result.success) {
        setTasks((prev) => [...prev, result.task]);
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      throw new Error(err.message || "Errore nella creazione del task");
    }
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
