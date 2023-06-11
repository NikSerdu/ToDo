import cn from "clsx";
import { FC } from "react";
const filters: IFilter[] = [
  { id: 0, text: "All" },
  { id: 1, text: "Active" },
  { id: 2, text: "Completed" },
];

interface IFilter {
  id: number;
  text: "All" | "Completed" | "Active";
}

type TypeData = {
  activeFilter: "All" | "Completed" | "Active";
  setFilter: (filter: "All" | "Completed" | "Active") => void;
};

const Filter: FC<TypeData> = ({ activeFilter, setFilter }) => {
  return (
    <div className="flex gap-4">
      {filters.map((filter) => {
        return (
          <div
            className={cn(
              "border border-black rounded-lg px-3 py-1 hover:bg-slate-300 transition-all hover:cursor-pointer",
              {
                "bg-slate-400": activeFilter === filter.text,
              }
            )}
            key={filter.id}
            onClick={() => {
              setFilter(filter.text);
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
