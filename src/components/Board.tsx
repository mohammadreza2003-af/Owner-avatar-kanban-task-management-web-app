import { useSelector } from "react-redux";
import Column from "./Column";
import { selectActiveBoard } from "../utils/selector";
import { Modal } from "./Modal/Modal";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { TypeBoard } from "../constants/types";
import {
  handleAddColumn,
  handleChangeBoardName,
  handleColumnNameChange,
  handleDeleteColumn,
} from "../utils/utils";

const Board = () => {
  const defaultBoard: TypeBoard = {
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

  const activeBoard = useSelector(selectActiveBoard);
  const [editBoard, setEditBoard] = useState<TypeBoard>(defaultBoard);
  console.log(activeBoard, "active");
  const [isDialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (activeBoard) {
      setEditBoard(activeBoard);
    }
  }, [activeBoard]);

  console.log(editBoard, "eid");

  return (
    <div className="w-full flex-1 bg-colorHighGrey py-4 px-4 overflow-x-scroll max-h-[87.5vh] ">
      <div className="flex gap-x-8">
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
          value={editBoard?.name}
          onChange={(e) => handleChangeBoardName(e, setEditBoard)}
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
        {editBoard?.columns.map((col, index) => {
          return (
            <div className="flex items-center justify-between w-full gap-4 text-colorLightGrey">
              <Input
                type="text"
                id="ColumnName"
                value={col.name}
                onChange={(event) =>
                  handleColumnNameChange(editBoard, index, event, setEditBoard)
                }
                className="bg-inherit rounded-md border-colorLowGray border"
              />
              <Button
                style={{ background: "none", padding: 0 }}
                onClick={() =>
                  handleDeleteColumn(editBoard, col.id, setEditBoard)
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
          onClick={() => handleAddColumn(editBoard, setEditBoard)}
        >
          + Add New Column
        </Button>
        {/* <Button
          style={{ background: "rgb(100, 96, 199)" }}
          className="text-colorLightGrey rounded-full font-semibold"
          onClick={() => {
            dispatch(addBoard(editBoard));
            setDialogOpen(false);
            setNewBoard(initalState);
          }}
        >
          Create New Board
        </Button> */}
      </Modal>
    </div>
  );
};

export default Board;
