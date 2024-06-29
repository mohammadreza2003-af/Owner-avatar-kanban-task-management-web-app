import { TypeColumn } from "../constants/types";
import Task from "./Task";

const Column = ({ data }: { data: TypeColumn }) => {
  return (
    <div className="min-w-[280px]">
      <p className="text-colorLowGray mb-4">
        {data.name} ({data.tasks.length})
      </p>
      <div className="flex flex-col gap-y-4">
        {data.tasks.map((task, index) => (
          <Task key={index} data={task} />
        ))}
      </div>
    </div>
  );
};

export default Column;
