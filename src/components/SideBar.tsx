import { useDispatch, useSelector } from "react-redux";
import { StateType, TypeBoard, TypeBoards } from "../constants/types";
import { addBoard, setBoard } from "../redux/boardSlice";
import { useState } from "react";
import EditModal from "./Modal/EditModal";
import { defaultBoard } from "../constants/defaultValue";

const SideBar = () => {
  const dispatch = useDispatch();
  const [newBoard, setNewBoard] = useState<TypeBoard>(defaultBoard);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const borads: TypeBoards = useSelector((state: StateType) => {
    return state.boards;
  });

  return (
    <div className="w-[260px] flex-shrink-0 col-span-4  bg-colorMediumGrey py-4 min-h-[87.5vh]">
      <p className="font-semibold text-[16px] text-colorLowGray ml-4 uppercase">
        All board ({borads.length})
      </p>
      <div className="flex flex-col items-start mt-8 w-full">
        {borads.map((board, index) => (
          <button
            key={index}
            onClick={() => dispatch(setBoard(board.name))}
            className={`${
              board.isActive === true
                ? "bg-colorMainPurple text-colorLightGrey"
                : "text-colorLowGray"
            }  px-4 w-[90%] rounded-r-[28px] py-4 flex items-center font-semibold hover:text-colorMainPurple hover:bg-colorLightGrey transition-all duration-300 ease-in-out`}
          >
            <img
              src="/assets/icon-board.svg"
              alt="icon-board"
              className="mr-4"
            />
            {board.name}
          </button>
        ))}
        <button
          onClick={() => setDialogOpen(true)}
          className={`px-4 w-[90%] rounded-r-[28px] py-4 flex items-center text-colorMainPurple font-semibold hover:text-colorMainPurple hover:bg-colorLightGrey transition-all duration-300 ease-in-out`}
        >
          <img src="/assets/icon-board.svg" alt="icon-board" className="mr-4" />
          + Create New Board
        </button>
        <EditModal
          title={"Add new board"}
          board={newBoard}
          setBoard={setNewBoard}
          isOpen={isDialogOpen}
          setIsOpen={setDialogOpen}
          subTitle={"Create New Board"}
          submitFuntion={() => {
            dispatch(addBoard(newBoard));
            setDialogOpen(false);
            setNewBoard(defaultBoard);
          }}
        />
      </div>
    </div>
  );
};

export default SideBar;
