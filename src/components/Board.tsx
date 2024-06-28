import Column from "./Column";
import { activeBoard } from "../redux/boardSlice";

const Board = () => {
  return (
    <div className="w-full flex-1 bg-colorHighGrey py-4 px-4 overflow-scroll max-h-[87.5vh] ">
      <div className="flex gap-x-8">
        {activeBoard.columns.map((col) => (
          <Column data={col} />
        ))}
      </div>
    </div>
  );
};

export default Board;
