import { useEffect, useState } from "react";
import { ITask } from "../types/task.interface";

const useTasks = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [filter, setFilter] = useState<"All" | "Completed" | "Active">("All");
  const [filteredTasks, setFilteredTasks] = useState<ITask[]>([]);

  const addNewTask = (value: string) => {
    const newTask: ITask = {
      id: tasks[0] ? tasks[tasks.length - 1].id + 1 : 0,
      isDone: false,
      title: value,
    };
    setTasks([...tasks, newTask]);
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

  const filterTasks = (condition: string, arr: ITask[]) => {
    switch (condition.toLowerCase()) {
      case "active":
        return arr.filter((arr) => arr.isDone === false);
      case "completed":
        return arr.filter((arr) => arr.isDone === true);
      case "all":
      default:
        return arr;
    }
  };

  const clear = () => {
    const copy = tasks.filter((task) => {
      return !filteredTasks.some((filteredTask) => task.id === filteredTask.id);
    });
    console.log(copy);

    setTasks(copy);
  };

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks") as string);
    setTasks(tasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    const filteredTasks = filterTasks(filter, tasks);
    setFilteredTasks(filteredTasks);
  }, [tasks, filter]);

  return {
    addNewTask,
    deleteTask,
    filter,
    setFilter,
    setTasks,
    filterTasks,
    toggleDone,
    filteredTasks,
    clear,
  };
};

export default useTasks;