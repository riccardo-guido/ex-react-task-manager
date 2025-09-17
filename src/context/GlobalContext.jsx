import { createContext, useEffect } from "react";
import { useTasks } from "../hooks/useTasks";

// eslint-disable-next-line react-refresh/only-export-components
export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const { tasks, addTask, removeTask, updateTask } = useTasks();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/tasks`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Tasks fetched:", data);
        setTasks(data);
      })
      .catch((err) => console.error("Errore nel fetch:", err));
  }, []);

  return (
    <GlobalContext.Provider value={{ tasks, addTask, removeTask, updateTask }}>
      {children}
    </GlobalContext.Provider>
  );
};
