import { FC } from "react";
import { ITask } from "../../../types/task.interface";

const Task: FC<ITask> = ({ id, title, isDone }) => {
  return (
    <div>
      <input type="checkbox" name="Done" id="" />
      <h1>{title}</h1>
    </div>
  );
};

export default Task;
