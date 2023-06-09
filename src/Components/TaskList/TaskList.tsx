import { FC } from "react";
import { ITask } from "../../types/task.interface";
import Task from "./Task/Task";

type TypeData = {
  tasks: ITask[];
};

const TaskList: FC<TypeData> = ({ tasks }) => {
  return (
    <div>
      {tasks.map((task) => {
        return (
          <Task
            key={task.id}
            id={task.id}
            isDone={task.isDone}
            title={task.title}
          />
        );
      })}
    </div>
  );
};

export default TaskList;
