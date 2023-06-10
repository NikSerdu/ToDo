import { FC, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { ITask } from "../../types/task.interface";
import Task from "./Task/Task";

type TypeData = {
  tasks: ITask[];
};

const TaskList: FC = () => {
  const [value, setValue] = useState<string>("");
  const [tasks, setTasks] = useLocalStorage<ITask[]>("tasks", []);

  const addNewTask = (value: string) => {
    const newTask: ITask = {
      id: tasks[0] ? tasks[tasks.length - 1].id + 1 : 0,
      isDone: false,
      title: value,
    };
    const copy = [...tasks];
    copy.push(newTask);
    setTasks(copy);
    setValue("");
  };

  const deleteTask = (id: number) => {
    const copy = tasks.filter((task) => task.id !== id);
    setTasks(copy);
  };

  const toggleDone = (id: number) => {
    const copy = [...tasks];
    const current = copy.find((item) => item.id === id);
    if (current) {
      current.isDone = !current.isDone;
    }
    setTasks(copy);
  };

  const filterTask = (condition: string) => {
    switch (condition) {
      case "active":
        const activeTasks = tasks.filter((task) => task.isDone === false);
        setTasks(activeTasks);
        break;
      case "completed":
        const completedTasks = tasks.filter((task) => task.isDone === true);
        setTasks(completedTasks);
        break;
      default:
        setTasks(tasks);
    }
  };

  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border border-b w-full py-2 px-5 bg-transparent italic outline-none"
        placeholder="What needs to be done?"
        onKeyDown={(e) => (e.key === "Enter" ? addNewTask(value) : null)}
      />
      <div className="flex flex-col-reverse ">
        {tasks.map((task) => {
          return (
            <Task
              key={task.id}
              id={task.id}
              isDone={task.isDone}
              title={task.title}
              toggleDone={toggleDone}
              deleteTask={deleteTask}
            />
          );
        })}
      </div>
    </>
  );
};

export default TaskList;
