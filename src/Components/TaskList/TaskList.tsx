import { FC, useState } from "react";
import useTasksActions from "../../hooks/useTasksActions";
import { ITask } from "../../types/task.interface";
import Filter from "../Filter/Filter";
import Task from "./Task/Task";

type TypeData = {
  tasks: ITask[];
};

const TaskList: FC = () => {
  const [value, setValue] = useState<string>("");
  const {
    addNewTask,
    clear,
    deleteTask,
    filterTasks,
    filteredTasks,
    toggleDone,
  } = useTasksActions();
  const changeInput = (e: any) => {
    if (e.key === "Enter") {
      addNewTask(value);
      setValue("");
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
        onKeyDown={(e) => changeInput(e)}
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
      <div className=" flex gap-4 p-2 items-center justify-between">
        <div className="">{filteredTasks.length} items</div>
        <Filter onClick={filterTasks} />
        <div
          className="px-2 py-0.5 border border-black rounded-lg hover:cursor-pointer hover:bg-slate-200 transition-all"
          onClick={clear}
        >
          Clear
        </div>
      </div>
    </>
  );
};

export default TaskList;
