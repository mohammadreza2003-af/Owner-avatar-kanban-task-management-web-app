import { Dispatch, SetStateAction } from "react";
import { TypeTask } from "../constants/types";

const Task = ({
  data,
  setDialogOpen,
  setTask,
  setIndexes,
  colIndex,
  taskIndex,
  setTypeModal,
}: {
  data: TypeTask;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  setTask: Dispatch<SetStateAction<TypeTask>>;
  setIndexes: Dispatch<
    SetStateAction<{
      taskIndex: number;
      colIndex: number;
    }>
  >;
  colIndex: number;
  taskIndex: number;
  setTypeModal: Dispatch<SetStateAction<string>>;
}) => {
  let numberOfComSubTask = 0;
  data.subtasks.forEach((sub) => {
    if (sub.isCompleted === true) {
      numberOfComSubTask += 1;
    }
  }, 0);

  return (
    <div
      className="flex flex-col bg-colorMediumGrey rounded-lg px-2 py-4 text-colorLightGrey w-full hover:text-colorMainPurple transition-all duration-300 ease-in-out cursor-pointer"
      onClick={() => {
        setDialogOpen(true);
        setIndexes({ colIndex: colIndex, taskIndex: taskIndex });
        setTask(data);
        setTypeModal("editTask");
      }}
    >
      <h2 className="font-semibold text-[16x]">{data.title}</h2>
      <span className="text-colorLowGray">
        {numberOfComSubTask} of {data.subtasks.length} subtasks
      </span>
    </div>
  );
};

export default Task;
