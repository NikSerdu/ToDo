import cn from "clsx";
import { FC, useState } from "react";
const filters = [
  { id: 0, text: "All" },
  { id: 1, text: "Active" },
  { id: 2, text: "Completed" },
];

type TypeData = {
  onClick: (conditional: string) => void;
};

const Filter: FC<TypeData> = ({ onClick }) => {
  const [activeFilter, setActiveFilter] = useState("All");
  return (
    <div className="flex gap-4">
      {filters.map((filter) => {
        return (
          <div
            className={cn(
              "px-2 py-0.5 border border-black rounded-lg hover:cursor-pointer hover:bg-slate-200 transition-all",
              {
                "bg-slate-400": activeFilter === filter.text,
              }
            )}
            key={filter.id}
            onClick={() => {
              onClick(filter.text);
              setActiveFilter(filter.text);
            }}
          >
            {filter.text}
          </div>
        );
      })}
    </div>
  );
};

export default Filter;
