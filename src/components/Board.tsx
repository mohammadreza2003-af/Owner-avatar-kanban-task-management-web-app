import { useDispatch, useSelector } from "react-redux";
import Column from "./Column";
import { selectActiveBoard } from "../utils/selector";
import { useEffect, useState } from "react";
import { TypeBoard } from "../constants/types";
import { editBoardAndSave } from "../redux/boardSlice";
import { defaultBoard } from "../constants/defaultValue";
import EditModal from "./Modal/EditModal";

const Board = () => {
  const dispatch = useDispatch();
  const activeBoard = useSelector(selectActiveBoard);
  const [editBoard, setEditBoard] = useState<TypeBoard>(defaultBoard);
  const [isDialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (activeBoard) {
      setEditBoard(activeBoard);
    }
  }, [activeBoard]);

  return (
    <div className="w-full flex-1 bg-colorHighGrey py-4 px-4 overflow-x-scroll max-h-[87.5vh] ">
      <div className="flex gap-x-8 w-full">
        {activeBoard?.columns.map((col) => (
          <Column key={col.name} data={col} />
        ))}
        <div className="min-w-[280px]">
          <p className="text-colorLowGray mb-4">Create Board</p>
          <div
            onClick={() => setDialogOpen(true)}
            className="flex flex-col gap-y-4 bg-colorMediumGrey text-colorLowGray hover:text-colorMainPurple w-full h-full rounded-lg justify-center items-center transition-all duration-300 ease-in-out cursor-pointer"
          >
            <button className="text-2xl font-semibold">+ New Column</button>
          </div>
        </div>
      </div>
      <EditModal
        title={"Edit Board"}
        board={editBoard}
        setBoard={setEditBoard}
        isOpen={isDialogOpen}
        setIsOpen={setDialogOpen}
        subTitle={"Save Chenges"}
        submitFuntion={() => {
          dispatch(editBoardAndSave(editBoard));
          setDialogOpen(false);
        }}
      />
    </div>
  );
};

export default Board;
