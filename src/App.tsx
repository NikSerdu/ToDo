import { useState } from "react";
import "./App.css";
import TaskList from "./Components/TaskList/TaskList";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { ITask } from "./types/task.interface";

function App() {
  const [tasks, setTasks] = useLocalStorage<ITask[]>("tasks", []);
  const [value, setValue] = useState<string>("");
  const addNewTask = (value: string) => {
    const newTask: ITask = {
      id: tasks[0] ? tasks[0].id + 1 : 0,
      isDone: false,
      title: value,
    };
    setTasks([...tasks, newTask]);
  };
  return (
    <div className="App">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className=""
      />
      <button onClick={() => addNewTask(value)}>Test</button>
      <TaskList tasks={tasks} />
    </div>
  );
}

export default App;
