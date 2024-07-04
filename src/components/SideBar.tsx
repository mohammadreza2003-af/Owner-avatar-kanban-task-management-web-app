import { useDispatch, useSelector } from "react-redux";
import { StateType, TypeBoard, TypeBoards } from "../constants/types";
import { addBoard, setBoard } from "../redux/boardSlice";
import { Dispatch, SetStateAction, useState } from "react";
import EditModal from "./Modal/EditModal";
import { defaultBoard } from "../constants/defaultValue";
import { useMedia } from "react-use";
import { useCustomToast } from "./Toast";

const SideBar = ({
  setIsSideBar,
}: {
  setIsSideBar: Dispatch<SetStateAction<boolean>>;
}) => {
  const dispatch = useDispatch();
  const [newBoard, setNewBoard] = useState<TypeBoard>(defaultBoard);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const borads: TypeBoards = useSelector((state: StateType) => {
    return state.boards;
  });
  const { showToast } = useCustomToast();
  const isMobile = useMedia("(max-width : 768px)");

  return (
    <div
      className={`${
        !isMobile
          ? "w-[260px]  border-r border-r-slate-600 col-span-4 py-4 min-h-[87.5vh]"
          : "w-full"
      } flex-shrink-0 bg-colorMediumGrey`}
    >
      <p className="font-semibold text-[16px] text-colorLowGray ml-4 uppercase">
        All board ({borads.length})
      </p>
      <div className="flex flex-col justify-between items-start h-[80%] mt-8 w-full">
        <div className="flex flex-col items-start mt-8 w-full mb-8">
          {borads.map((board, index) => (
            <button
              key={index}
              onClick={() => {
                dispatch(setBoard(board.name));
              }}
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
            onClick={() => {
              setDialogOpen(true);
            }}
            className={`px-4 w-[90%] rounded-r-[28px] py-4 flex items-center text-colorMainPurple font-semibold hover:text-colorMainPurple hover:bg-colorLightGrey transition-all duration-300 ease-in-out`}
          >
            <img
              src="/assets/icon-board.svg"
              alt="icon-board"
              className="mr-4"
            />
            + Create New Board
          </button>
        </div>

        {!isMobile && (
          <button
            onClick={() => setIsSideBar(false)}
            className="bg-colorMainPurple text-colorLightGrey px-4 w-[30%] rounded-r-[28px] py-4 flex items-center font-semibold hover:text-colorMainPurple transition-all duration-300 ease-in-out"
          >
            <img width={24} src="/assets/icon-hide-sidebar.svg" />
          </button>
        )}

        <EditModal
          title={"Add new board"}
          board={newBoard}
          type="addNewBoard"
          setBoard={setNewBoard}
          isOpen={isDialogOpen}
          setIsOpen={setDialogOpen}
          subTitle={"Create New Board"}
          submitFuntion={() => {
            dispatch(addBoard(newBoard));
            setDialogOpen(false);
            setNewBoard(defaultBoard);
            showToast("Successfuly", "The board added");
          }}
        />
      </div>
    </div>
  );
};

export default SideBar;
