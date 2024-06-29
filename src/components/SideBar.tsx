import { useDispatch, useSelector } from "react-redux";
import { StateType, TypeBoards } from "../constants/types";
import { setBoard } from "../redux/boardSlice";

const SideBar = () => {
  const dispatch = useDispatch();
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
          className={`px-4 w-[90%] rounded-r-[28px] py-4 flex items-center text-colorMainPurple font-semibold hover:text-colorMainPurple hover:bg-colorLightGrey transition-all duration-300 ease-in-out`}
        >
          <img src="/assets/icon-board.svg" alt="icon-board" className="mr-4" />
          + Create New Board
        </button>
      </div>
    </div>
  );
};

export default SideBar;
