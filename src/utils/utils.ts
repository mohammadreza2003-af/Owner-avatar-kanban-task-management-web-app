import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { TypeBoard } from "../constants/types";

export const handleColumnNameChange = (
  data: TypeBoard,
  index: number,
  event: ChangeEvent<HTMLInputElement>,
  setter: Dispatch<SetStateAction<TypeBoard>>
) => {
  const updatedColumns = [...data.columns];
  updatedColumns[index].name = event.target.value;

  setter((prevState) => ({
    ...prevState,
    columns: updatedColumns,
  }));
};

export const handleDeleteColumn = (
  data: TypeBoard,
  id: number,
  setter: Dispatch<SetStateAction<TypeBoard>>
) => {
  const updatedColumns = data.columns.filter((col) => col.id !== id);
  setter((prevState) => ({
    ...prevState,
    columns: updatedColumns,
  }));
};

export const handleAddColumn = (
  data: TypeBoard,
  setter: Dispatch<SetStateAction<TypeBoard>>
) => {
  const id =
    data.columns.length > 0 ? data.columns[data.columns.length - 1].id + 1 : 1;

  console.log(id);
  const newCol = {
    name: "",
    tasks: [],
    id,
  };
  const updatedColumns = [...data.columns];
  updatedColumns.push(newCol);
  setter((prevState) => ({
    ...prevState,
    columns: updatedColumns,
  }));
};

export const handleChangeBoardName = (
  event: ChangeEvent<HTMLInputElement>,
  setter: Dispatch<SetStateAction<TypeBoard>>
) => {
  setter((prevState) => ({ ...prevState, name: event.target.value }));
};
