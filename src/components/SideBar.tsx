import { useDispatch, useSelector } from "react-redux";
import { StateType, TypeBoard, TypeBoards } from "../constants/types";
import { addBoard, setBoard } from "../redux/boardSlice";
import { Modal } from "./Modal/Modal";
import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  handleAddColumn,
  handleChangeBoardName,
  handleColumnNameChange,
  handleDeleteColumn,
} from "../utils/utils";

const SideBar = () => {
  const dispatch = useDispatch();

  const initalState = {
    name: "",
    isActive: false,
    columns: [
      {
        name: "Todo",
        tasks: [],
        id: 1,
      },
      {
        name: "Doing",
        tasks: [],
        id: 2,
      },
    ],
  };

  const [newBoard, setNewBoard] = useState<TypeBoard>(initalState);
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
        <Modal
          isOpen={isDialogOpen}
          onClose={() => setDialogOpen(false)}
          title="Add new board"
          description="This is a custom dialog description."
        >
          <Label
            htmlFor="boardName"
            className="text-colorLightGrey font-semibold"
          >
            Board Name
          </Label>
          <Input
            type="text"
            value={newBoard.name}
            onChange={(e) => handleChangeBoardName(e, setNewBoard)}
            id="boardName"
            placeholder="e.g. Web Design"
            className="bg-inherit rounded-md border-colorLowGray border text-colorLightGrey"
          />

          <Label
            htmlFor="ColumnName"
            className="text-colorLightGrey font-semibold"
          >
            Board Columns
          </Label>
          {newBoard.columns.map((col, index) => {
            return (
              <div className="flex items-center justify-between w-full gap-4 text-colorLightGrey">
                <Input
                  type="text"
                  id="ColumnName"
                  value={col.name}
                  onChange={(event) =>
                    handleColumnNameChange(newBoard, index, event, setNewBoard)
                  }
                  className="bg-inherit rounded-md border-colorLowGray border"
                />
                <Button
                  style={{ background: "none", padding: 0 }}
                  onClick={() =>
                    handleDeleteColumn(newBoard, col.id, setNewBoard)
                  }
                >
                  <img src="/assets/icon-cross.svg" />
                </Button>
              </div>
            );
          })}
          <Button
            style={{ background: "rgb(244, 247, 253)" }}
            className="text-colorMainPurple rounded-full font-semibold"
            onClick={() => handleAddColumn(newBoard, setNewBoard)}
          >
            + Add New Column
          </Button>
          <Button
            style={{ background: "rgb(100, 96, 199)" }}
            className="text-colorLightGrey rounded-full font-semibold"
            onClick={() => {
              dispatch(addBoard(newBoard));
              setDialogOpen(false);
              setNewBoard(initalState);
            }}
          >
            Create New Board
          </Button>
        </Modal>
      </div>
    </div>
  );
};

export default SideBar;
