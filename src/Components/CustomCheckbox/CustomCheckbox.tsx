import { ChangeEvent, FC } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
type TypeData = {
  bgColor?: string;
  borderColor?: string;
  checkColor?: string;
  isDone: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};
const CustomCheckbox: FC<TypeData> = ({ isDone }) => {
  return (
    <>
      {!isDone && (
        <div className="h-6 w-6 border border-black rounded-xl"></div>
      )}

      {isDone && <BsFillCheckCircleFill size={24} />}
    </>
  );
};

export default CustomCheckbox;
