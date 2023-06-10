import { FC } from "react";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { ITask } from "../../../types/task.interface";
import Heading from "../../Heading/Heading";
import TaskList from "../../TaskList/TaskList";

const Home: FC = () => {
  const [tasks, setTasks] = useLocalStorage<ITask[]>("tasks", []);

  return (
    <div className="flex flex-col mx-auto justify-center items-center w-1/2">
      <Heading text={"Todos"} />
      <div className="mt-5 w-full  bg-white shadow-lg">
        <TaskList />
      </div>
    </div>
  );
};

export default Home;
