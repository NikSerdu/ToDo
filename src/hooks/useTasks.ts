import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ITask } from "../types/task.interface";
const useTasks = () => {
  const [tasks, setTasks] = useState<ITask[]>(() => {
    const storedValue = localStorage.getItem("tasks");
    return storedValue ? JSON.parse(storedValue) : [];
  });
  const [filter, setFilter] = useState<"All" | "Completed" | "Active">("All");
  const [filteredTasks, setFilteredTasks] = useState<ITask[]>([]);

  const addNewTask = (value: string) => {
    const newTask: ITask = {
      id: tasks && tasks.length ? tasks[tasks.length - 1].id + 1 : 0,
      isDone: false,
      title: value,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
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
    if (filteredTasks.length > 0) {
      const copy = tasks.filter((task) => {
        return !filteredTasks.some(
          (filteredTask) => task.id === filteredTask.id
        );
      });
      setTasks(copy);
      toast.success("Successfully cleared!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.warning("There is nothing to clean!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

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
    tasks,
  };
};

export default useTasks;
