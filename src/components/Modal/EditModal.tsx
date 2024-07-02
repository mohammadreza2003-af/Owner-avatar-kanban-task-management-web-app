import React, { useState, useEffect } from "react";
import { EditModalProps, ErrorStateEditModal } from "../../constants/types";
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

const EditModal = ({
  isOpen,
  setIsOpen,
  board,
  setBoard,
  title,
  subTitle,
  submitFuntion,
}: EditModalProps) => {
  const [errors, setErrors] = useState<ErrorStateEditModal>({
    name: "",
    columns: [],
  });

  console.log(isOpen, "isOpen");
  useEffect(() => {
    if (isOpen) {
      setErrors({ name: "", columns: [] });
    }
    if (!isOpen) {
      setErrors({ name: "", columns: [] });
    }
  }, [isOpen]);

  const validateBoardName = (name: string) => {
    if (!name || name.trim() === "") {
      return "Required";
    }
    return "";
  };

  const validateColumnName = (name: string) => {
    if (!name || name.trim() === "") {
      return "Required";
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
    newErrors[index] = validateColumnName(event.target.value);
    setErrors((prev) => ({ ...prev, columns: newErrors }));
  };

  const handleFormSubmit = () => {
    const boardNameError = validateBoardName(board.name);
    const columnErrors = board.columns.map((col) =>
      validateColumnName(col.name)
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
