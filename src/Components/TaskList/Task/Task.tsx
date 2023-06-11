import cn from "clsx";
import { FC } from "react";
import { TiDelete } from "react-icons/ti";
import { ITask } from "../../../types/task.interface";
import CustomCheckbox from "../../CustomCheckbox/CustomCheckbox";
type TypeData = ITask & {
  toggleDone: (id: number) => void;
  deleteTask: (id: number) => void;
};
const Task: FC<TypeData> = ({ id, title, isDone, toggleDone, deleteTask }) => {
  return (
    <div className="flex justify-between items-center border-b border-black px-5 py-2">
      <div className="flex items-baseline gap-4">
        <div
          className=""
          data-testid={`toggle${id + 1}`}
          onClick={() => toggleDone(id)}
        >
          <CustomCheckbox isDone={isDone} />
        </div>
        <h1
          className={cn("text-3xl font-light", {
            "line-through text-gray-400": isDone,
          })}
        >
          {title}
        </h1>
      </div>
      <div
        data-testid={`deleteTask${id + 1}`}
        className=""
        onClick={() => {
          deleteTask(id);
        }}
      >
        <TiDelete size={28} />
      </div>
    </div>
  );
};

export default Task;
