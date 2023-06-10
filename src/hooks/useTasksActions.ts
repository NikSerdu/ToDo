import { useState } from "react";
import { ITask } from "../types/task.interface";
import { useLocalStorage } from "./useLocalStorage";

const useTasksActions = () => {
  const [tasks, setTasks] = useLocalStorage<ITask[]>("tasks", []);
  const [filteredTasks, setFilteredTasks] = useState<ITask[]>(tasks);
  const addNewTask = (value: string) => {
    const newTask: ITask = {
      id: tasks[0] ? tasks[tasks.length - 1].id + 1 : 0,
      isDone: false,
      title: value,
    };
    const copy = [...tasks];
    copy.push(newTask);
    setTasks(copy);
    setFilteredTasks(copy);
  };

  const deleteTask = (id: number) => {
    const copy = tasks.filter((task) => task.id !== id);
    setTasks(copy);
    setFilteredTasks(copy);
  };

  const toggleDone = (id: number) => {
    const copy = [...tasks];
    const current = copy.find((item) => item.id === id);
    if (current) {
      current.isDone = !current.isDone;
    }
    setTasks(copy);
  };

  const clear = () => {
    setTasks((prevTasks) =>
      prevTasks.filter(
        (task) =>
          !filteredTasks.find((filteredTask) => filteredTask.id === task.id)
      )
    );
    setFilteredTasks([]);
  };

  const filterTasks = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "active":
        setFilteredTasks(tasks.filter((task) => task.isDone === false));
        break;
      case "completed":
        setFilteredTasks(tasks.filter((task) => task.isDone === true));
        break;
      case "all":
        setFilteredTasks(tasks);
        break;
      default:
        break;
    }
  };
  return {
    tasks,
    filteredTasks,
    filterTasks,
    addNewTask,
    clear,
    deleteTask,
    toggleDone,
  };
};

export default useTasksActions;
