import { useSelector } from "react-redux";
import Column from "./Column";
import { selectActiveBoard } from "../utils/selector";

const Board = () => {
  const activeBoard = useSelector(selectActiveBoard);
  console.log(activeBoard, "ac");
  return (
    <div className="w-full flex-1 bg-colorHighGrey py-4 px-4 overflow-x-scroll max-h-[87.5vh] ">
      <div className="flex gap-x-8">
        {activeBoard?.columns.map((col) => (
          <Column key={col.name} data={col} />
        ))}
        <div className="min-w-[280px]">
          <p className="text-colorLowGray mb-4">Create Board</p>
          <div className="flex flex-col gap-y-4 bg-colorMediumGrey text-colorLowGray hover:text-colorMainPurple w-full h-full rounded-lg justify-center items-center transition-all duration-300 ease-in-out cursor-pointer">
            <button className="text-2xl font-semibold">+ New Column</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
