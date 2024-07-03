import React, { useState, useEffect } from "react";
import {
  EditModalProps,
  ErrorStateEditModal,
  StateType,
} from "../../constants/types";
import {
  handleAddColumn,
  handleChangeBoardName,
  handleColumnNameChange,
  handleDeleteColumn,
} from "../../utils/utils";
import RuButton from "../RuButton";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Modal } from "./Modal";
import { useSelector } from "react-redux";
import { selectActiveBoard } from "../../utils/selector";

const EditModal = ({
  isOpen,
  setIsOpen,
  board,
  setBoard,
  title,
  subTitle,
  submitFuntion,
  type,
}: EditModalProps) => {
  const activeBoard = useSelector(selectActiveBoard);

  console.log(activeBoard, "active");

  const [errors, setErrors] = useState<ErrorStateEditModal>({
    name: "",
    columns: [],
  });
  const boards = useSelector((state: StateType) => state.boards);

  console.log(board);

  useEffect(() => {
    if (isOpen) {
      setErrors({ name: "", columns: [] });
    }
    if (!isOpen) {
      setErrors({ name: "", columns: [] });
    }
  }, [isOpen]);

  const validateBoardName = (name: string) => {
    const isDuplicate = boards.some(
      (board) => board.name.toLowerCase() === name.toLowerCase()
    );
    if (!name || name.trim() === "") {
      return "Required";
    }
    if (type === "editBoard" && isDuplicate && name !== activeBoard?.name) {
      return "Used";
    }
    if (type === "addNewBoard" && isDuplicate) {
      return "Used";
    }
    return "";
  };

  const validateColumnName = (name: string, index: number) => {
    if (!name || name.trim() === "") {
      return "Required";
    }
    if (
      board.columns.some(
        (col, i) => col.name.toLowerCase() === name.toLowerCase() && i !== index
      )
    ) {
      return "Used";
    }
    return "";
  };

  const handleBoardNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeBoardName(e, setBoard);
    setErrors((prev) => ({ ...prev, name: validateBoardName(e.target.value) }));
  };

  const handleColumnNameChangeWrapper = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleColumnNameChange(board, index, event, setBoard);
    const newErrors = [...errors.columns];
    newErrors[index] = validateColumnName(event.target.value, index);
    setErrors((prev) => ({ ...prev, columns: newErrors }));
  };

  const handleFormSubmit = () => {
    const boardNameError = validateBoardName(board.name);
    const columnErrors = board.columns.map((col, index) =>
      validateColumnName(col.name, index)
    );

    if (boardNameError || columnErrors.some((err) => err !== "")) {
      setErrors({ name: boardNameError, columns: columnErrors });
    } else {
      submitFuntion();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={title}>
      <Label htmlFor="boardName" className="text-colorLightGrey font-semibold">
        Board Name
      </Label>
      <Input
        disabled={type === "addColumn" ? true : false}
        type="text"
        value={board?.name}
        onChange={handleBoardNameChange}
        id="boardName"
        required
        placeholder="e.g. Web Design"
        className="bg-inherit rounded-md border-colorLowGray border text-colorLightGrey"
      />
      {errors.name && <p className="text-red-500">{errors.name}</p>}

      <Label htmlFor="ColumnName" className="text-colorLightGrey font-semibold">
        Board Columns
      </Label>
      {board?.columns.map((col, index) => (
        <div
          className="flex items-center justify-between w-full gap-4 text-colorLightGrey"
          key={col.id}
        >
          <Input
            type="text"
            required
            id="ColumnName"
            value={col.name}
            onChange={(event) => handleColumnNameChangeWrapper(index, event)}
            className="bg-inherit rounded-md border-colorLowGray border"
          />
          <RuButton
            functionlity={() => handleDeleteColumn(board, col.id, setBoard)}
          >
            <img src="/assets/icon-cross.svg" />
          </RuButton>
          {errors.columns[index] && (
            <p className="text-red-500">{errors.columns[index]}</p>
          )}
        </div>
      ))}
      <RuButton
        customStyle={{
          className: "text-colorMainPurple rounded-full font-semibold",
          backgroundColor: { color: "rgb(244, 247, 253)" },
        }}
        functionlity={() => handleAddColumn(board, setBoard)}
      >
        + Add New Column
      </RuButton>
      <RuButton
        customStyle={{
          className: "text-colorLightGrey rounded-full font-semibold",
          backgroundColor: { color: "rgb(100, 96, 199)" },
        }}
        functionlity={handleFormSubmit}
      >
        {subTitle}
      </RuButton>
    </Modal>
  );
};

export default EditModal;
