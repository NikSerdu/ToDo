import { FC, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useTasks from "../../hooks/useTasks";
import Filter from "../Filter/Filter";
import Task from "./Task/Task";
const TaskList: FC = () => {
  const {
    addNewTask,
    deleteTask,
    filter,
    setFilter,
    filteredTasks,
    toggleDone,
    clear,
  } = useTasks();
  const [value, setValue] = useState<string>("");
  const handleAddNewTask = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && value.replace(/\s/g, "") !== "") {
      addNewTask(value);
      setValue("");
    } else if (e.key === "Enter" && value.replace(/\s/g, "") === "") {
      toast.error("Введите задачу!", {
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
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <input
        type="text"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
        className="border border-b w-full py-2 px-5 bg-transparent italic outline-none"
        placeholder="What needs to be done?"
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
          handleAddNewTask(e)
        }
      />
      <div className="flex flex-col-reverse ">
        {filteredTasks.map((task) => {
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
      <div className="p-4 flex justify-between items-center max-[425px]:flex-col max-[425px]:gap-3">
        <div className="">{filteredTasks.length} items</div>
        <Filter activeFilter={filter} setFilter={setFilter} />
        <div
          className="border border-black rounded-lg px-3 py-1 hover:bg-slate-300 transition-all hover:cursor-pointer"
          onClick={clear}
        >
          Clear
        </div>
      </div>
    </>
  );
};

export default TaskList;
