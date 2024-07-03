import { Dispatch, SetStateAction } from "react";
import { TypeColumn, TypeTask } from "../constants/types";
import Task from "./Task";





const Column = ({
  data,
  setDialogOpen,
  setTask,
  colIndex,
  setIndexes,
  setTypeModal,
}: {
  data: TypeColumn;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  setTypeModal: Dispatch<SetStateAction<string>>;
  setTask: Dispatch<SetStateAction<TypeTask>>;
  colIndex: number;
  setIndexes: Dispatch<
    SetStateAction<{
      taskIndex: number;
      colIndex: number;
    }>
  >;
}) => {
  const colorClasses = [
    "bg-[#49C4E5]",
    "bg-[#8471F2]",
    "bg-[#67E2AE]",
    "bg-[#e5a449]",
    "bg-[#2a3fdb]",
    "bg-[#c36e6e]",
  ];

  console.log(colIndex);
  return (
    <div className="min-w-[280px]">
      <p className="text-colorLowGray mb-4 font-semibold text-sm flex gap-x-2 items-center">
        <div className={`w-4 h-4 ${colorClasses[colIndex]} rounded-full`} />
        {data.name} ({data.tasks.length})
      </p>
      <div
        className={`flex flex-col gap-y-4 h-full ${
          data.tasks.length > 0
            ? ""
            : "border-dashed border-2 border-slate-600 rounded-lg"
        }`}
      >
        {data.tasks.map((task, index) => (
          <Task
            setTypeModal={setTypeModal}
            colIndex={colIndex}
            setIndexes={setIndexes}
            setDialogOpen={setDialogOpen}
            setTask={setTask}
            key={index}
            taskIndex={index}
            data={task}
          />
        ))}
      </div>
    </div>
  );
};

export default Column;
