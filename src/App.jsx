import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskList from "./pages/TaskList";
import AddTask from "./pages/AddTask";
import TaskDetail from "./pages/TaskDetail";
import { GlobalProvider } from "./context/GlobalContext";
import Navbar from "./assets/Navbar";

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/addtask" element={<AddTask />} />
          <Route path="/task/:id" element={<TaskDetail />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
