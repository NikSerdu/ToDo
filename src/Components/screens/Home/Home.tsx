import { FC } from "react";
import Heading from "../../Heading/Heading";
import TaskList from "../../TaskList/TaskList";

const Home: FC = () => {
  return (
    <div className="flex flex-col mx-auto justify-center items-center max-w-xl max-[576px]:w-auto max-[576px]:mx-3">
      <Heading text={"Todos"} />
      <div className="mt-5 w-full  bg-white shadow-lg">
        <TaskList />
      </div>
    </div>
  );
};

export default Home;
