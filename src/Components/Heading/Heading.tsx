import { FC } from "react";

const Heading: FC<{ text: string }> = ({ text }) => {
  return <div className="text-7xl font-extralight lowercase">{text}</div>;
};

export default Heading;
