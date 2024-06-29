import { TypeTask } from "../constants/types";

const Task = ({ data }: { data: TypeTask }) => {
  let numberOfComSubTask = 0;
  data.subtasks.forEach((sub) => {
    if (sub.isCompleted === true) {
      numberOfComSubTask += 1;
    }
  }, 0);
  return (
    <div className="flex flex-col bg-colorMediumGrey rounded-lg px-2 py-4 text-colorLightGrey w-full hover:text-colorMainPurple transition-all duration-300 ease-in-out cursor-pointer">
      <h2 className="font-semibold text-[18px]">{data.title}</h2>
      <span className="text-colorLowGray">
        {numberOfComSubTask} of {data.subtasks.length} subtasks
      </span>
    </div>
  );
};

export default Task;
