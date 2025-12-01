import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";


type Task = {
  id: number;
  title: string;
  completed: boolean;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Fetch tasks
  useEffect(() => {
    fetch("http://localhost:8000/tasks")
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  // Add task
  const addTask = async (title: string) => {
    const res = await fetch("http://localhost:8000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title })
    });
    const newTask = await res.json();
    setTasks([...tasks, newTask]);
  };

  // Toggle completion
  const toggleTask = async (id: number, completed: boolean) => {
    const task = tasks.find(t => t.id === id)!;

    const res = await fetch(`http://localhost:8000/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: task.title, completed })
    });

    const updated = await res.json();
    setTasks(tasks.map(t => (t.id === id ? updated : t)));
  };

  // Delete
  const deleteTask = async (id: number) => {
    await fetch(`http://localhost:8000/tasks/${id}`, { method: "DELETE" });
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <p className="subtitle">A clean and simple app built with React + FastAPI</p>


      <TaskForm onAdd={addTask} />

      <TaskList
        tasks={tasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
      />
    </div>
  );

}

export default App;
