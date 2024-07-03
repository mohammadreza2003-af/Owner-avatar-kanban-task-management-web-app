import { Dispatch, SetStateAction, ReactNode } from "react";

export type TypeBoards = TypeBoard[];

export type TypeBoard = {
  name: string;
  isActive: boolean;
  columns: TypeColumn[];
};

export type TypeColumn = {
  name: string;
  tasks: TypeTask[];
  id: number;
};

export type TypeTask = {
  title: string;
  description: string;
  status: string;
  subtasks: { title: string; isCompleted: boolean }[];
};

export type StateType = {
  boards: TypeBoards;
};
export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};
export type EditModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setBoard: Dispatch<SetStateAction<TypeBoard>>;
  title: string;
  subTitle: string;
  board: TypeBoard;
  type?: string;
  submitFuntion: () => void;
};
export type EditTaskModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setTask: Dispatch<SetStateAction<TypeTask>>;
  title: string;
  subTitle: string;
  task: TypeTask;
  column: TypeColumn[];
  submitFunction: () => void;
};
export type AddTaskModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setTask: Dispatch<SetStateAction<TypeTask>>;
  title: string;
  subTitle: string;
  task: TypeTask;
  column: TypeColumn[];
  submitFunction: () => void;
};
export type DeleteModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  onfunctionality: () => void;
  des: string;
};

export type ErrorStateEditModal = { name: string; columns: string[] };

export type ErrorStateAddTask = {
  title: string;
  subtasks: string[];
  status: string;
};
