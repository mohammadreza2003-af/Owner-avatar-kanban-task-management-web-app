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
  return (
    <div className="min-w-[280px]">
      <p className="text-colorLowGray mb-4 font-semibold text-sm">
        {data.name} ({data.tasks.length})
      </p>
      <div className="flex flex-col gap-y-4">
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
